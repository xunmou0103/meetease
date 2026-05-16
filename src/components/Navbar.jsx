import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';

const highlightLink = {
  to: '/integration',
  label: '接入会议',
  badge: '入门',
};

const links = [
  { to: '/', label: '工作台', end: true },
  { to: '/pre-meeting', label: '会前准备' },
  { to: '/analysis', label: 'AI 会议分析' },
  { to: '/minutes', label: '会议纪要' },
  { to: '/tasks', label: '待办事项' },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <span className="navbar-brand-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h10M4 18h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.9" />
            </svg>
          </span>
          <span className="navbar-brand-text">
            <span className="navbar-brand-name">MeetEase</span>
            <span className="navbar-brand-sub">美团 · 智能视频会议助手</span>
          </span>
        </NavLink>
        <span className="navbar-demo-pill">美团产品测评 Demo</span>
        <div className="navbar-links">
          <NavLink
            to={highlightLink.to}
            className={({ isActive }) =>
              `nav-link nav-link-highlight${isActive ? ' active' : ''}`
            }
          >
            <svg
              className="nav-highlight-svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            {highlightLink.label}
            <span className="nav-highlight-badge">{highlightLink.badge}</span>
          </NavLink>
          <span className="nav-divider" aria-hidden />
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="navbar-right">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
