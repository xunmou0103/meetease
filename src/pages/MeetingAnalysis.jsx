import { useState, useMemo } from 'react';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import { meetingsForAnalysis } from '../data/mockData';
import {
  extractKeyPoints,
  extractActionItems,
  generateSummary,
} from '../utils/aiTemplates';

export default function MeetingAnalysis() {
  const [selectedId, setSelectedId] = useState(meetingsForAnalysis[0].id);
  const [transcripts, setTranscripts] = useState(() =>
    Object.fromEntries(
      meetingsForAnalysis.map((m) => [m.id, m.transcript])
    )
  );
  const [analysis, setAnalysis] = useState(null);
  const [summary, setSummary] = useState('');
  const [actionNote, setActionNote] = useState('');

  const selectedMeeting = useMemo(
    () => meetingsForAnalysis.find((m) => m.id === selectedId) ?? meetingsForAnalysis[0],
    [selectedId]
  );

  const transcript = transcripts[selectedId] ?? '';

  const handleMeetingChange = (id) => {
    setSelectedId(id);
    setAnalysis(null);
    setSummary('');
    setActionNote('');
  };

  const handleTranscriptChange = (value) => {
    setTranscripts((prev) => ({ ...prev, [selectedId]: value }));
    setAnalysis(null);
    setSummary('');
    setActionNote('');
  };

  const meetingContext = {
    id: selectedMeeting.id,
    title: selectedMeeting.title,
  };

  const handleExtractKey = () => {
    setAnalysis(extractKeyPoints(transcript, meetingContext));
    setSummary('');
    setActionNote('');
  };

  const handleExtractTodos = () => {
    const result = extractActionItems(transcript, meetingContext);
    setAnalysis((prev) => ({
      ...(prev || extractKeyPoints(transcript, meetingContext)),
      actionItems: result.actionItems,
    }));
    setActionNote(result.note);
  };

  const handleSummary = () => {
    const result = generateSummary(transcript, meetingContext);
    setSummary(result.summary);
  };

  return (
    <>
      <PageHeader
        title="AI 会议分析"
        subtitle="选择历史或进行中的会议，基于转写文本智能提取重点、待办与摘要"
        badge="会中/会后"
      />

      <Card className="meeting-select-card mb-20">
        <div className="meeting-select-row">
          <div className="form-group meeting-select-field">
            <label htmlFor="meeting-select">选择会议</label>
            <select
              id="meeting-select"
              value={selectedId}
              onChange={(e) => handleMeetingChange(e.target.value)}
            >
              {meetingsForAnalysis.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} · {m.time}
                  {m.status === '进行中' ? '（进行中）' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="meeting-select-meta">
            <span
              className={`badge ${
                selectedMeeting.status === '进行中' ? 'badge-medium' : 'badge-status'
              }`}
            >
              {selectedMeeting.status}
            </span>
            <span className="list-item-meta">{selectedMeeting.time}</span>
          </div>
        </div>
        {selectedMeeting.status === '进行中' && !transcript.trim() && (
          <p className="meeting-select-hint">
            当前会议暂无转写，请粘贴实时字幕或会后录音转写文本。
          </p>
        )}
      </Card>

      <div className="action-bar">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleExtractKey}
          disabled={!transcript.trim()}
        >
          提取会议重点
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleExtractTodos}
          disabled={!transcript.trim()}
        >
          识别待办事项
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={handleSummary}
          disabled={!transcript.trim()}
        >
          生成会议摘要
        </button>
      </div>

      <div className="split-layout">
        <Card title={`转写文本 · ${selectedMeeting.title}`}>
          <textarea
            value={transcript}
            onChange={(e) => handleTranscriptChange(e.target.value)}
            style={{ minHeight: 420, width: '100%' }}
            placeholder="请选择会议后粘贴或编辑转写内容..."
          />
        </Card>

        <Card title={`AI 分析 · ${selectedMeeting.title}`}>
          {!transcript.trim() ? (
            <p className="empty-hint">请先选择会议并填入转写文本，再点击上方分析按钮</p>
          ) : !analysis && !summary ? (
            <p className="empty-hint">
              点击「提取会议重点」等按钮，对「{selectedMeeting.title}」进行 AI 分析（模拟）
            </p>
          ) : (
            <>
              {analysis && (
                <>
                  <section className="analysis-section">
                    <h4>关键结论</h4>
                    <ul>
                      {analysis.keyConclusions?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section className="analysis-section">
                    <h4>讨论重点</h4>
                    <ul>
                      {analysis.discussionPoints?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section className="analysis-section">
                    <h4>风险问题</h4>
                    <ul>
                      {analysis.risks?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section className="analysis-section">
                    <h4>待办事项</h4>
                    {actionNote && (
                      <p className="list-item-meta mb-20">{actionNote}</p>
                    )}
                    <ul>
                      {analysis.actionItems?.map((item, i) => (
                        <li key={i}>
                          {item.task} — {item.owner}（{item.due}）
                          {item.priority && ` [${item.priority}]`}
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              )}
              {summary && (
                <section className="analysis-section">
                  <h4>会议摘要</h4>
                  <p>{summary}</p>
                </section>
              )}
            </>
          )}
        </Card>
      </div>
    </>
  );
}
