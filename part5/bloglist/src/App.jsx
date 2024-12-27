import { createContext, useEffect, useState } from "react";
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from "./utils/storage.js";
import Login from "./components/Login.jsx";
import Blogs from "./components/Blogs.jsx";
import { getMyProfile } from "./services/login.js";
import BlogCreator from "./components/BlogCreator.jsx";
import { getAll } from "./services/blogs.js";
import Notification from "./components/Notification.jsx";

export const NotificationContext = createContext(null);

const App = () => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(
    getLocalStorage(localStorageNames.token) ?? "",
  );
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const showMessage = (message, isSuccess) => {
    setMessage(message);
    setIsSuccess(isSuccess);
    setTimeout(() => {
      setMessage("");
      setIsSuccess(false);
    }, 3000);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem(localStorageNames.token);
  };

  useEffect(() => {
    if (token) {
      (async () => {
        const myProfile = await getMyProfile(token);
        setUser(myProfile);
        setLocalStorage(localStorageNames.token, token);
      })();
    }
  }, [token]);

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {!token ? (
        <Login setToken={(token) => setToken(token)} />
      ) : (
        <div>
          <Notification message={message} isSuccess={isSuccess} />
          <h2>blogs</h2>
          <p>
            {user?.username} logged in{" "}
            <button onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          <BlogCreator setBlogs={setBlogs} />
          <Blogs blogs={blogs} />
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default App;
