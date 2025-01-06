import { useState } from "react";
import { putLike } from "../services/blogs.js";

const Blog = ({ blog }) => {
  const [isCollapse, setIsCollapse] = useState(true);
  const [clonedBlog, setClonedBlog] = useState(blog);

  const handleLike = async (id) => {
    const blog = await putLike(id);
    setClonedBlog(blog);
  };

  return (
    <div style={{ border: "2px solid black", margin: "10px 5px" }}>
      <p>{clonedBlog.title}</p>
      {isCollapse ? (
        <button onClick={() => setIsCollapse(false)}>view</button>
      ) : (
        <>
          <a href={clonedBlog.url}>{clonedBlog.url}</a>
          <p>
            likes {clonedBlog.likes}
            <button onClick={() => handleLike(clonedBlog.id)}>like</button>
          </p>
          <p>{clonedBlog.author}</p>
          <button onClick={() => setIsCollapse(true)}>hide</button>
        </>
      )}
    </div>
  );
};

export default Blog;
