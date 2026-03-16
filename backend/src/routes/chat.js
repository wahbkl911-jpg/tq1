const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { dbAsync } = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();

// 获取会话列表
router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await dbAsync.all(
      `SELECT cs.*, a.name as agent_name 
       FROM chat_sessions cs 
       LEFT JOIN agents a ON cs.agent_id = a.id 
       WHERE cs.user_id = ? 
       ORDER BY cs.updated_at DESC`,
      [req.user.id]
    );
    
    const formattedSessions = sessions.map(session => ({
      id: session.id,
      agentId: session.agent_id,
      title: session.title,
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
router.get('/sessions/:id/messages', authMiddleware, async (req, res) => {
  try {
    // 验证会话所有权
    const session = await dbAsync.get(
      'SELECT * FROM chat_sessions WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
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
router.post('/sessions', authMiddleware, async (req, res) => {
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
      [id, agentId, req.user.id, sessionTitle]
    );
    
    res.status(201).json({
      id,
      agentId,
      title: sessionTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('创建会话错误:', err);
    res.status(500).json({ error: '创建失败' });
  }
});

// 发送消息（SSE 流式响应）
router.post('/messages', authMiddleware, async (req, res) => {
  try {
    const { sessionId, content, agentId } = req.body;
    
    if (!sessionId || !content) {
      return res.status(400).json({ error: '会话ID和消息内容不能为空' });
    }
    
    // 验证会话所有权
    const session = await dbAsync.get(
      'SELECT * FROM chat_sessions WHERE id = ? AND user_id = ?',
      [sessionId, req.user.id]
    );
    
    if (!session) {
      return res.status(404).json({ error: '会话不存在' });
    }
    
    // 保存用户消息
    const userMessageId = uuidv4();
    await dbAsync.run(
      `INSERT INTO chat_messages (id, session_id, agent_id, role, content) 
       VALUES (?, ?, ?, ?, ?)`,
      [userMessageId, sessionId, agentId, 'user', content]
    );
    
    // 设置 SSE 头
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    
    // 模拟 AI 流式响应
    const assistantMessageId = uuidv4();
    let fullResponse = '';
    
    // 模拟响应内容
    const mockResponses = [
      '您好！我是您的智能助手。',
      '我理解您的问题是关于：' + content.substring(0, 20) + '...',
      '\n\n让我为您详细分析一下：',
      '\n\n1. 首先，这个问题涉及到多个方面',
      '\n2. 其次，我们需要考虑实际情况',
      '\n3. 最后，建议采取以下措施',
      '\n\n希望以上信息对您有帮助！如有其他问题，请随时问我。'
    ];
    
    // 发送消息开始事件
    res.write(`event: message_start\n`);
    res.write(`data: ${JSON.stringify({ id: assistantMessageId, role: 'assistant' })}\n\n`);
    
    // 流式发送内容
    for (let i = 0; i < mockResponses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
      
      fullResponse += mockResponses[i];
      
      res.write(`event: content_delta\n`);
      res.write(`data: ${JSON.stringify({ 
        delta: mockResponses[i],
        content: fullResponse 
      })}\n\n`);
    }
    
    // 保存 AI 消息到数据库
    await dbAsync.run(
      `INSERT INTO chat_messages (id, session_id, agent_id, role, content) 
       VALUES (?, ?, ?, ?, ?)`,
      [assistantMessageId, sessionId, agentId, 'assistant', fullResponse]
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
      res.status(500).json({ error: '发送失败' });
    } else {
      res.write(`event: error\n`);
      res.write(`data: ${JSON.stringify({ error: '发送失败' })}\n\n`);
      res.end();
    }
  }
});

// 删除会话
router.delete('/sessions/:id', authMiddleware, async (req, res) => {
  try {
    // 验证会话所有权
    const session = await dbAsync.get(
      'SELECT * FROM chat_sessions WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
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
