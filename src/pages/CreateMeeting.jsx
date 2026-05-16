import { useState } from 'react';
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

export default function CreateMeeting() {
  const [form, setForm] = useState(emptyForm);
  const [agendaResult, setAgendaResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = () => {
    setAgendaResult(generateAgenda(form));
  };

  return (
    <>
      <PageHeader
        title="创建会议"
        subtitle="填写会议信息，使用 AI 生成会前议程与准备清单"
        badge="会前"
      />

      <Card title="会议信息">
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
    </>
  );
}
