const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.status(200).json(blogs);
})

blogRouter.post('/', async (request, response) => {
    if(!request.body.title || !request.body.url) response.status(400);
    const blog = await new Blog(request.body).save();
    response.status(201).json(blog);
})

module.exports = blogRouter;