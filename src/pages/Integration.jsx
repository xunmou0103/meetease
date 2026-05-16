import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import {
  platforms,
  integrationMethods,
} from '../data/integrationGuides';

const STORAGE_CONNECTED = 'meetease_connected_platforms';

export default function Integration() {
  const navigate = useNavigate();
  const [activePlatform, setActivePlatform] = useState(platforms[0].id);
  const [activeStep, setActiveStep] = useState(0);
  const [connected, setConnected] = useState({});
  const [toast, setToast] = useState('');

  const platform = platforms.find((p) => p.id === activePlatform) ?? platforms[0];

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CONNECTED);
      if (saved) setConnected(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  };

  const handleSimulateConnect = () => {
    const next = { ...connected, [platform.id]: true };
    setConnected(next);
    localStorage.setItem(STORAGE_CONNECTED, JSON.stringify(next));
    showToast(`已模拟完成「${platform.name}」接入配置（演示）`);
  };

  const isConnected = !!connected[platform.id];

  return (
    <>
      <PageHeader
        title="接入视频会议"
        subtitle="按平台查看接入步骤，将 MeetEase 与腾讯会议、钉钉、飞书等打通"
        badge="接入"
      />

      <Card title="三种接入方式" className="mb-20">
        <div className="integration-methods">
          {integrationMethods.map((m) => {
            const supported = platform.methods.includes(m.id);
            return (
              <div
                key={m.id}
                className={`method-card${supported ? '' : ' method-card-disabled'}`}
              >
                <span className="method-icon">{m.icon}</span>
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
                {!supported && (
                  <span className="badge badge-medium">当前平台暂未开放</span>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="integration-layout">
        <Card title="选择会议平台" className="platform-list-card">
          <ul className="platform-list">
            {platforms.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={`platform-item${activePlatform === p.id ? ' active' : ''}${
                    connected[p.id] ? ' connected' : ''
                  }`}
                  onClick={() => {
                    setActivePlatform(p.id);
                    setActiveStep(0);
                  }}
                >
                  <span
                    className="platform-dot"
                    style={{ background: p.color }}
                  />
                  <span className="platform-name">{p.name}</span>
                  {p.status === 'beta' && (
                    <span className="badge badge-medium">内测</span>
                  )}
                  {connected[p.id] && (
                    <span className="badge badge-status">已配置</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <div className="integration-detail">
          <Card>
            <div className="platform-header">
              <span
                className="platform-logo"
                style={{ background: platform.color }}
              >
                {platform.name.slice(0, 2)}
              </span>
              <div>
                <h2 className="platform-title">{platform.name}</h2>
                <p className="list-item-meta">{platform.summary}</p>
              </div>
              <button
                type="button"
                className={`btn ${isConnected ? 'btn-ghost' : 'btn-accent'}`}
                onClick={handleSimulateConnect}
              >
                {isConnected ? '重新配置' : '模拟完成接入'}
              </button>
            </div>

            <div className="step-progress">
              {platform.steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`step-dot${activeStep === i ? ' active' : ''}${
                    i < activeStep ? ' done' : ''
                  }`}
                  onClick={() => setActiveStep(i)}
                  aria-label={`步骤 ${i + 1}`}
                />
              ))}
            </div>

            <div className="step-nav">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((s) => s - 1)}
              >
                上一步
              </button>
              <span className="step-indicator">
                步骤 {activeStep + 1} / {platform.steps.length}
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                disabled={activeStep >= platform.steps.length - 1}
                onClick={() => setActiveStep((s) => s + 1)}
              >
                下一步
              </button>
            </div>

            <div className="step-content">
              <h3>{platform.steps[activeStep].title}</h3>
              <p>{platform.steps[activeStep].detail}</p>
            </div>

            {platform.tips?.length > 0 && (
              <div className="integration-tips mt-20">
                <h4>温馨提示</h4>
                <ul>
                  {platform.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <Card title="接入后的推荐流程" className="mt-20">
            <ol className="flow-list">
              <li>
                <strong>会前</strong> — 在「创建会议」填写信息，AI 生成议程
              </li>
              <li>
                <strong>会中</strong> — 机器人/插件采集转写，或平台内开启实时字幕
              </li>
              <li>
                <strong>会后</strong> — 「AI 会议分析」提取重点，「会议纪要」导出多风格纪要
              </li>
              <li>
                <strong>跟进</strong> — 「待办事项」分配任务，生成会后邮件
              </li>
            </ol>
            <div className="action-bar" style={{ marginTop: 16, marginBottom: 0 }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/create')}
              >
                去创建会议
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/analysis')}
              >
                开始 AI 会议分析
              </button>
            </div>
          </Card>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
