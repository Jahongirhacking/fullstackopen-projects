import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, handleRemove, username }) => {
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <div data-testid={'blog'} style={{ border: '2px solid black', margin: '10px 5px' }}>
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setIsCollapse((prev) => !prev)}>
          {isCollapse ? 'view' : 'hide'}
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
          {blog?.user?.username === username && (
            <button onClick={() => handleRemove(blog.id)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

export default Blog;
