const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { dbAsync } = require('../db');
const { authMiddleware } = require('../auth');
const aiService = require('../services/aiService');

const router = express.Router();

// 临时：模拟用户ID（用于测试）
const MOCK_USER_ID = 'test-user-001';

// 获取会话列表
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await dbAsync.all(
      `SELECT cs.*, a.name as agent_name, a.description as agent_description, a.avatar as agent_avatar
       FROM chat_sessions cs 
       LEFT JOIN agents a ON cs.agent_id = a.id 
       WHERE cs.user_id = ? 
       ORDER BY cs.updated_at DESC`,
      [MOCK_USER_ID]
    );
    
    const formattedSessions = sessions.map(session => ({
      id: session.id,
      agentId: session.agent_id,
      title: session.title,
      agentName: session.agent_name,
      agentDescription: session.agent_description,
      agentAvatar: session.agent_avatar,
      createdAt: session.created_at,
      updatedAt: session.updated_at
    }));
    
    res.json(formattedSessions);
  } catch (err) {
    console.error('获取会话列表错误:', err);
    res.status(500).json({ error: '获取失败' });
  }
});

// 获取会话消息
router.get('/sessions/:id/messages', async (req, res) => {
  try {
    // 验证会话所有权
    const session = await dbAsync.get(
      'SELECT * FROM chat_sessions WHERE id = ? AND user_id = ?',
      [req.params.id, MOCK_USER_ID]
    );
    
    if (!session) {
      return res.status(404).json({ error: '会话不存在' });
    }
    
    const messages = await dbAsync.all(
      `SELECT * FROM chat_messages 
       WHERE session_id = ? 
       ORDER BY timestamp ASC`,
      [req.params.id]
    );
    
    const formattedMessages = messages.map(msg => ({
      id: msg.id,
      agentId: msg.agent_id,
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp
    }));
    
    res.json(formattedMessages);
  } catch (err) {
    console.error('获取消息错误:', err);
    res.status(500).json({ error: '获取失败' });
  }
});

