import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../lib/adminAuth';

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remaining, setRemaining] = useState(null);
  const [lockSeconds, setLockSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const timers = useRef({});

  useEffect(() => {
    const timersRef = timers.current;
    return () => {
      clearInterval(timersRef.countdown);
      clearTimeout(timersRef.countdownEnd);
    };
  }, []);

  const startLockout = (seconds) => {
    setLockSeconds(seconds);
    setRemaining(null);
    setError('');
    clearInterval(timers.current.countdown);
    timers.current.countdown = setInterval(() => {
      setLockSeconds((s) => (s > 1 ? s - 1 : 0));
    }, 1000);
    clearTimeout(timers.current.countdownEnd);
    timers.current.countdownEnd = setTimeout(() => {
      setLockSeconds(0);
      clearInterval(timers.current.countdown);
    }, seconds * 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockSeconds > 0 || loading) return;
    setError('');
    setRemaining(null);
    setLoading(true);
    try {
      await loginAdmin(username, password);
      navigate('/admin');
    } catch (err) {
      if (err.status === 429 && err.retryAfter) {
        startLockout(err.retryAfter);
      } else if (err.remaining != null) {
        setRemaining(err.remaining);
        setError(err.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const locked = lockSeconds > 0;

  return (
    <div className="admin-login-page">
      <div className="glass-card admin-login-card">
        <div className="admin-login-head">
          <i className="fas fa-lock"></i>
          <h1>Admin <span className="gradient-text">Login</span></h1>
          <p>Sign in to manage your portfolio content</p>
        </div>

        {locked && (
          <div className="admin-alert admin-alert-error" role="alert">
            <i className="fas fa-hourglass-half"></i> Too many failed attempts. Try again in {lockSeconds}s.
          </div>
        )}

        {!locked && error && <div className="admin-alert admin-alert-error">{error}</div>}

        {!locked && remaining != null && remaining > 0 && (
          <div className="admin-alert admin-alert-warn">
            {remaining} attempt{remaining === 1 ? '' : 's'} remaining before temporary lockout.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              disabled={locked}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={locked}
              required
            />
          </div>

          <button type="submit" className="btn admin-login-btn" disabled={loading || locked}>
            {locked ? `Locked · ${lockSeconds}s` : loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
