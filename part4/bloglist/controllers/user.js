require('dotenv').config();
const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const middleware = require('../utils/middleware');
const jwt = require("jsonwebtoken");

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {user: 0});
    res.status(200).json(users);
});

userRouter.post('/', async (req, res) => {
    const {name, username, password} = req.body;
    if (password.length < 3) {
        res.status(400).send({error: 'Password must be at least 3 characters'});
        return;
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new User({name, username, passwordHash});
    const savedUser = await user.save();
    res.status(201).json(savedUser);
})

userRouter.get('/me', middleware.tokenExtractor, async (req, res) => {
    if (!req.token) res.status(401).end();
    const user = await User.findById(jwt.verify(req.token, process.env.JWT_SECRET).id);
    res.status(200).json(user);
})

module.exports = userRouter;