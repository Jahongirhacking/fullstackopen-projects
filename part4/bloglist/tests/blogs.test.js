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
        const token = await testHelper.getToken();
        const response = await api.post(`/api/blogs`).send(newBlog).set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
        assert.strictEqual(response.body.title, newBlog.title);
        const blogs = await testHelper.getBloglistFromDb();
        assert.strictEqual(blogs.length, testHelper.initialBloglist.length+1);
    })

    test("adding unauthorized new blog", async () => {
        await api.post(`/api/blogs`).send(newBlog).expect(401);
    })

    test("missing like property should output 0", async () => {
        const token = await testHelper.getToken();
        const response = await api.post(`/api/blogs`).send({
            title: "Lorem Ipsum Dolor",
            url: "Lorem Ipsum",
        }).set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
        assert.strictEqual(response.body.likes, 0);
        const blogs = await testHelper.getBloglistFromDb();
        assert.strictEqual(blogs.length, testHelper.initialBloglist.length+1);
    })

    test("missing title or url property should output 400 error", async () => {
        const token = await testHelper.getToken();
        await api.post(`/api/blogs`).send({}).set('Authorization', `Bearer ${token}`).expect(400);
    })

    test("delete a blog and check length", async () => {
        const token = await testHelper.getToken();
        await api.post(`/api/blogs`).send(newBlog).set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
        const blog = await Blog.findOne({title: newBlog.title});
        const blogsAtStart = await testHelper.getBloglistFromDb();
        await api.delete(`/api/blogs/${blog._id}`).set('Authorization', `Bearer ${token}`).expect(204);
        const blogsAtEnd = await testHelper.getBloglistFromDb();
        assert(!(blogsAtEnd.map(b => b.id).includes(blog._id)));
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length-1);
    })

    test("upvote likes count", async () => {
        const blogsAtStart = await testHelper.getBloglistFromDb();
        const blog = blogsAtStart[0];
        await api.put(`/api/blogs/${blog.id}/likes`).expect(201);
        const blogsAtEnd = await testHelper.getBloglistFromDb();
        assert.strictEqual(blogsAtEnd.find(b => b.id === blog.id).likes, blog.likes+1);
    })
})

after(async () => {
    await mongoose.connection.close();
})