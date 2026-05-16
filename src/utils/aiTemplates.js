export function generateAgenda(form) {
  const topic = form.topic || '本次会议';
  const goal = form.goal || '明确会议目标与行动项';
  const attendees = form.attendees || '全体参会人';

  return {
    agenda: [
      `开场与目标对齐（5 分钟）— ${goal}`,
      `主题讨论：${topic}（25 分钟）`,
      `关键问题决议与待办分配（15 分钟）`,
      `总结与下次会议安排（5 分钟）`,
    ],
    focusPoints: [
      `核心目标：${goal}`,
      `参会关键人：${attendees}`,
      '资源、排期与依赖关系确认',
      '风险点与阻塞项识别',
      form.materials ? `背景资料要点：${form.materials.slice(0, 80)}${form.materials.length > 80 ? '...' : ''}` : '提前阅读会前背景资料',
    ],
    checklist: [
      '确认参会人员与时间',
      '提前阅读背景资料并准备问题',
      '准备相关数据、演示或文档',
      '明确需在会上决策的事项清单',
      '准备记录模板以便会后整理纪要',
    ],
  };
}

const analysisPresets = {
  m1: {
    keyConclusions: [
      'MVP 范围确定为「会前议程 + 智能纪要」，待办跟踪以 Beta 发布',
      '若增加无障碍适配，整体排期可能延后约 1 周',
      '需求基线需在 5 月 25 日前锁定',
    ],
    discussionPoints: [
      'Q2 三大核心功能优先级与交付范围',
      '研发人力与功能并行可行性',
      '设计排期与无障碍、移动端适配',
      '预算审批时间节点',
    ],
    risks: [
      '研发人力仅能支撑 2 个功能完整上线，存在范围蔓延风险',
      '预算二次审批未完成可能影响采购与外包',
      '无障碍适配导致排期延后的连锁影响',
    ],
    actionItems: [
      { task: '提交完整需求文档', owner: '张三', due: '05-17' },
      { task: '输出技术方案与工时评估', owner: '李四', due: '05-20' },
      { task: '更新项目排期表', owner: '王五', due: '05-18' },
      { task: '交付 UI 设计稿 v1', owner: '赵六', due: '05-22' },
    ],
    summary:
      '团队一致同意 MVP 聚焦「智能议程」与「智能纪要」，待办跟踪以 Beta 发布。下一步由张三负责需求文档、李四输出技术方案、王五更新排期。',
  },
  m2: {
    keyConclusions: [
      '微服务拆分方案 v2 原则通过',
      '数据库迁移采用分阶段策略（只读副本 → 切写）',
      '核心链路迁移目标窗口为 6 月底前',
    ],
    discussionPoints: [
      '订单与用户中心服务边界',
      '测试资源提前两周介入回归',
      '压测环境就绪时间',
    ],
    risks: ['回归测试资源不足', '压测环境未就绪可能阻塞上线', '迁移期间双写一致性'],
    actionItems: [
      { task: '输出压测环境就绪计划', owner: '李四', due: '05-22' },
      { task: '补充迁移回滚预案', owner: '李四', due: '05-24' },
      { task: '协调测试人力排期', owner: '王五', due: '05-20' },
    ],
    summary:
      '架构评审通过微服务拆分 v2，强调分阶段数据库迁移与 6 月底核心链路上线目标。遗留压测环境排期问题需本周闭环。',
  },
  m3: {
    keyConclusions: [
      '客户 A 定制报表不建议插入 Q2 主路线图',
      '需联合销售与产品负责人审批插队需求',
      '下周向客户提交正式评估答复',
    ],
    discussionPoints: [
      '定制报表 6 月中旬演示诉求',
      '单独立项 vs 纳入 Q3 路线图',
      '客户侧数据开放接口依赖',
    ],
    risks: ['插队导致 Q2 里程碑延误', '客户数据接口延期', '人力预估不足（≥3 人周）'],
    actionItems: [
      { task: '撰写客户需求评估报告', owner: '张三', due: '05-21' },
      { task: '技术工时与依赖评估', owner: '李四', due: '05-20' },
      { task: '发起联合审批流程', owner: '王五', due: '05-19' },
    ],
    summary:
      '客户 A 定制需求与 Q2 规划存在冲突，结论为先输出评估报告再正式答复，避免未经审批插队开发。',
  },
};

