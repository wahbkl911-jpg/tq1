const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { dbAsync } = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();

// 获取所有 Skills
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { search, tag, status } = req.query;
    
    let sql = `
      SELECT s.*, u.username as creator_name 
      FROM skills s 
      LEFT JOIN users u ON s.creator_id = u.id 
      WHERE 1=1
    `;
    const params = [];
    
    if (search) {
      sql += ` AND (s.name LIKE ? OR s.display_name LIKE ? OR s.description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    if (tag) {
      sql += ` AND s.tags LIKE ?`;
      params.push(`%${tag}%`);
    }
    
    if (status) {
      sql += ` AND s.status = ?`;
      params.push(status);
    }
    
    sql += ` ORDER BY s.created_at DESC`;
    
    const skills = await dbAsync.all(sql, params);
    
    // 格式化响应
    const formattedSkills = skills.map(skill => ({
      id: skill.id,
      name: skill.name,
      displayName: skill.display_name,
      description: skill.description,
      icon: skill.icon,
      tags: skill.tags ? skill.tags.split(',') : [],
      status: skill.status,
      creator: skill.creator_name,
      version: skill.version,
      readme: skill.readme,
      isOfficial: skill.is_official === 1,
      createdAt: skill.created_at,
      updatedAt: skill.updated_at
    }));
    
    res.json(formattedSkills);
  } catch (err) {
    console.error('获取 Skills 错误:', err);
    res.status(500).json({ error: '获取失败' });
  }
});

// 获取单个 Skill
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const skill = await dbAsync.get(
      `SELECT s.*, u.username as creator_name 
       FROM skills s 
       LEFT JOIN users u ON s.creator_id = u.id 
       WHERE s.id = ?`,
      [req.params.id]
    );
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill 不存在' });
    }
    
    // 获取技能文件
    const files = await dbAsync.all(
      'SELECT * FROM skill_files WHERE skill_id = ? ORDER BY path',
      [req.params.id]
    );
    
    // 构建文件树
    const fileTree = buildFileTree(files);
    
    res.json({
      id: skill.id,
      name: skill.name,
      displayName: skill.display_name,
      description: skill.description,
      icon: skill.icon,
      tags: skill.tags ? skill.tags.split(',') : [],
      status: skill.status,
      creator: skill.creator_name,
      version: skill.version,
      readme: skill.readme,
      isOfficial: skill.is_official === 1,
      files: fileTree,
      createdAt: skill.created_at,
      updatedAt: skill.updated_at
    });
  } catch (err) {
    console.error('获取 Skill 错误:', err);
    res.status(500).json({ error: '获取失败' });
  }
});

// 创建 Skill
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, displayName, description, icon, tags, readme } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: '名称不能为空' });
    }
    
    const id = uuidv4();
    const tagsStr = tags ? tags.join(',') : '';
    
    await dbAsync.run(
      `INSERT INTO skills (id, name, display_name, description, icon, tags, creator_id, readme) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, displayName, description, icon, tagsStr, req.user.id, readme]
    );
    
    const skill = await dbAsync.get(
      `SELECT s.*, u.username as creator_name 
       FROM skills s 
       LEFT JOIN users u ON s.creator_id = u.id 
       WHERE s.id = ?`,
      [id]
    );
    
    res.status(201).json({
      id: skill.id,
      name: skill.name,
      displayName: skill.display_name,
      description: skill.description,
      icon: skill.icon,
      tags: skill.tags ? skill.tags.split(',') : [],
      status: skill.status,
      creator: skill.creator_name,
      version: skill.version,
      readme: skill.readme,
      isOfficial: skill.is_official === 1,
      files: [],
      createdAt: skill.created_at,
      updatedAt: skill.updated_at
    });
  } catch (err) {
    console.error('创建 Skill 错误:', err);
    res.status(500).json({ error: '创建失败' });
  }
});

