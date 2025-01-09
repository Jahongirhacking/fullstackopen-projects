import { useContext, useState } from 'react';
import axios from 'axios';
import { getLocalStorage, localStorageNames } from '../utils/storage.js';
import { getAll } from '../services/blogs.js';
import { NotificationContext } from '../App.jsx';

const baseURL = import.meta.env.VITE_API_URL;

const BlogCreator = ({ setBlogs }) => {
  const [formObj, setFormObj] = useState({});
  const { showMessage } = useContext(NotificationContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post(`${baseURL}/blogs`, formObj, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
        },
      });
      const blogs = await getAll();
      setBlogs(blogs);
      showMessage(`a new blog ${formObj?.title} by ${formObj?.author} added`, true);
      setFormObj({});
    } catch (error) {
      console.error(error);
      showMessage(`error on adding ${formObj?.title} by ${formObj?.author}`, false);
    }
  };

  return (
    <div style={{ width: 'fit-content', marginBottom: '2rem' }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', rowGap: '5px' }}
      >
        {['title', 'author', 'url'].map((key) => (
          <label key={key}>
            {key}:
            <input
              value={formObj[key] ?? ''}
              onChange={(e) => setFormObj({ ...formObj, [key]: e.target.value })}
            />
          </label>
        ))}
        <button>create</button>
      </form>
    </div>
  );
};

export default BlogCreator;
