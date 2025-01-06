import { useState } from "react";

const Blog = ({ blog }) => {
  const [isCollapse, setIsCollapse] = useState(true);
  return (
    <div style={{ border: "2px solid black", margin: "10px 5px" }}>
      <p>{blog.title}</p>
      {isCollapse ? (
        <button onClick={() => setIsCollapse(false)}>view</button>
      ) : (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button>like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={() => setIsCollapse(true)}>hide</button>
        </>
      )}
    </div>
  );
};

export default Blog;
