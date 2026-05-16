import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loginWithProvider, loginLoading, providers } = useAuth();
  const [error, setError] = useState('');
  const [pendingProvider, setPendingProvider] = useState(null);

  const from = location.state?.from || '/';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = async (providerId) => {
    setError('');
    setPendingProvider(providerId);
    try {
      const { isNew } = await loginWithProvider(providerId);
      navigate(from, {
        replace: true,
        state: isNew ? { welcomeNewUser: true } : undefined,
      });
    } catch (e) {
      setError(e.message || '登录失败，请重试');
    } finally {
      setPendingProvider(null);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg" aria-hidden />
      <div className="login-container">
        <div className="login-brand">
          <span className="login-logo">ME</span>
          <h1>MeetEase</h1>
          <p>智能视频会议助手</p>
          <span className="login-demo-tag">美团 · 产品测评 Demo</span>
        </div>

        <div className="login-card">
          <h2>登录 / 注册</h2>
          <p className="login-subtitle">
            使用美团账户或任意主流账户登录；<strong>首次登录将自动创建</strong>您的 MeetEase 助手账户
          </p>

          <ul className="login-benefits">
            <li>美团统一账户体系，一键开通</li>
            <li>同步企业会议与待办偏好</li>
            <li>演示环境数据仅存于本机浏览器</li>
          </ul>

          <div className="login-providers">
            {providers.map((p) => (
              <button
                key={p.id}
                type="button"
                className="login-provider-btn"
                style={{ '--provider-color': p.color }}
                disabled={loginLoading}
                onClick={() => handleLogin(p.id)}
              >
                <span className="login-provider-icon" aria-hidden>
                  {p.name.charAt(0)}
                </span>
                <span className="login-provider-text">
                  <span className="login-provider-name">
                    {pendingProvider === p.id ? '正在登录…' : `使用 ${p.name} 登录`}
                  </span>
                  <span className="login-provider-desc">{p.desc}</span>
                </span>
              </button>
            ))}
          </div>

          {error && <p className="login-error">{error}</p>}

          <p className="login-legal">
            登录即表示您同意《用户服务协议》与《隐私政策》（演示文案）。
            本 Demo 不连接真实第三方 OAuth 服务。
          </p>
        </div>
      </div>
    </div>
  );
}
