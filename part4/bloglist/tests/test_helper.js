const Blog = require('../models/blog');

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

module.exports = {
    initialBloglist,
    getBloglistFromDb
}