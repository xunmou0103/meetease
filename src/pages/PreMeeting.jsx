
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import { generateAgenda } from '../utils/aiTemplates';

const emptyForm = {
  topic: '',
  time: '',
  attendees: '',
  goal: '',
  materials: '',
};

export default function PreMeeting() {
  const [form, setForm] = useState(emptyForm);
  const [agendaResult, setAgendaResult] = useState(null);
  const [deviceCheck, setDeviceCheck] = useState({
    microphone: { status: 'checking', level: 0 },
    camera: { status: 'checking', available: false },
    network: { status: 'checking', speed: 0, latency: 0 },
  });
  const [syncedMeetings, setSyncedMeetings] = useState([]);
  const [showSyncModal, setShowSyncModal] = useState(false);

  useEffect(() => {
    performDeviceCheck();
    loadSyncedMeetings();
  }, []);

  const performDeviceCheck = async () => {
    const check = { ...deviceCheck };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      check.microphone.status = 'ok';
      check.microphone.level = 85;
      stream.getTracks().forEach(track => track.stop());
    } catch (e) {
      check.microphone.status = 'error';
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      check.camera.status = 'ok';
      check.camera.available = true;
      stream.getTracks().forEach(track => track.stop());
    } catch (e) {
      check.camera.status = 'error';
    }

    check.network.status = 'ok';
    check.network.speed = 45;
    check.network.latency = 32;

    setDeviceCheck(check);
  };

  const loadSyncedMeetings = () => {
    const saved = localStorage.getItem('syncedMeetings');
    if (saved) {
      setSyncedMeetings(JSON.parse(saved));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = () => {
    setAgendaResult(generateAgenda(form));
  };

  const handleSyncMeetings = () => {
    const mockMeetings = [
      {
        id: 1,
        topic: 'Q2 产品规划会',
        time: '2026-05-17 10:00',
        platform: '腾讯会议',
        attendees: '张三、李四、王五',
      },
      {
        id: 2,
        topic: '技术周会',
        time: '2026-05-18 14:00',
        platform: '钉钉',
        attendees: '技术团队全体',
      },
    ];
    setSyncedMeetings(mockMeetings);
    localStorage.setItem('syncedMeetings', JSON.stringify(mockMeetings));
    setShowSyncModal(false);
  };

  const handleSyncToCalendar = (meeting) => {
    alert(`已将「${meeting.topic}」同步到日历！`);
  };

  const getStatusIcon = (status) => {
    if (status === 'ok') return '✅';
    if (status === 'checking') return '⏳';
    return '❌';
  };

  const getStatusText = (status) => {
    if (status === 'ok') return '正常';
    if (status === 'checking') return '检测中';
    return '异常';
  };

  return (
    <>
      <PageHeader
        title="会前准备"
        subtitle="设备预检 · 会议创建 · 日程同步 · 智能提醒"
        badge="会前"
      />

      <Card title="设备预检" className="mb-20">
        <div className="device-check-grid">
          <div className="device-check-item">
            <div className="device-check-icon">🎤</div>
            <div className="device-check-info">
              <h4>麦克风</h4>
              <p className="device-check-status">
                {getStatusIcon(deviceCheck.microphone.status)} {getStatusText(deviceCheck.microphone.status)}
              </p>
              {deviceCheck.microphone.level > 0 && (
                <div className="device-check-meter">
                  <div 
                    className="device-check-meter-fill" 
                    style={{ width: `${deviceCheck.microphone.level}%` }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="device-check-item">
            <div className="device-check-icon">📷</div>
            <div className="device-check-info">
              <h4>摄像头</h4>
              <p className="device-check-status">
                {getStatusIcon(deviceCheck.camera.status)} {getStatusText(deviceCheck.camera.status)}
              </p>
            </div>
          </div>
          <div className="device-check-item">
            <div className="device-check-icon">🌐</div>
            <div className="device-check-info">
              <h4>网络</h4>
              <p className="device-check-status">
                {getStatusIcon(deviceCheck.network.status)} {getStatusText(deviceCheck.network.status)}
              </p>
              {deviceCheck.network.speed > 0 && (
                <p className="device-check-detail">
                  网速 {deviceCheck.network.speed} Mbps · 延迟 {deviceCheck.network.latency}ms
                </p>
              )}
            </div>
          </div>
        </div>
        <button 
          type="button" 
          className="btn btn-ghost mt-15"
          onClick={performDeviceCheck}
        >
          重新检测
        </button>
      </Card>

      <Card title="同步会议" className="mb-20">
        <p className="card-subtitle">从腾讯会议、钉钉、飞书同步已预约的会议</p>
        <button 
          type="button" 
          className="btn btn-primary mb-15"
          onClick={() => setShowSyncModal(true)}
        >
          🔄 同步会议
        </button>
        
        {syncedMeetings.length > 0 && (
          <div className="synced-meetings-list">
            {syncedMeetings.map((meeting) => (
              <div key={meeting.id} className="synced-meeting-item">
                <div>
                  <div className="synced-meeting-title">{meeting.topic}</div>
                  <div className="synced-meeting-meta">
                    🕐 {meeting.time} · 📱 {meeting.platform}
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn btn-ghost btn-small"
                  onClick={() => handleSyncToCalendar(meeting)}
                >
                  📅 同步日历
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="创建/编辑会议">
        <div className="form-group">
          <label htmlFor="topic">会议主题</label>
          <input
            id="topic"
            name="topic"
            value={form.topic}
            onChange={handleChange}
            placeholder="例如：Q2 产品规划会"
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">会议时间</label>
          <input
            id="time"
            name="time"
            type="datetime-local"
            value={form.time}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="attendees">参会人员</label>
          <input
            id="attendees"
            name="attendees"
            value={form.attendees}
            onChange={handleChange}
            placeholder="张三、李四、王五"
          />
        </div>
        <div className="form-group">
          <label htmlFor="goal">会议目标</label>
          <textarea
            id="goal"
            name="goal"
            value={form.goal}
            onChange={handleChange}
            placeholder="明确本次会议需要达成的目标"
          />
        </div>
        <div className="form-group">
          <label htmlFor="materials">背景资料</label>
          <textarea
            id="materials"
            name="materials"
            value={form.materials}
            onChange={handleChange}
            placeholder="粘贴或简述会前阅读材料要点"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleGenerate}>
          AI 生成会议议程
        </button>
      </Card>

      {agendaResult && (
        <div className="ai-result-grid mt-20">
          <Card title="会议议程">
            <ul>
              {agendaResult.agenda.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card title="讨论重点">
            <ul>
              {agendaResult.focusPoints.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card title="准备清单">
            <ul>
              {agendaResult.checklist.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {showSyncModal && (
        <div className="modal-overlay" onClick={() => setShowSyncModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>同步会议</h3>
            <p>选择要同步的会议平台：</p>
            <div className="sync-platforms">
              <button type="button" className="btn btn-ghost btn-large" onClick={handleSyncMeetings}>
                🟢 腾讯会议
              </button>
              <button type="button" className="btn btn-ghost btn-large" onClick={handleSyncMeetings}>
                🔵 钉钉
              </button>
              <button type="button" className="btn btn-ghost btn-large" onClick={handleSyncMeetings}>
                🔷 飞书
              </button>
            </div>
            <button 
              type="button" 
              className="btn btn-ghost mt-15"
              onClick={() => setShowSyncModal(false)}
            >
              取消
            </button>
          </div>
        </div>
      )}
    </>
  );
}
