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

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
})

blogRouter.put('/:id/likes', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const newBlog = await Blog.findByIdAndUpdate(blog.id, {likes: blog.likes+1}, {new: true})
    response.status(201).json(newBlog);
})

module.exports = blogRouter;