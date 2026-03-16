# Agent Skill Platform Backend

智能体技能平台后端 API 服务

## 功能特性

- ✅ 用户认证（JWT）
- ✅ Agent 管理（CRUD）
- ✅ Skill 管理（CRUD）
- ✅ 聊天功能（SSE 流式响应）
- ✅ 知识库管理
- ✅ SQLite 数据库（零配置）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，设置 JWT_SECRET
```

### 3. 启动服务

```bash
# 开发模式（热重载）
npm run dev

# 生产模式
npm start
```

服务将运行在 http://localhost:3001

## API 接口

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录

### Agent 管理
- `GET /api/agents` - 获取所有 Agents
- `GET /api/agents/:id` - 获取单个 Agent
- `POST /api/agents` - 创建 Agent
- `PUT /api/agents/:id` - 更新 Agent
- `DELETE /api/agents/:id` - 删除 Agent

### Skill 管理
- `GET /api/skills` - 获取所有 Skills
- `GET /api/skills/:id` - 获取单个 Skill
- `POST /api/skills` - 创建 Skill
- `PUT /api/skills/:id` - 更新 Skill
- `DELETE /api/skills/:id` - 删除 Skill
- `POST /api/skills/:id/files` - 添加技能文件

### 聊天
- `GET /api/chat/sessions` - 获取会话列表
- `GET /api/chat/sessions/:id/messages` - 获取会话消息
- `POST /api/chat/sessions` - 创建会话
- `POST /api/chat/messages` - 发送消息（SSE 流式）
- `DELETE /api/chat/sessions/:id` - 删除会话

### 知识库
- `GET /api/knowledge/folders` - 获取文件夹
- `POST /api/knowledge/folders` - 创建文件夹
- `PUT /api/knowledge/folders/:id` - 更新文件夹
- `DELETE /api/knowledge/folders/:id` - 删除文件夹
- `POST /api/knowledge/files` - 添加文件
- `PUT /api/knowledge/files/:id` - 更新文件
- `DELETE /api/knowledge/files/:id` - 删除文件

## 部署

### Render（推荐）

1. Fork 本项目到 GitHub
2. 在 Render 创建新 Web Service
3. 连接 GitHub 仓库
4. 使用 `render.yaml` 自动配置

### Railway

```bash
railway login
railway init
railway up
```

### Fly.io

```bash
fly launch
fly deploy
```

## 技术栈

- Node.js 18+
- Express.js
- SQLite3
- JWT
- bcryptjs

## 数据库

使用 SQLite 单文件数据库，无需额外配置。数据库文件位于 `src/data/database.sqlite`。

## 许可证

MIT
