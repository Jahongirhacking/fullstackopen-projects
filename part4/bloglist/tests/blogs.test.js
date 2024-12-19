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

const newBlog = {
    title: "Tuzoq",
    author: "Hello World",
    url: "https://jamesclear.com/atomic-habits",
    likes: 4
};

describe("check /api/blogs/ route", async () => {
    test("in json format", async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
    })

    test("get all blogs", async () => {
        const response = await api.get('/api/blogs');
        assert.strictEqual(response.body.length, testHelper.initialBloglist.length);
    })

    test("is there a field id", async () => {
        const response = await api.get(`/api/blogs`);
        assert.notStrictEqual(response.body[0].id, undefined);
        assert.strictEqual(response.body[0]._id, undefined);
    })

    test("adding new blog and check length", async () => {
        const response = await api.post(`/api/blogs`).send(newBlog).expect(201).expect('Content-Type', /application\/json/);
        assert.strictEqual(response.body.title, newBlog.title);
        const blogs = await testHelper.getBloglistFromDb();
        assert.strictEqual(blogs.length, testHelper.initialBloglist.length+1);
    })

    test("missing like property should output 0", async () => {
        const response = await api.post(`/api/blogs`).send({
            title: "Lorem Ipsum Dolor",
            url: "Lorem Ipsum",
        }).expect(201).expect('Content-Type', /application\/json/);
        assert.strictEqual(response.body.likes, 0);
        const blogs = await testHelper.getBloglistFromDb();
        assert.strictEqual(blogs.length, testHelper.initialBloglist.length+1);
    })

    test("missing like property should output 0", async () => {
        await api.post(`/api/blogs`).send({}).expect(400);
    })
})

after(async () => {
    await mongoose.connection.close();
})