import React, { useState } from 'react';
import { PlaneTakeoff, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (email === 'Pilot@aioq.com' && password === 'admin123') {
        onLogin();
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-header">
          <div className="logo-badge animated-logo">
            <PlaneTakeoff size={32} />
          </div>
          <h1 className="logo-text">AeroIQ AI</h1>
          <p className="login-subtitle">Welcome back! Please login to continue.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Credentials:</p>
          <code>Email: Pilot@aioq.com</code>
          <code>Password: admin123</code>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 