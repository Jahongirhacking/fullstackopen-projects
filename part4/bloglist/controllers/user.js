require('dotenv').config();
const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

userRouter.get('/', async (req, res) => {
    const users = await  User.find({}).populate('blogs', {user: 0});
    res.status(200).json(users);
});

userRouter.post('/', async (req, res) => {
    const { name, username, password } = req.body;
    if(password.length < 3) {
        res.status(400).send({error: 'Password must be at least 3 characters'});
        return;
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = new User({name, username, passwordHash});
    const savedUser = await user.save();
    res.status(201).json(savedUser);
})

userRouter.post('/login', async (request, response) => {
    const { username, password } = request.body;
    const user = await User.findOne({username: username.toLowerCase()});
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if(isPasswordMatch && user) {
        const expiresIn = 24*60*60;
        const token = jwt.sign(
            {username: user.username, id: user._id},
            process.env.JWT_SECRET,
            {expiresIn});
        response.status(200).json({token});
        return;
    }
    response.status(401).send({error: 'Username or password is incorrect'});
})

module.exports = userRouter;