// 更新 Skill
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, displayName, description, icon, tags, status, readme } = req.body;
    
    // 检查权限
    const existingSkill = await dbAsync.get(
      'SELECT * FROM skills WHERE id = ?',
      [req.params.id]
    );
    
    if (!existingSkill) {
      return res.status(404).json({ error: 'Skill 不存在' });
    }
    
    if (existingSkill.creator_id !== req.user.id) {
      return res.status(403).json({ error: '无权限修改' });
    }
    
    const tagsStr = tags ? tags.join(',') : existingSkill.tags;
    
    await dbAsync.run(
      `UPDATE skills 
       SET name = ?, display_name = ?, description = ?, icon = ?, tags = ?, status = ?, readme = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [name || existingSkill.name, 
       displayName !== undefined ? displayName : existingSkill.display_name,
       description !== undefined ? description : existingSkill.description,
       icon !== undefined ? icon : existingSkill.icon,
       tagsStr,
       status || existingSkill.status,
       readme !== undefined ? readme : existingSkill.readme,
       req.params.id]
    );
    
    const skill = await dbAsync.get(
      `SELECT s.*, u.username as creator_name 
       FROM skills s 
       LEFT JOIN users u ON s.creator_id = u.id 
       WHERE s.id = ?`,
      [req.params.id]
    );
    
    // 获取技能文件
    const files = await dbAsync.all(
      'SELECT * FROM skill_files WHERE skill_id = ? ORDER BY path',
      [req.params.id]
    );
    
    const fileTree = buildFileTree(files);
    
    res.json({
      id: skill.id,
      name: skill.name,
      displayName: skill.display_name,
      description: skill.description,
      icon: skill.icon,
      tags: skill.tags ? skill.tags.split(',') : [],
      status: skill.status,
      creator: skill.creator_name,
      version: skill.version,
      readme: skill.readme,
      isOfficial: skill.is_official === 1,
      files: fileTree,
      createdAt: skill.created_at,
      updatedAt: skill.updated_at
    });
  } catch (err) {
    console.error('更新 Skill 错误:', err);
    res.status(500).json({ error: '更新失败' });
  }
});

// 删除 Skill
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // 检查权限
    const existingSkill = await dbAsync.get(
      'SELECT * FROM skills WHERE id = ?',
      [req.params.id]
    );
    
    if (!existingSkill) {
      return res.status(404).json({ error: 'Skill 不存在' });
    }
    
    if (existingSkill.creator_id !== req.user.id) {
      return res.status(403).json({ error: '无权限删除' });
    }
    
    await dbAsync.run('DELETE FROM skills WHERE id = ?', [req.params.id]);
    
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error('删除 Skill 错误:', err);
    res.status(500).json({ error: '删除失败' });
  }
});

// 添加/更新技能文件
router.post('/:id/files', authMiddleware, async (req, res) => {
  try {
    const { name, type, path: filePath, content, parentId } = req.body;
    
    // 检查权限
    const existingSkill = await dbAsync.get(
      'SELECT * FROM skills WHERE id = ?',
      [req.params.id]
    );
    
    if (!existingSkill) {
      return res.status(404).json({ error: 'Skill 不存在' });
    }
    
    if (existingSkill.creator_id !== req.user.id) {
      return res.status(403).json({ error: '无权限修改' });
    }
    
    const id = uuidv4();
    
    await dbAsync.run(
      `INSERT INTO skill_files (id, skill_id, name, type, path, content, parent_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, req.params.id, name, type, filePath, content, parentId]
    );
    
    res.status(201).json({ id, message: '文件添加成功' });
  } catch (err) {
    console.error('添加技能文件错误:', err);
    res.status(500).json({ error: '添加失败' });
  }
});

// 构建文件树
function buildFileTree(files) {
  const root = [];
  const map = {};
  
  // 首先创建所有节点的映射
  files.forEach(file => {
    map[file.id] = {
      id: file.id,
      name: file.name,
      type: file.type,
      path: file.path,
      content: file.content,
      children: []
    };
  });
  
  // 构建树形结构
  files.forEach(file => {
    if (file.parent_id && map[file.parent_id]) {
      map[file.parent_id].children.push(map[file.id]);
    } else {
      root.push(map[file.id]);
    }
  });
  
  return root;
}

module.exports = router;
