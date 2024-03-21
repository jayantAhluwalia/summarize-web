import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setUsername: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUsername }) => {
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event: any) => {
    event.preventDefault();
    setUsername(userInput); // Pass username to parent App component
    navigate('/upload');
  };

  return (
    <div className="login-page">
      <h1>Welcome!</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          required
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

export default LoginPage;
