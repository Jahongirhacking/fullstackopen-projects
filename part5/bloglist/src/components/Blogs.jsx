import Blog from "./Blog.jsx";

const Blogs = ({ blogs, getAllBlogsFromDb }) => {
  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            getAllBlogsFromDb={getAllBlogsFromDb}
          />
        ))}
    </div>
  );
};

export default Blogs;
