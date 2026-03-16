const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// 加载环境变量
dotenv.config();

// 导入数据库（会触发初始化）
require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/agents', require('./routes/agents'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/knowledge', require('./routes/knowledge'));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API 信息
app.get('/', (req, res) => {
  res.json({
    name: 'Agent Skill Platform API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      agents: '/api/agents',
      skills: '/api/skills',
      chat: '/api/chat',
      knowledge: '/api/knowledge'
    }
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: '接口不存在' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ 
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Agent Skill Platform API 已启动');
  console.log('='.repeat(50));
  console.log(`📍 服务器地址: http://localhost:${PORT}`);
  console.log(`🔧 环境: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
  console.log('可用接口:');
  console.log(`  POST   http://localhost:${PORT}/api/auth/register    - 注册`);
  console.log(`  POST   http://localhost:${PORT}/api/auth/login       - 登录`);
  console.log(`  GET    http://localhost:${PORT}/api/agents           - 获取Agents`);
  console.log(`  GET    http://localhost:${PORT}/api/skills           - 获取Skills`);
  console.log(`  GET    http://localhost:${PORT}/api/chat/sessions    - 获取会话`);
  console.log(`  GET    http://localhost:${PORT}/api/knowledge/folders - 获取知识库`);
  console.log('='.repeat(50));
});
