export const integrationMethods = [
  {
    id: 'bot',
    title: '会议机器人',
    desc: '将 MeetEase 机器人邀请进会议室，自动采集语音并转写（推荐）',
    icon: '🤖',
  },
  {
    id: 'plugin',
    title: '客户端插件',
    desc: '在视频会议客户端侧边栏打开 MeetEase，会中一键记录',
    icon: '🔌',
  },
  {
    id: 'upload',
    title: '录音/转写导入',
    desc: '会后导出录音或字幕文件，在「AI 会议分析」中选择对应会议并分析',
    icon: '📤',
  },
];

export const platforms = [
  {
    id: 'tencent',
    name: '腾讯会议',
    color: '#006eff',
    status: 'supported',
    methods: ['bot', 'plugin', 'upload'],
    summary: '支持会议机器人入会与云录制字幕导出，企业版可开通应用接入。',
    steps: [
      {
        title: '开通企业应用（管理员）',
        detail:
          '登录腾讯会议企业管理后台 → 应用管理 → 添加第三方应用，搜索或配置 MeetEase，完成 OAuth 授权与可见范围设置。',
      },
      {
        title: '预约会议并邀请机器人',
        detail:
          '在 MeetEase「创建会议」中填写会议信息，点击「生成入会链接」；复制机器人 ID，在腾讯会议「参会人」中添加机器人账号，或使用会议号 + 密码让机器人自动入会。',
      },
      {
        title: '会中开启实时转写',
        detail:
          '腾讯会议内打开「实时转写」或「云录制」；MeetEase 侧边栏将同步显示转写流，可点击「提取会议重点」生成纪要草案。',
      },
      {
        title: '会后同步纪要',
        detail:
          '会议结束后，在云录制详情页导出「智能纪要/字幕文件」，或在 MeetEase 自动拉取录制（需已授权），进入「会议纪要」一键生成正式版纪要。',
      },
    ],
    tips: [
      '个人版用户可跳过机器人，直接使用「录音/转写导入」方式。',
      '请确保机器人入会后拥有「录制」或「转写」权限。',
      '敏感会议建议在企业管理后台配置数据留存策略。',
    ],
  },
  {
    id: 'dingtalk',
    name: '钉钉会议',
    color: '#0089ff',
    status: 'supported',
    methods: ['plugin', 'upload'],
    summary: '通过钉钉工作台微应用或会后导出闪记文本接入。',
    steps: [
      {
        title: '添加 MeetEase 微应用',
        detail:
          '钉钉管理后台 → 工作台 → 添加应用 → 选择 MeetEase，按指引完成 corpId 绑定与可见部门配置。',
      },
      {
        title: '会议中使用闪记',
        detail:
          '钉钉视频会议中开启「闪记」功能，会后可在闪记详情中复制全文，在 MeetEase「AI 会议分析」中选择对应会议并分析。',
      },
      {
        title: '关联日程自动创建',
        detail:
          '授权日历后，MeetEase 将同步钉钉日程中的视频会议，会前自动生成议程与准备清单。',
      },
    ],
    tips: ['钉钉机器人入会在部分租户需单独申请，请以管理后台说明为准。'],
  },
  {
    id: 'feishu',
    name: '飞书视频会议',
    color: '#3370ff',
    status: 'supported',
    methods: ['bot', 'upload'],
    summary: '支持飞书日历联动与妙记导出对接。',
    steps: [
      {
        title: '安装飞书应用',
        detail: '飞书开放平台创建企业自建应用，配置 MeetEase 回调地址与会议相关权限 scope。',
      },
      {
        title: '日历订阅',
        detail: '在 MeetEase 接入页完成飞书 OAuth，开启「同步视频会议日程」。',
      },
      {
        title: '使用妙记导出',
        detail: '会后从飞书妙记导出文本，或授权 MeetEase 读取妙记 API（企业版）。',
      },
    ],
    tips: ['飞书妙记需会议主持人或纪要权限方可导出。'],
  },
  {
    id: 'wecom',
    name: '企业微信会议',
    color: '#07c160',
    status: 'beta',
    methods: ['upload'],
    summary: '当前支持会后导入；会中机器人能力内测中。',
    steps: [
      {
        title: '导出会议录制',
        detail: '企业微信会议结束后，在会议详情下载录制或联系管理员开通转写能力。',
      },
      {
        title: '导入 MeetEase',
        detail: '将字幕或转写文本粘贴至「AI 会议分析」并选择对应会议，提取重点后于「会议纪要」生成正式纪要。',
      },
    ],
    tips: ['完整机器人接入即将开放，可关注产品更新通知。'],
  },
  {
    id: 'zoom',
    name: 'Zoom',
    color: '#2d8cff',
    status: 'supported',
    methods: ['bot', 'upload'],
    summary: '通过 Zoom App Marketplace 安装 MeetEase 应用。',
    steps: [
      {
        title: '安装 Zoom 应用',
        detail: 'Zoom App Marketplace 搜索 MeetEase → Install → 授权账户与会议权限。',
      },
      {
        title: '会中打开应用',
        detail: 'Zoom 会议工具栏 → Apps → MeetEase，启动实时笔记与待办捕获。',
      },
      {
        title: '云录制 Webhook',
        detail: '配置 recording.completed 事件，MeetEase 将自动处理录制并生成纪要（需 Pro 及以上）。',
      },
    ],
    tips: ['中国大陆节点请确认 Zoom 合规使用政策。'],
  },
];
