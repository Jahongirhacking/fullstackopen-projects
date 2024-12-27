import { useState } from "react";
import axios from "axios";
import { getLocalStorage, localStorageNames } from "../utils/storage.js";
import { getAll } from "../services/blogs.js";

const baseURL = import.meta.env.VITE_API_URL;

const BlogCreator = ({ setBlogs }) => {
  const [formObj, setFormObj] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${baseURL}/blogs`, formObj, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
      },
    });
    const blogs = await getAll();
    setBlogs(blogs);
    setFormObj({});
  };

  return (
    <div style={{ width: "fit-content", marginBottom: "2rem" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
      >
        {["title", "author", "url"].map((key) => (
          <label key={key}>
            {key}:
            <input
              value={formObj[key] ?? ""}
              onChange={(e) =>
                setFormObj({ ...formObj, [key]: e.target.value })
              }
            />
          </label>
        ))}
        <button>create</button>
      </form>
    </div>
  );
};

export default BlogCreator;
