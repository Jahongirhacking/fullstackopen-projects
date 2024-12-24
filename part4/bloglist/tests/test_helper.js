const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const initialBloglist = [
    {
        title: "Atomic Habits",
        author: "Jahongir Hayitov",
        url: "https://jamesclear.com/atomic-habits",
        likes: 5
    },
    {
        title: "Zulmatda Quyosh",
        author: "Mamanova Ozoda",
        url: "https://jamesclear.com/atomic-habitats",
        likes: 3
    },
    {
        title: "Bo'g'irsoq",
        author: "Abdullayev Furqat",
        url: "https://jamesclear.com/atomic-habitatats",
        likes: 77
    }
]

const getBloglistFromDb = async() => {
    const bloglist = await Blog.find({});
    return bloglist.map((blog) => blog.toJSON())
}

const initialUsers = [
    {
        username: "jahongirhacking",
        name: "Jahongir Hayitov",
        password: "joxa1805"
    },
    {
        username: "ozoda1211",
        name: "Mamanova Ozoda",
        password: "ozoda1211"
    },
]

const getUsersFromDb = async() => {
    const usersList = await User.find({});
    return usersList.map((user) => user.toJSON())
}

const getToken = async() => {
    const user = await User.findOne({username: initialUsers[0].username});
    return jwt.sign({username: user.username, id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

module.exports = {
    initialBloglist,
    getBloglistFromDb,
    initialUsers,
    getUsersFromDb,
    getToken
}