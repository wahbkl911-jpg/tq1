export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  creator: string;
  usageScope: string[];
}

export interface ChatMessage {
  id: string;
  agentId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  agentId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon?: string;
  tags: string[];
  status: 'draft' | 'published';
  creator: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  files: SkillFile[];
  readme?: string;
  isOfficial?: boolean;
}

export interface SkillFile {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  children?: SkillFile[];
}

export interface DebugSession {
  id: string;
  skillId: string;
  messages: ChatMessage[];
  logs: DebugLog[];
  status: 'running' | 'completed' | 'error';
  createdAt: string;
}

export interface DebugLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

export interface KnowledgeFile {
  id: string;
  name: string;
  type: 'docx' | 'pdf' | 'txt' | 'md';
  size: string;
  status: 'learning' | 'completed' | 'error';
  version: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  canDownload: boolean;
  assistant?: string;
}

export interface KnowledgeFolder {
  id: string;
  name: string;
  type: 'personal' | 'department' | 'public';
  files: KnowledgeFile[];
  createdAt: string;
}
