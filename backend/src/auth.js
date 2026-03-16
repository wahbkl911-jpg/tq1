const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// 生成 JWT Token
function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username 
    }, 
    JWT_SECRET, 
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// 验证 JWT Token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// 认证中间件
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未提供认证令牌' });
  }
  
  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: '无效的认证令牌' });
  }
  
  req.user = decoded;
  next();
}

// 密码哈希
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// 密码验证
async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  generateToken,
  verifyToken,
  authMiddleware,
  hashPassword,
  comparePassword,
  JWT_SECRET
};
