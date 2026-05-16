# MeetEase 智能视频会议助手

轻量级 AI 视频会议助手前端演示项目，聚焦会前准备、会中记录、会后纪要与任务跟踪。适用于**产品测评与方案展示**。

**品牌：** 美团

---

## ✨ 功能特性

### 🎯 核心功能
| 模块 | 路由 | 说明 |
|------|------|------|
| **登录** | `/login` | 美团账号登录及主流账户（微信、钉钉、飞书、手机号） |
| **工作台** | `/` | 数据概览、接入引导、快捷入口 |
| **会前准备** | `/pre-meeting` | 设备预检、会议同步、会议创建 + AI 生成议程 |
| **接入会议** | `/integration` | 腾讯会议 / 钉钉 / 飞书等平台接入引导 |
| **AI 会议分析** | `/analysis` | 转写文本 + AI 提取重点（模拟） |
| **会议纪要** | `/minutes` | 三风格纪要、复制、会后邮件 |
| **待办事项** | `/tasks` | 任务表格、状态筛选、我的待办 |
| **助手设置** | `/settings` | 主题切换、AI 功能配置、会议提醒设置 |

### 🛠️ 智能功能
- ✅ 设备预检（麦克风、摄像头、网络检测）
- ✅ 会议同步（从腾讯会议/钉钉/飞书同步预约会议）
- ✅ 日程同步到日历
- ✅ 智能入会提醒
- ✅ AI 智能降噪
- ✅ 智能人声增强
- ✅ 实时翻译
- ✅ 深色/浅色主题切换

---

## 🚀 快速开始

### 本地运行
```bash
# 进入项目目录
cd e:\project\meetease

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 http://localhost:5173

### 构建生产版本
```bash
npm run build
npm run preview
```

---

## 🛠️ 技术栈

- **框架**: React 18 + Vite 5
- **路由**: React Router 6
- **状态管理**: React Context API
- **样式**: CSS Custom Properties（主题变量）
- **字体**: Plus Jakarta Sans
- **数据存储**: localStorage（本地模拟）

---

## 📁 项目结构

```
meetease/
├── docs/                 # 产品文档
│   ├── PRD.md           # 产品需求文档
│   ├── CHANGELOG.md      # 变更日志
│   └── README.md         # 文档说明
├── public/               # 静态资源
├── src/
│   ├── pages/            # 页面组件
│   ├── components/       # 通用组件
│   ├── context/          # Context 状态管理
│   ├── data/             # 模拟数据
│   ├── utils/            # 工具函数
│   └── styles/           # 全局样式
├── package.json
└── vite.config.js       # Vite 配置
```

---

## 📝 产品文档

| 文档 | 路径 |
|------|------|
| **产品需求文档** | [docs/PRD.md](./docs/PRD.md) |
| **产品变更日志** | [docs/CHANGELOG.md](./docs/CHANGELOG.md) |
| **文档维护说明** | [docs/README.md](./docs/README.md) |

---

## 📄 许可

MIT License

---

**提示**: 本项目为演示版本，所有数据均为本地模拟，无真实后端服务。