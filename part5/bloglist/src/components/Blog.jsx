import { useState } from "react";
import { putLike, removeBlog } from "../services/blogs.js";

const Blog = ({ blog, getAllBlogsFromDb }) => {
  const [isCollapse, setIsCollapse] = useState(true);

  const handleLike = async (id) => {
    await putLike(id);
    await getAllBlogsFromDb();
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await removeBlog(id);
    await getAllBlogsFromDb();
  };

  return (
    <div style={{ border: "2px solid black", margin: "10px 5px" }}>
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setIsCollapse((prev) => !prev)}>
          {isCollapse ? "view" : "hide"}
        </button>
      </p>

      {!isCollapse && (
        <>
          <a href={blog.url}>{blog.url}</a>
          <p>
            likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </p>
          <p>{blog?.user?.username}</p>
          <button onClick={() => handleRemove(blog.id)}>remove</button>
        </>
      )}
    </div>
  );
};

export default Blog;
