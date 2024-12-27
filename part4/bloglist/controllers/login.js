require('dotenv').config();
const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");

loginRouter.post('/', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username.toLowerCase()});
    if (user && await bcrypt.compare(password, user.passwordHash)) {
        const expiresIn = 24 * 60 * 60;
        const token = jwt.sign(
            {username: user.username, id: user._id},
            process.env.JWT_SECRET,
            {expiresIn});
        res.status(200).json({token});
        return;
    }
    res.status(401).json({error: 'Username or password is incorrect'});
})

module.exports = loginRouter;