function getPreset(meetingContext) {
  const id = meetingContext?.id;
  return analysisPresets[id] || analysisPresets.m1;
}

export function extractKeyPoints(transcript, meetingContext) {
  const hasContent = transcript && transcript.trim().length > 20;
  const preset = getPreset(meetingContext);
  const meetingTitle = meetingContext?.title || '本次会议';
  const topicHint = hasContent
    ? transcript.slice(0, 30).replace(/【.*?】/g, '').trim()
    : meetingTitle;

  return {
    keyConclusions: [
      ...preset.keyConclusions,
      hasContent
        ? `「${meetingTitle}」转写已纳入分析：${topicHint}…`
        : '请先粘贴会议转写文本以获取更精准分析',
    ],
    discussionPoints: preset.discussionPoints,
    risks: preset.risks,
    actionItems: preset.actionItems,
  };
}

export function extractActionItems(transcript, meetingContext) {
  const preset = getPreset(meetingContext);
  const meetingTitle = meetingContext?.title || '本次会议';
  const items = preset.actionItems.map((item, i) => ({
    ...item,
    task: item.task,
    priority: i === 0 ? '高' : '中',
    due: `2026-05-${17 + i}`,
  }));

  return {
    actionItems: items,
    note:
      transcript && transcript.trim().length > 20
        ? `已从「${meetingTitle}」转写中识别 ${items.length} 项待办（模拟）`
        : `展示「${meetingTitle}」预设待办模板，粘贴转写后可获得更精准识别（模拟）`,
  };
}

export function generateSummary(transcript, meetingContext) {
  const preset = getPreset(meetingContext);
  const meetingTitle = meetingContext?.title || '本次会议';
  const prefix =
    transcript && transcript.trim().length > 20
      ? `根据「${meetingTitle}」会议转写，`
      : `关于「${meetingTitle}」，`;
  return {
    summary: `${prefix}${preset.summary}`,
  };
}

