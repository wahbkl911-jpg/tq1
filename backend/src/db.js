const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// 初始化数据库表
db.serialize(() => {
  // 用户表
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 智能体表
  db.run(`
    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      avatar TEXT,
      status TEXT DEFAULT 'active',
      creator_id TEXT NOT NULL,
      usage_scope TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creator_id) REFERENCES users(id)
    )
  `);

  // 技能表
  db.run(`
    CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      display_name TEXT,
      description TEXT,
      icon TEXT,
      tags TEXT,
      status TEXT DEFAULT 'draft',
      creator_id TEXT NOT NULL,
      version TEXT DEFAULT 'V1',
      readme TEXT,
      is_official INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (creator_id) REFERENCES users(id)
    )
  `);

  // 技能文件表
  db.run(`
    CREATE TABLE IF NOT EXISTS skill_files (
      id TEXT PRIMARY KEY,
      skill_id TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT DEFAULT 'file',
      path TEXT NOT NULL,
      content TEXT,
      parent_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
      FOREIGN KEY (parent_id) REFERENCES skill_files(id) ON DELETE CASCADE
    )
  `);

  // 聊天会话表
  db.run(`
    CREATE TABLE IF NOT EXISTS chat_sessions (
      id TEXT PRIMARY KEY,
      agent_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      title TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (agent_id) REFERENCES agents(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 聊天消息表
  db.run(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      agent_id TEXT,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE
    )
  `);

  // 调试会话表
  db.run(`
    CREATE TABLE IF NOT EXISTS debug_sessions (
      id TEXT PRIMARY KEY,
      skill_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      status TEXT DEFAULT 'running',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (skill_id) REFERENCES skills(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 调试日志表
  db.run(`
    CREATE TABLE IF NOT EXISTS debug_logs (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      level TEXT DEFAULT 'info',
      message TEXT NOT NULL,
      FOREIGN KEY (session_id) REFERENCES debug_sessions(id) ON DELETE CASCADE
    )
  `);

  // 知识库文件夹表
  db.run(`
    CREATE TABLE IF NOT EXISTS knowledge_folders (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT DEFAULT 'personal',
      user_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 知识库文件表
  db.run(`
    CREATE TABLE IF NOT EXISTS knowledge_files (
      id TEXT PRIMARY KEY,
      folder_id TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT,
      size TEXT,
      status TEXT DEFAULT 'learning',
      version TEXT DEFAULT 'V1',
      file_path TEXT,
      can_download INTEGER DEFAULT 1,
      assistant TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (folder_id) REFERENCES knowledge_folders(id) ON DELETE CASCADE
    )
  `);

  console.log('Database initialized successfully');
});

// 辅助函数：将查询转换为 Promise
const dbAsync = {
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },

  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = { db, dbAsync };
