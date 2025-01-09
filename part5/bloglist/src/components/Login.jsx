import { useContext, useState } from 'react';
import { NotificationContext } from '../App.jsx';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { showMessage } = useContext(NotificationContext);

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`${baseURL}/login`, {
        username,
        password,
      });
      const token = data?.token;
      if (token) {
        setToken(token);
      }
    } catch (error) {
      showMessage(error?.response?.data?.error, false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
      }}
    >
      <label>
        username
        <input
          placeholder='enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        password
        <input
          placeholder='enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default Login;
