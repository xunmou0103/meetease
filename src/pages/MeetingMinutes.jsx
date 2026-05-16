import { useState } from 'react';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import { sampleMeeting } from '../data/mockData';
import { getMinutesByStyle, generateFollowUpEmail } from '../utils/aiTemplates';

const STYLES = [
  { id: 'concise', label: '简洁版', desc: '速记要点，适合内部快速同步' },
  { id: 'formal', label: '正式版', desc: '完整纪要，适合存档与对外汇报' },
  { id: 'pm', label: '项目管理版', desc: '含 Action Items、里程碑与 RAID' },
];

const FIELD_LABELS = [
  { key: 'title', label: '会议主题' },
  { key: 'time', label: '会议时间' },
  { key: 'attendees', label: '参会人员' },
  { key: 'background', label: '会议背景' },
  { key: 'discussion', label: '讨论内容' },
  { key: 'conclusions', label: '会议结论' },
  { key: 'todos', label: '待办事项' },
  { key: 'nextSteps', label: '下一步计划' },
];

export default function MeetingMinutes() {
  const [style, setStyle] = useState('formal');
  const [toast, setToast] = useState('');
  const [emailModal, setEmailModal] = useState(null);

  const meeting = sampleMeeting;
  const formatted = getMinutesByStyle(meeting, style);
  const display = formatted.fields;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleCopy = async () => {
    const text = `${formatted.title}\n\n${formatted.body}`;
    try {
      await navigator.clipboard.writeText(text);
      showToast('纪要已复制到剪贴板');
    } catch {
      showToast('复制失败，请手动选择复制');
    }
  };

  const handleEmail = () => {
    setEmailModal(generateFollowUpEmail(meeting, style));
  };

  const currentStyleMeta = STYLES.find((s) => s.id === style);

  return (
    <>
      <PageHeader
        title="会议纪要"
        subtitle="切换风格查看不同详略与格式的纪要内容"
        badge="会后"
      />

      <div className="tabs">
        {STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`tab${style === s.id ? ' active' : ''}`}
            onClick={() => setStyle(s.id)}
            title={s.desc}
          >
            {s.label}
          </button>
        ))}
      </div>
      {currentStyleMeta && (
        <p className="style-hint">{currentStyleMeta.desc}</p>
      )}

      <div className="action-bar">
        <button type="button" className="btn btn-primary" onClick={handleCopy}>
          一键复制纪要
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleEmail}>
          生成会后邮件
        </button>
      </div>

      <Card title={formatted.title}>
        {FIELD_LABELS.map(({ key, label }) => (
          <div key={key} className="minutes-field">
            <h4>{label}</h4>
            <p>{display[key]}</p>
          </div>
        ))}
        <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid var(--border)' }} />
        <div className="minutes-field">
          <h4>导出预览（{currentStyleMeta?.label}）</h4>
          <pre className="minutes-preview">{formatted.body}</pre>
        </div>
      </Card>

      {emailModal && (
        <div className="modal-overlay" onClick={() => setEmailModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>会后跟进邮件</h3>
            <p>
              <strong>主题：</strong>
              {emailModal.subject}
            </p>
            <pre>{emailModal.body}</pre>
            <button
              type="button"
              className="btn btn-primary"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `主题：${emailModal.subject}\n\n${emailModal.body}`
                );
                showToast('邮件内容已复制');
                setEmailModal(null);
              }}
            >
              复制邮件内容
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ marginLeft: 8 }}
              onClick={() => setEmailModal(null)}
            >
              关闭
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
