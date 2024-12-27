import { useEffect, useState } from "react";
import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from "./utils/storage.js";
import Login from "./components/Login.jsx";
import Blogs from "./components/Blogs.jsx";
import { getMyProfile } from "./services/login.js";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    getLocalStorage(localStorageNames.token) ?? "",
  );

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

  if (!token) return <Login setToken={(token) => setToken(token)} />;

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user?.username} logged in{" "}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Blogs />
    </div>
  );
};

export default App;
