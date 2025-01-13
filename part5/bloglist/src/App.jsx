import { createContext, useEffect, useRef, useState } from 'react';
import { getLocalStorage, localStorageNames, setLocalStorage } from './utils/storage.js';
import Login from './components/Login.jsx';
import Blogs from './components/Blogs.jsx';
import BlogCreator from './components/BlogCreator.jsx';
import { getAll } from './services/blogs.js';
import Notification from './components/Notification.jsx';
import axios from 'axios';
import Togglable from './components/Togglable.jsx';

const baseURL = import.meta.env.VITE_API_URL;

export const NotificationContext = createContext(null);

const App = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(getLocalStorage(localStorageNames.token) ?? '');
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const blogFormRef = useRef();

  const getAllBlogsFromDb = async () => {
    await getAll().then((blogs) => setBlogs(blogs));
  };

  const showMessage = (message, isSuccess) => {
    setMessage(message);
    setIsSuccess(isSuccess);
    setTimeout(() => {
      setMessage('');
      setIsSuccess(false);
    }, 3000);
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem(localStorageNames.token);
  };

  const handleSubmit = async (formObj) => {
    try {
      await axios.post(`${baseURL}/blogs`, formObj, {
        headers: {
          Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
        },
      });
      await getAllBlogsFromDb();
      blogFormRef.current?.toggleVisibility();
      showMessage(`a new blog ${formObj?.title} by ${formObj?.author} added`, true);
    } catch (error) {
      console.error(error);
      showMessage(`error on adding ${formObj?.title} by ${formObj?.author}`, false);
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await axios.get(`${baseURL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data);
          setLocalStorage(localStorageNames.token, token);
        } catch (error) {
          localStorage.removeItem(localStorageNames.token);
        }
      })();
    }
  }, [token]);

  useEffect(() => {
    (async () => await getAllBlogsFromDb())();
  }, []);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {!user ? (
        <div
          style={{
            margin: 'auto',
            width: 'fit-content',
          }}
        >
          <h2>log in to application</h2>
          <Notification message={message} isSuccess={isSuccess} />
          <Login setToken={(token) => setToken(token)} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={message} isSuccess={isSuccess} />
          <p>
            {user?.username} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogCreator handleSubmit={handleSubmit} />
          </Togglable>
          <Blogs username={user?.username} blogs={blogs} getAllBlogsFromDb={getAllBlogsFromDb} />
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default App;