// 创建会话
router.post('/sessions', async (req, res) => {
  try {
    const { agentId, title } = req.body;
    
    if (!agentId) {
      return res.status(400).json({ error: 'Agent ID 不能为空' });
    }
    
    // 验证 Agent 存在
    const agent = await dbAsync.get('SELECT * FROM agents WHERE id = ?', [agentId]);
    if (!agent) {
      return res.status(404).json({ error: 'Agent 不存在' });
    }
    
    const id = uuidv4();
    const sessionTitle = title || `与 ${agent.name} 的对话`;
    
    await dbAsync.run(
      `INSERT INTO chat_sessions (id, agent_id, user_id, title) 
       VALUES (?, ?, ?, ?)`,
      [id, agentId, MOCK_USER_ID, sessionTitle]
    );
    
    res.status(201).json({
      id,
      agentId,
      title: sessionTitle,
      agentName: agent.name,
      agentDescription: agent.description,
      agentAvatar: agent.avatar,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('创建会话错误:', err);
    res.status(500).json({ error: '创建失败' });
  }
});

// 发送消息（SSE 流式响应）- 接入真实 AI
router.post('/messages', async (req, res) => {
  try {
    const { sessionId, content, agentId } = req.body;
    
    if (!sessionId || !content) {
      return res.status(400).json({ error: '会话ID和消息内容不能为空' });
    }
    
    // 验证会话所有权
    const session = await dbAsync.get(
      'SELECT * FROM chat_sessions WHERE id = ? AND user_id = ?',
      [sessionId, MOCK_USER_ID]
    );
    
    if (!session) {
      return res.status(404).json({ error: '会话不存在' });
    }
    
    // 获取 Agent 信息
    const agent = await dbAsync.get('SELECT * FROM agents WHERE id = ?', [agentId || session.agent_id]);
    if (!agent) {
      return res.status(404).json({ error: 'Agent 不存在' });
    }
    
    // 保存用户消息
    const userMessageId = uuidv4();
    await dbAsync.run(
      `INSERT INTO chat_messages (id, session_id, agent_id, role, content) 
       VALUES (?, ?, ?, ?, ?)`,
      [userMessageId, sessionId, agent.id, 'user', content]
    );
    
    // 获取历史消息（用于上下文）
    const historyMessages = await dbAsync.all(
      `SELECT role, content FROM chat_messages 
       WHERE session_id = ? 
       ORDER BY timestamp ASC 
       LIMIT 20`,
      [sessionId]
    );
    
    // 格式化消息为 AI 服务需要的格式
    const messages = historyMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    // 设置 SSE 头
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    
    // 生成 AI 消息 ID
    const assistantMessageId = uuidv4();
    let fullResponse = '';
    
    // 发送消息开始事件
    res.write(`event: message_start\n`);
    res.write(`data: ${JSON.stringify({ id: assistantMessageId, role: 'assistant' })}\n\n`);
    
    // 调用 AI 服务进行流式生成
    try {
      // 获取 Agent 的技能信息
      const agentSkills = await dbAsync.all(
        `SELECT s.name, s.description FROM skills s
         JOIN agent_skills asl ON s.id = asl.skill_id
         WHERE asl.agent_id = ?`,
        [agent.id]
      );
      
      const context = {
        skills: agentSkills,
        knowledgeFiles: [] // 可以扩展知识库功能
      };
      
      // 流式调用 AI
      for await (const chunk of aiService.streamChat(messages, agent, context)) {
        if (chunk.type === 'content') {
          fullResponse += chunk.content;
          
          res.write(`event: content_delta\n`);
          res.write(`data: ${JSON.stringify({ 
            delta: chunk.content,
            content: fullResponse 
          })}\n\n`);
        } else if (chunk.type === 'error') {
          throw new Error(chunk.error);
        }
      }
      
    } catch (aiError) {
      console.error('[Chat] AI 服务错误:', aiError);
      
      // 如果 AI 服务失败，使用备用回复
      const fallbackResponse = `抱歉，我暂时无法连接到智能服务。错误信息：${aiError.message}\n\n请检查：\n1. AI 服务配置是否正确\n2. API Key 是否有效\n3. 网络连接是否正常`;
      
      fullResponse = fallbackResponse;
      
      res.write(`event: content_delta\n`);
      res.write(`data: ${JSON.stringify({ 
        delta: fallbackResponse,
        content: fullResponse 
      })}\n\n`);
    }
    
    // 保存 AI 消息到数据库
    await dbAsync.run(
      `INSERT INTO chat_messages (id, session_id, agent_id, role, content) 
       VALUES (?, ?, ?, ?, ?)`,
      [assistantMessageId, sessionId, agent.id, 'assistant', fullResponse]
    );
    
    // 更新会话时间
    await dbAsync.run(
      'UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [sessionId]
    );
    
    // 发送消息结束事件
    res.write(`event: message_end\n`);
    res.write(`data: ${JSON.stringify({ 
      id: assistantMessageId,
      content: fullResponse,
      timestamp: new Date().toISOString()
    })}\n\n`);
    
    res.end();
    
  } catch (err) {
    console.error('发送消息错误:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: '发送失败', message: err.message });
    } else {
      res.write(`event: error\n`);
      res.write(`data: ${JSON.stringify({ error: '发送失败', message: err.message })}\n\n`);
      res.end();
    }
  }
});

// 删除会话
router.delete('/sessions/:id', async (req, res) => {
  try {
    // 验证会话所有权
    const session = await dbAsync.get(
      'SELECT * FROM chat_sessions WHERE id = ? AND user_id = ?',
      [req.params.id, MOCK_USER_ID]
    );
    
    if (!session) {
      return res.status(404).json({ error: '会话不存在' });
    }
    
    await dbAsync.run('DELETE FROM chat_sessions WHERE id = ?', [req.params.id]);
    
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error('删除会话错误:', err);
    res.status(500).json({ error: '删除失败' });
  }
});

module.exports = router;
