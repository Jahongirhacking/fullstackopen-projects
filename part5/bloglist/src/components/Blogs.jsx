import {useEffect, useState} from "react";
import blogService from "../services/blogs.js";
import Blog from "./Blog.jsx";

const Blogs = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    )
}

export default Blogs;