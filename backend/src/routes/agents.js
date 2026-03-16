const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { dbAsync } = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();

// 获取所有 Agents
router.get('/', authMiddleware, async (req, res) => {
  try {
    const agents = await dbAsync.all(
      `SELECT a.*, u.username as creator_name 
       FROM agents a 
       LEFT JOIN users u ON a.creator_id = u.id 
       WHERE a.creator_id = ? OR a.usage_scope LIKE ?`,
      [req.user.id, `%${req.user.username}%`]
    );
    
    // 格式化响应
    const formattedAgents = agents.map(agent => ({
      id: agent.id,
      name: agent.name,
      description: agent.description,
      avatar: agent.avatar,
      status: agent.status,
      creator: agent.creator_name,
      usageScope: agent.usage_scope ? agent.usage_scope.split(',') : [],
      createdAt: agent.created_at,
      updatedAt: agent.updated_at
    }));
    
    res.json(formattedAgents);
  } catch (err) {
    console.error('获取 Agents 错误:', err);
    res.status(500).json({ error: '获取失败' });
  }
});

// 获取单个 Agent
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const agent = await dbAsync.get(
      `SELECT a.*, u.username as creator_name 
       FROM agents a 
       LEFT JOIN users u ON a.creator_id = u.id 
       WHERE a.id = ?`,
      [req.params.id]
    );
    
    if (!agent) {
      return res.status(404).json({ error: 'Agent 不存在' });
    }
    
    res.json({
      id: agent.id,
      name: agent.name,
      description: agent.description,
      avatar: agent.avatar,
      status: agent.status,
      creator: agent.creator_name,
      usageScope: agent.usage_scope ? agent.usage_scope.split(',') : [],
      createdAt: agent.created_at,
      updatedAt: agent.updated_at
    });
  } catch (err) {
    console.error('获取 Agent 错误:', err);
    res.status(500).json({ error: '获取失败' });
  }
});

// 创建 Agent
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, avatar, usageScope } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: '名称不能为空' });
    }
    
    const id = uuidv4();
    const usageScopeStr = usageScope ? usageScope.join(',') : '';
    
    await dbAsync.run(
      `INSERT INTO agents (id, name, description, avatar, creator_id, usage_scope) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, description, avatar, req.user.id, usageScopeStr]
    );
    
    const agent = await dbAsync.get(
      `SELECT a.*, u.username as creator_name 
       FROM agents a 
       LEFT JOIN users u ON a.creator_id = u.id 
       WHERE a.id = ?`,
      [id]
    );
    
    res.status(201).json({
      id: agent.id,
      name: agent.name,
      description: agent.description,
      avatar: agent.avatar,
      status: agent.status,
      creator: agent.creator_name,
      usageScope: agent.usage_scope ? agent.usage_scope.split(',') : [],
      createdAt: agent.created_at,
      updatedAt: agent.updated_at
    });
  } catch (err) {
    console.error('创建 Agent 错误:', err);
    res.status(500).json({ error: '创建失败' });
  }
});

// 更新 Agent
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, description, avatar, status, usageScope } = req.body;
    
    // 检查权限
    const existingAgent = await dbAsync.get(
      'SELECT * FROM agents WHERE id = ?',
      [req.params.id]
    );
    
    if (!existingAgent) {
      return res.status(404).json({ error: 'Agent 不存在' });
    }
    
    if (existingAgent.creator_id !== req.user.id) {
      return res.status(403).json({ error: '无权限修改' });
    }
    
    const usageScopeStr = usageScope ? usageScope.join(',') : existingAgent.usage_scope;
    
    await dbAsync.run(
      `UPDATE agents 
       SET name = ?, description = ?, avatar = ?, status = ?, usage_scope = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [name || existingAgent.name, 
       description !== undefined ? description : existingAgent.description,
       avatar !== undefined ? avatar : existingAgent.avatar,
       status || existingAgent.status,
       usageScopeStr,
       req.params.id]
    );
    
    const agent = await dbAsync.get(
      `SELECT a.*, u.username as creator_name 
       FROM agents a 
       LEFT JOIN users u ON a.creator_id = u.id 
       WHERE a.id = ?`,
      [req.params.id]
    );
    
    res.json({
      id: agent.id,
      name: agent.name,
      description: agent.description,
      avatar: agent.avatar,
      status: agent.status,
      creator: agent.creator_name,
      usageScope: agent.usage_scope ? agent.usage_scope.split(',') : [],
      createdAt: agent.created_at,
      updatedAt: agent.updated_at
    });
  } catch (err) {
    console.error('更新 Agent 错误:', err);
    res.status(500).json({ error: '更新失败' });
  }
});

// 删除 Agent
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // 检查权限
    const existingAgent = await dbAsync.get(
      'SELECT * FROM agents WHERE id = ?',
      [req.params.id]
    );
    
    if (!existingAgent) {
      return res.status(404).json({ error: 'Agent 不存在' });
    }
    
    if (existingAgent.creator_id !== req.user.id) {
      return res.status(403).json({ error: '无权限删除' });
    }
    
    await dbAsync.run('DELETE FROM agents WHERE id = ?', [req.params.id]);
    
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error('删除 Agent 错误:', err);
    res.status(500).json({ error: '删除失败' });
  }
});

module.exports = router;