export function getMinutesByStyle(meeting, style) {
  const m = meeting;

  if (style === 'concise') {
    const fields = {
      title: m.title,
      time: '2026-05-15 14:00（90 分钟）',
      attendees: '张三、李四、王五、赵六',
      background: '对齐 Q2 MVP 范围、资源与里程碑。',
      discussion:
        '• 核心功能：议程生成 + 智能纪要；待办跟踪走 Beta\n• 研发：2 项完整交付 + 1 项 Beta\n• 设计：无障碍/移动端 +1 周；预算 5 月底前再审',
      conclusions: 'MVP = 议程 + 纪要；5/25 前锁定需求基线。',
      todos:
        '张三→需求文档(5/17) | 李四→技术方案(5/20) | 王五→排期(5/18) | 赵六→设计稿(5/22)',
      nextSteps: '下周三跟进会；同步启动预算审批。',
    };
    return {
      title: `【速记】${m.title}`,
      fields,
      body: `${fields.title} | ${fields.time}

参会：${fields.attendees}

要点：${fields.discussion.replace(/\n/g, ' ')}

决议：${fields.conclusions}

待办：${fields.todos}

跟进：${fields.nextSteps}`,
    };
  }

  if (style === 'formal') {
    const fields = {
      title: m.title,
      time: m.time,
      attendees: m.attendees,
      background: m.background,
      discussion: m.discussion,
      conclusions: m.conclusions,
      todos: m.todos,
      nextSteps: m.nextSteps,
    };
    return {
      title: `会议纪要 - ${m.title}`,
      fields,
      body: `会议纪要

会议主题：${fields.title}
会议时间：${fields.time}
参会人员：${fields.attendees}

一、会议背景
${fields.background}

二、讨论内容
${fields.discussion}

三、会议结论
${fields.conclusions}

四、待办事项
${fields.todos}

五、下一步计划
${fields.nextSteps}

—— 本纪要由 MeetEase 智能助手生成`,
    };
  }

  // 项目管理版
  const fields = {
    title: `[PRJ-Q2] ${m.title}`,
    time: `${m.time} | 会议类型：里程碑评审 | 记录人：王五`,
    attendees: `核心干系人 4 人\n${m.attendees}\n决策人：张三（产品负责人）`,
    background: `【项目背景】\n${m.background}\n\n【本次会议目标】\n• 锁定 Q2 MVP 范围（Scope Baseline）\n• 确认资源与关键路径\n• 输出可跟踪 Action Items`,
    discussion: `【讨论记录 / Discussion Log】\n\n| # | 议题 | 发言要点 | 状态 |\n|---|------|----------|------|\n| 1 | MVP 范围 | 议程+纪要主交付；待办 Beta | Closed |\n| 2 | 研发容量 | 2 完整 + 1 Beta；存在范围蔓延风险 | Open |\n| 3 | 设计排期 | 无障碍/移动端 +1 周 | Monitoring |\n| 4 | 预算 | 5 月底前二次审批 | Blocked |\n\n原始讨论摘要：\n${m.discussion.split('\n').slice(0, 2).join('\n')}…`,
    conclusions: `【已批准决议 / Approved Decisions】\n✓ DEC-001：Q2 MVP = 会前议程 + 智能纪要（主交付）\n✓ DEC-002：待办跟踪以 Beta 发布，不纳入本期承诺范围\n✓ DEC-003：需求基线锁定日 2026-05-25\n\n原文：${m.conclusions}`,
    todos: `【Action Items】\n\n| ID | 任务 | Owner | Due | Priority | Status |\n|----|------|-------|-----|----------|--------|\n| AI-01 | 提交完整需求文档 | 张三 | 05-17 | P0 | To Do |\n| AI-02 | 技术方案与工时评估 | 李四 | 05-20 | P0 | To Do |\n| AI-03 | 更新排期并同步全员 | 王五 | 05-18 | P1 | In Progress |\n| AI-04 | UI 设计稿 v1 | 赵六 | 05-22 | P1 | To Do |`,
    nextSteps: `【Next Milestone】\n• M1（05-25）：需求基线锁定 — Owner: 张三\n• M2（05-27）：跟进会 — 检查需求文档 & 技术方案\n• M3（05-31）：预算二次审批完成\n\n【RAID 摘要】\n🔴 Risk：研发人力不足 → 范围蔓延\n🟠 Issue：预算审批未完成\n🟡 Dependency：设计稿 v1（赵六 / 05-22）\n🟢 Action：见上表 AI-01 ~ AI-04`,
  };
  return {
    title: fields.title,
    fields,
    body: `${fields.title}
${fields.time}

${fields.background}

${fields.discussion}

${fields.conclusions}

${fields.todos}

${fields.nextSteps}`,
  };
}

export function generateFollowUpEmail(meeting, style) {
  const minutes = getMinutesByStyle(meeting, style);
  const subjectPrefix =
    style === 'concise'
      ? '【速记跟进】'
      : style === 'pm'
        ? '【项目跟进】'
        : '【会后跟进】';
  return {
    subject: `${subjectPrefix}${meeting.title} - 纪要与待办`,
    body: `各位同事好，

感谢参加 ${meeting.time} 举行的「${meeting.title}」。现将会议要点与待办同步如下：

${minutes.body}

如有补充或疑问，请回复本邮件。下次跟进会议将另行通知。

祝好，
会议组织者
（由 MeetEase 智能视频会议助手生成）`,
  };
}
