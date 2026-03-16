const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { dbAsync } = require('../db');
const { authMiddleware } = require('../auth');

const router = express.Router();

// 获取所有文件夹
router.get('/folders', authMiddleware, async (req, res) => {
  try {
    const folders = await dbAsync.all(
      `SELECT kf.*, COUNT(kfile.id) as file_count
       FROM knowledge_folders kf
       LEFT JOIN knowledge_files kfile ON kf.id = kfile.folder_id
       WHERE kf.user_id = ?
       GROUP BY kf.id
       ORDER BY kf.created_at DESC`,
      [req.user.id]
    );
    
    // 获取每个文件夹的文件
    const formattedFolders = await Promise.all(
      folders.map(async (folder) => {
        const files = await dbAsync.all(
          `SELECT * FROM knowledge_files WHERE folder_id = ? ORDER BY created_at DESC`,
          [folder.id]
        );
        
        return {
          id: folder.id,
          name: folder.name,
          type: folder.type,
          createdAt: folder.created_at,
          files: files.map(file => ({
            id: file.id,
            name: file.name,
            type: file.type,
            size: file.size,
            status: file.status,
            version: file.version,
            creator: req.user.username,
            createdAt: file.created_at,
            updatedAt: file.updated_at,
            canDownload: file.can_download === 1,
            assistant: file.assistant
          }))
        };
      })
    );
    
    res.json(formattedFolders);
  } catch (err) {
    console.error('获取文件夹错误:', err);
    res.status(500).json({ error: '获取失败' });
  }
});

// 创建文件夹
router.post('/folders', authMiddleware, async (req, res) => {
  try {
    const { name, type = 'personal' } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: '文件夹名称不能为空' });
    }
    
    const id = uuidv4();
    
    await dbAsync.run(
      `INSERT INTO knowledge_folders (id, name, type, user_id) 
       VALUES (?, ?, ?, ?)`,
      [id, name, type, req.user.id]
    );
    
    res.status(201).json({
      id,
      name,
      type,
      createdAt: new Date().toISOString(),
      files: []
    });
  } catch (err) {
    console.error('创建文件夹错误:', err);
    res.status(500).json({ error: '创建失败' });
  }
});

// 更新文件夹
router.put('/folders/:id', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    
    // 验证所有权
    const folder = await dbAsync.get(
      'SELECT * FROM knowledge_folders WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (!folder) {
      return res.status(404).json({ error: '文件夹不存在' });
    }
    
    await dbAsync.run(
      'UPDATE knowledge_folders SET name = ? WHERE id = ?',
      [name || folder.name, req.params.id]
    );
    
    res.json({ message: '更新成功' });
  } catch (err) {
    console.error('更新文件夹错误:', err);
    res.status(500).json({ error: '更新失败' });
  }
});

// 删除文件夹
router.delete('/folders/:id', authMiddleware, async (req, res) => {
  try {
    // 验证所有权
    const folder = await dbAsync.get(
      'SELECT * FROM knowledge_folders WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (!folder) {
      return res.status(404).json({ error: '文件夹不存在' });
    }
    
    await dbAsync.run('DELETE FROM knowledge_folders WHERE id = ?', [req.params.id]);
    
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error('删除文件夹错误:', err);
    res.status(500).json({ error: '删除失败' });
  }
});

// 添加文件到文件夹
router.post('/files', authMiddleware, async (req, res) => {
  try {
    const { folderId, name, type, size, filePath } = req.body;
    
    if (!folderId || !name) {
      return res.status(400).json({ error: '文件夹ID和文件名不能为空' });
    }
    
    // 验证文件夹所有权
    const folder = await dbAsync.get(
      'SELECT * FROM knowledge_folders WHERE id = ? AND user_id = ?',
      [folderId, req.user.id]
    );
    
    if (!folder) {
      return res.status(404).json({ error: '文件夹不存在' });
    }
    
    const id = uuidv4();
    
    await dbAsync.run(
      `INSERT INTO knowledge_files (id, folder_id, name, type, size, file_path, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, folderId, name, type, size, filePath, 'learning']
    );
    
    res.status(201).json({
      id,
      name,
      type,
      size,
      status: 'learning',
      version: 'V1',
      creator: req.user.username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      canDownload: true,
      assistant: '-'
    });
  } catch (err) {
    console.error('添加文件错误:', err);
    res.status(500).json({ error: '添加失败' });
  }
});

// 更新文件状态
router.put('/files/:id', authMiddleware, async (req, res) => {
  try {
    const { status, version, assistant } = req.body;
    
    // 验证文件所有权
    const file = await dbAsync.get(
      `SELECT kf.* FROM knowledge_files kf
       JOIN knowledge_folders kfolder ON kf.folder_id = kfolder.id
       WHERE kf.id = ? AND kfolder.user_id = ?`,
      [req.params.id, req.user.id]
    );
    
    if (!file) {
      return res.status(404).json({ error: '文件不存在' });
    }
    
    await dbAsync.run(
      `UPDATE knowledge_files 
       SET status = ?, version = ?, assistant = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [status || file.status, version || file.version, assistant !== undefined ? assistant : file.assistant, req.params.id]
    );
    
    res.json({ message: '更新成功' });
  } catch (err) {
    console.error('更新文件错误:', err);
    res.status(500).json({ error: '更新失败' });
  }
});

// 删除文件
router.delete('/files/:id', authMiddleware, async (req, res) => {
  try {
    // 验证文件所有权
    const file = await dbAsync.get(
      `SELECT kf.* FROM knowledge_files kf
       JOIN knowledge_folders kfolder ON kf.folder_id = kfolder.id
       WHERE kf.id = ? AND kfolder.user_id = ?`,
      [req.params.id, req.user.id]
    );
    
    if (!file) {
      return res.status(404).json({ error: '文件不存在' });
    }
    
    await dbAsync.run('DELETE FROM knowledge_files WHERE id = ?', [req.params.id]);
    
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error('删除文件错误:', err);
    res.status(500).json({ error: '删除失败' });
  }
});

module.exports = router;
