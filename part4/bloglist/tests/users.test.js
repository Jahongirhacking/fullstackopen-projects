const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require("../app");
const {test, beforeEach, after, describe} = require("node:test");
const User = require("../models/user");
const {initialUsers, getUsersFromDb} = require("./test_helper");
const assert = require("node:assert");

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({})
    const users = initialUsers.map(user => api.post('/api/users').send(user));
    await Promise.all(users);
})

describe('check api/users route', async() => {
    test('adding a normal user and then wrong username', async() => {
        // normal user
        const normalUser = {
            name: 'John Doe',
            username: 'JohnDoe',
            password: 'helloworld',
        };
        await api.post('/api/users').send(normalUser).expect(201);
        const afterUsers = await getUsersFromDb();
        assert.strictEqual(afterUsers.length, initialUsers.length + 1);
        assert(afterUsers.map(user => user.username).includes(normalUser.username.toLowerCase()));
        // wrong user
        const wrongUser = {
            name: 'Furqat',
            username: 'Po',
            password: '123456',
        }
        await api.post('/api/users').send(wrongUser).expect(400);
        const finalUsers = await getUsersFromDb();
        assert.strictEqual(finalUsers.length, afterUsers.length);
        assert(!finalUsers.map(user => user.username).includes(wrongUser.username.toLowerCase()));
    })
})

after(async () => {
    await mongoose.connection.close();
})