import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css'; // Import the CSS file

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const apiBaseUrl = process.env.REACT_APP_API_URL;

  async function handleLogin() {
    try {
      const res = await axios.post(`${apiBaseUrl}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/dashboard');
    } catch {
      alert('Login failed');
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <label htmlFor="email">Email:</label><br />
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br /><br />

        <label htmlFor="password">Password:</label><br />
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br /><br />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;