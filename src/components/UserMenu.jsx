import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  if (!user) return null;

  const initial = user.displayName?.charAt(0) || 'U';

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/login');
  };

  const handleSettings = () => {
    setOpen(false);
    navigate('/settings');
  };

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="user-menu-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="user-avatar" style={{ background: 'var(--accent-gradient)' }}>
          {initial}
        </span>
        <span className="user-menu-name">{user.displayName}</span>
      </button>

      {open && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <p className="user-menu-display">{user.displayName}</p>
            <p className="user-menu-email">{user.email}</p>
            <p className="user-menu-id">助手 ID：{user.assistantId}</p>
            <span className="badge badge-status">
              通过 {user.providerName || user.provider} 登录
            </span>
          </div>
          <button type="button" className="user-menu-item" onClick={handleSettings}>
            ⚙️ 助手设置
          </button>
          <button type="button" className="user-menu-item" onClick={handleLogout}>
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
