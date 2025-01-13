import Blog from './Blog.jsx';
import { putLike, removeBlog } from '../services/blogs.js';

const Blogs = ({ blogs, getAllBlogsFromDb, username }) => {
  const handleLike = async (id) => {
    await putLike(id);
    await getAllBlogsFromDb();
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    await removeBlog(id);
    await getAllBlogsFromDb();
  };

  return (
    <div data-testid='blogs'>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            username={username}
          />
        ))}
    </div>
  );
};

export default Blogs;
