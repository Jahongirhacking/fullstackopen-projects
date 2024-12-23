const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res) => {
    const users = await  User.find({});
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

module.exports = userRouter;