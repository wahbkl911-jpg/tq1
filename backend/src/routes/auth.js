const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { dbAsync } = require('../db');
const { generateToken, hashPassword, comparePassword } = require('../auth');

const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码不能为空' });
    }
    
    // 检查用户是否已存在
    const existingUser = await dbAsync.get(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (existingUser) {
      return res.status(409).json({ error: '用户名已存在' });
    }
    
    // 创建新用户
    const id = uuidv4();
    const hashedPassword = await hashPassword(password);
    
    await dbAsync.run(
      'INSERT INTO users (id, username, password) VALUES (?, ?, ?)',
      [id, username, hashedPassword]
    );
    
    const user = await dbAsync.get('SELECT * FROM users WHERE id = ?', [id]);
    const token = generateToken(user);
    
    res.json({
      message: '注册成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('注册错误:', err);
    res.status(500).json({ error: '注册失败' });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码不能为空' });
    }
    
    // 查找用户
    const user = await dbAsync.get(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    if (!user) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }
    
    // 验证密码
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }
    
    const token = generateToken(user);
    
    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('登录错误:', err);
    res.status(500).json({ error: '登录失败' });
  }
});

module.exports = router;
