import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterPage.css'; // Import the external CSS

const apiBaseUrl = process.env.REACT_APP_API_URL;

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleRegister() {
    await axios.post(`${apiBaseUrl}/auth/register`, { email, password });
    navigate('/');
  }

  return (
    <div className="register-container">
      <h2>Register</h2>

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterPage;