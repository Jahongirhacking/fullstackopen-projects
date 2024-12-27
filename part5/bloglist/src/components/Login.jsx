import { useContext, useState } from "react";
import login from "../services/login.js";
import { NotificationContext } from "../App.jsx";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showMessage } = useContext(NotificationContext);

  const handleLogin = async () => {
    try {
      const { token } = await login({ username, password });
      if (token) {
        setToken(token);
      }
    } catch (error) {
      showMessage("Invalid login or password", false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "8px",
        margin: "auto",
        width: "fit-content",
      }}
    >
      <h2>log in to application</h2>
      <label>
        username
        <input
          placeholder="enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        password
        <input
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default Login;
