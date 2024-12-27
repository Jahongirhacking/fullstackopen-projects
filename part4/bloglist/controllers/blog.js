require('dotenv').config();
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const middleware = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {blogs: 0});
    response.status(200).json(blogs);
})

blogRouter.post('/', middleware.tokenExtractor, async (request, response) => {
    if(!request.token) response.status(401).end();
    if(!request.body.title || !request.body.url) response.status(400).end();
    const token = request.token;
    const user_credentials = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(user_credentials.id);
    const blog = await new Blog({...request.body, user: user._id}).save();
    user.blogs = [...user.blogs, blog._id];
    await user.save();
    response.status(201).json(blog);
})

blogRouter.delete('/:id', middleware.tokenExtractor, async (request, response) => {
    const blog_id = request.params.id;
    const blog = await Blog.findById(blog_id);
    const user_credentials = jwt.verify(request.token, process.env.JWT_SECRET);
    const user = await User.findById(user_credentials.id);
    if(user._id.toString() === blog.user.toString()) {
        await Blog.findByIdAndDelete(blog_id);
        user.blogs = user.blogs.filter((blog) => blog.toString() !== blog_id);
        await user.save();
        response.status(204).end();
    } else {
        response.status(403).send({error: "Forbidden"});
    }
})

blogRouter.put('/:id/likes', async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const newBlog = await Blog.findByIdAndUpdate(blog.id, {likes: blog.likes+1}, {new: true})
    response.status(201).json(newBlog);
})

module.exports = blogRouter;