import { useState } from "react";
import { putLike } from "../services/blogs.js";

const Blog = ({ blog, getAllBlogsFromDb }) => {
  const [isCollapse, setIsCollapse] = useState(true);

  const handleLike = async (id) => {
    await putLike(id);
    await getAllBlogsFromDb();
  };

  return (
    <div style={{ border: "2px solid black", margin: "10px 5px" }}>
      <p>{blog.title}</p>
      {isCollapse ? (
        <button onClick={() => setIsCollapse(false)}>view</button>
      ) : (
        <>
          <a href={blog.url}>{blog.url}</a>
          <p>
            likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={() => setIsCollapse(true)}>hide</button>
        </>
      )}
    </div>
  );
};

export default Blog;
