import { useState, useMemo, useEffect } from 'react';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import { initialTasks, teamMembers } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const STATUS_OPTIONS = ['全部', '待办', '进行中', '已完成'];
const TASK_STATUSES = ['待办', '进行中', '已完成'];
const STORAGE_KEY = 'meetease_current_user';

function priorityClass(priority) {
  if (priority === '高') return 'badge-high';
  if (priority === '中') return 'badge-medium';
  return 'badge-low';
}

export default function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState('全部');
  const [currentUser, setCurrentUser] = useState('');
  const [myTasksOnly, setMyTasksOnly] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && teamMembers.includes(saved)) {
      setCurrentUser(saved);
      return;
    }
    if (user?.displayName && teamMembers.includes(user.displayName)) {
      setCurrentUser(user.displayName);
    }
  }, [user]);

  const handleUserChange = (name) => {
    setCurrentUser(name);
    if (name) {
      localStorage.setItem(STORAGE_KEY, name);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const filtered = useMemo(() => {
    let result = tasks;
    if (statusFilter !== '全部') {
      result = result.filter((t) => t.status === statusFilter);
    }
    if (myTasksOnly && currentUser) {
      result = result.filter((t) => t.owner === currentUser);
    }
    return result;
  }, [tasks, statusFilter, myTasksOnly, currentUser]);

  const myTaskCount = useMemo(() => {
    if (!currentUser) return 0;
    return tasks.filter((t) => t.owner === currentUser).length;
  }, [tasks, currentUser]);

  const updateStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <>
      <PageHeader
        title="待办事项"
        subtitle="跟踪会议产生的任务，按状态筛选，或快速查看「我的待办」"
        badge="跟进"
      />

      <Card>
        <div className="filter-bar owner-filter-bar">
          <label htmlFor="current-user">我是：</label>
          <select
            id="current-user"
            value={currentUser}
            onChange={(e) => handleUserChange(e.target.value)}
          >
            <option value="">请选择姓名</option>
            {teamMembers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <label className="my-tasks-toggle">
            <input
              type="checkbox"
              checked={myTasksOnly}
              disabled={!currentUser}
              onChange={(e) => setMyTasksOnly(e.target.checked)}
            />
            仅看我的待办
          </label>

          {currentUser && myTasksOnly && (
            <span className="badge badge-status">
              {currentUser} 的任务 · 共 {filtered.length} 项
            </span>
          )}

          {currentUser && !myTasksOnly && (
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => setMyTasksOnly(true)}
            >
              查看 {currentUser} 的 {myTaskCount} 项待办
            </button>
          )}
        </div>

        <div className="filter-bar">
          <label htmlFor="status-filter">按状态筛选：</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span className="list-item-meta">
            {myTasksOnly && currentUser
              ? `${currentUser} 的待办 · 共 ${filtered.length} 项`
              : `共 ${filtered.length} 项`}
          </span>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>任务名称</th>
                <th>负责人</th>
                <th>截止时间</th>
                <th>优先级</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((task) => (
                <tr
                  key={task.id}
                  className={
                    currentUser && task.owner === currentUser
                      ? 'row-mine'
                      : undefined
                  }
                >
                  <td>{task.name}</td>
                  <td>
                    {task.owner}
                    {currentUser && task.owner === currentUser && (
                      <span className="badge badge-status" style={{ marginLeft: 8 }}>
                        我
                      </span>
                    )}
                  </td>
                  <td>{task.due}</td>
                  <td>
                    <span className={`badge ${priorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                      style={{ padding: '6px 10px', borderRadius: 6 }}
                    >
                      {TASK_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="empty-hint">
              {myTasksOnly && currentUser
                ? `${currentUser} 暂无符合筛选条件的任务`
                : '暂无符合筛选条件的任务'}
            </p>
          )}
        </div>
      </Card>
    </>
  );
}
