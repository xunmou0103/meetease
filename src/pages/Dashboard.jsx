import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import {
  todayMeetingsCount,
  pendingTasksCount,
  recentMinutes,
  highPriorityTodos,
} from '../data/mockData';

const quickLinks = [
  { label: '会前准备', path: '/pre-meeting', icon: '📅' },
  { label: 'AI 会议分析', path: '/analysis', icon: '🎙️' },
  { label: '会议纪要', path: '/minutes', icon: '📝' },
  { label: '待办事项', path: '/tasks', icon: '✅' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (location.state?.welcomeNewUser && user) {
      setToast(
        `欢迎，${user.displayName}！已自动创建助手账户（${user.assistantId}）`
      );
      navigate('/', { replace: true, state: {} });
      const t = setTimeout(() => setToast(''), 4500);
      return () => clearTimeout(t);
    }
  }, [location.state, user, navigate]);

  return (
    <>
      <PageHeader
        title="工作台"
        subtitle="会前准备 · 会中记录 · 会后纪要 · 任务跟踪"
        badge="概览"
      />

      <Card className="integration-banner integration-banner-prominent mb-20">
        <div className="integration-banner-inner">
          <div className="integration-banner-visual" aria-hidden>
            <span className="integration-banner-icon">🔗</span>
          </div>
          <div className="integration-banner-content">
            <span className="integration-banner-tag">首次使用推荐</span>
            <h3 className="integration-banner-title">
              接入腾讯会议、钉钉、飞书等视频会议
            </h3>
            <p className="integration-banner-desc">
              三步完成配置：选择平台 → 按引导接入 → 开始智能记录与纪要生成
            </p>
          </div>
          <div className="integration-banner-actions">
            <button
              type="button"
              className="btn btn-accent"
              onClick={() => navigate('/integration')}
            >
              查看接入指南
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-on-banner"
              onClick={() => navigate('/pre-meeting')}
            >
              会前准备
            </button>
          </div>
        </div>
      </Card>

      <div className="quick-links mb-20">
        {quickLinks.map((item) => (
          <button
            key={item.path}
            type="button"
            className="quick-link-chip"
            onClick={() => navigate(item.path)}
          >
            <span className="quick-link-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid-2 mb-20">
        <Card className="stat-card stat-card-enhanced">
          <div className="stat-card-icon stat-icon-meeting">📊</div>
          <div className="stat-value">{todayMeetingsCount}</div>
          <div className="stat-label">今日会议</div>
        </Card>
        <Card className="stat-card stat-card-enhanced">
          <div className="stat-card-icon stat-icon-task">📋</div>
          <div className="stat-value">{pendingTasksCount}</div>
          <div className="stat-label">待完成任务</div>
        </Card>
      </div>

      <div className="grid-2">
        <Card title="最近会议纪要">
          {recentMinutes.map((item) => (
            <div key={item.id} className="list-item list-item-enhanced">
              <div>
                <div className="list-item-title">{item.title}</div>
                <div className="list-item-meta">
                  {item.date} · {item.summary}
                </div>
              </div>
            </div>
          ))}
        </Card>

        <Card title="高优先级待办">
          {highPriorityTodos.map((item) => (
            <div key={item.id} className="list-item list-item-enhanced">
              <div>
                <div className="list-item-title">{item.title}</div>
                <div className="list-item-meta">
                  {item.owner} · 截止 {item.due}
                </div>
              </div>
              <span className="badge badge-high">{item.priority}</span>
            </div>
          ))}
        </Card>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
