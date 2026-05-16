
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';

const defaultSettings = {
  voiceEnhancement: true,
  aiNoiseReduction: true,
  realtimeTranslation: false,
  translationLanguage: 'en',
  autoJoinReminder: true,
  reminderTime: 5,
  deviceAutoCheck: true,
};

export default function Settings() {
  const [settings, setSettings] = useState(defaultSettings);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem('assistantSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem('assistantSettings', JSON.stringify(newSettings));
  };

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('assistantSettings', JSON.stringify(newSettings));
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <>
      <PageHeader
        title="助手设置"
        subtitle="个性化配置智能会议助手的功能与偏好"
        badge="设置"
      />

      <div className="settings-grid">
        <Card title="AI 音频功能" className="settings-card">
          <p className="card-subtitle">智能音频处理与增强</p>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4>智能人声增强</h4>
              <p>自动增强说话人的声音，让语音更清晰</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.voiceEnhancement}
                onChange={() => handleToggle('voiceEnhancement')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>AI 智能降噪</h4>
              <p>智能过滤背景噪音，提升录音质量</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.aiNoiseReduction}
                onChange={() => handleToggle('aiNoiseReduction')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </Card>

        <Card title="实时翻译" className="settings-card">
          <p className="card-subtitle">多语言实时翻译功能</p>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4>开启实时翻译</h4>
              <p>会议中实时翻译语音内容</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.realtimeTranslation}
                onChange={() => handleToggle('realtimeTranslation')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {settings.realtimeTranslation && (
            <div className="setting-item">
              <div className="setting-info">
                <h4>目标语言</h4>
                <p>选择翻译的目标语言</p>
              </div>
              <select
                value={settings.translationLanguage}
                onChange={(e) => handleChange('translationLanguage', e.target.value)}
                className="settings-select"
              >
                <option value="en">英语</option>
                <option value="zh">中文</option>
                <option value="ja">日语</option>
                <option value="ko">韩语</option>
                <option value="es">西班牙语</option>
                <option value="fr">法语</option>
              </select>
            </div>
          )}
        </Card>

        <Card title="会议提醒" className="settings-card">
          <p className="card-subtitle">智能入会提醒设置</p>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4>自动提醒</h4>
              <p>会议前自动发送入会提醒</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.autoJoinReminder}
                onChange={() => handleToggle('autoJoinReminder')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {settings.autoJoinReminder && (
            <div className="setting-item">
              <div className="setting-info">
                <h4>提醒时间</h4>
                <p>会议前多少分钟提醒</p>
              </div>
              <select
                value={settings.reminderTime}
                onChange={(e) => handleChange('reminderTime', parseInt(e.target.value))}
                className="settings-select"
              >
                <option value={1}>1 分钟</option>
                <option value={5}>5 分钟</option>
                <option value={10}>10 分钟</option>
                <option value={15}>15 分钟</option>
                <option value={30}>30 分钟</option>
              </select>
            </div>
          )}
        </Card>

        <Card title="设备设置" className="settings-card">
          <p className="card-subtitle">设备检测与配置</p>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4>自动设备预检</h4>
              <p>进入会前准备时自动检测设备</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.deviceAutoCheck}
                onChange={() => handleToggle('deviceAutoCheck')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </Card>

        <Card title="外观设置" className="settings-card">
          <p className="card-subtitle">界面主题与显示偏好</p>
          
          <div className="theme-selector">
            <button
              type="button"
              className={`theme-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              ☀️ 浅色模式
            </button>
            <button
              type="button"
              className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              🌙 深色模式
            </button>
          </div>
        </Card>
      </div>
    </>
  );
}
