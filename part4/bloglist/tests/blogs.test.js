const {beforeEach, test, describe, after} = require('node:test');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/blog');
const testHelper = require('./test_helper');
const mongoose = require('mongoose');
const assert = require("node:assert");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    const blogListArr = testHelper.initialBloglist.map(blog => new Blog(blog).save());
    await Promise.all(blogListArr);
})

describe("check /api/blogs/ route", async () => {
    test("get number of blogs", async () => {
        const response = await api.get('/api/blogs');
        assert.strictEqual(response.body.length, testHelper.initialBloglist.length);
    })
})

after(async () => {
    await mongoose.connection.close();
})