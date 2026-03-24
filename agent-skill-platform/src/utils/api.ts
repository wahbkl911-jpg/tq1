// API 基础配置
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// 获取 token
function getToken(): string | null {
  return localStorage.getItem('token');
}

// 通用请求函数
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };
  
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '请求失败' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// 认证 API
export const authApi = {
  register: (username: string, password: string) =>
    request<{ token: string; user: { id: string; username: string; avatar?: string } }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
    
  login: (username: string, password: string) =>
    request<{ token: string; user: { id: string; username: string; avatar?: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),
};

// Agent API
export const agentApi = {
  getAll: () =>
    request<Array<{
      id: string;
      name: string;
      description: string;
      avatar?: string;
      status: string;
      creator: string;
      usageScope: string[];
      createdAt: string;
      updatedAt: string;
    }>>('/agents'),
    
  getById: (id: string) =>
    request(`/agents/${id}`),
    
  create: (data: { name: string; description?: string; avatar?: string; usageScope?: string[] }) =>
    request('/agents', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  update: (id: string, data: Partial<{ name: string; description: string; avatar: string; status: string; usageScope: string[] }>) =>
    request(`/agents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  delete: (id: string) =>
    request(`/agents/${id}`, {
      method: 'DELETE',
    }),
};

// Skill API
export const skillApi = {
  getAll: (params?: { search?: string; tag?: string; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.status) queryParams.append('status', params.status);
    
    const query = queryParams.toString();
    return request(`/skills${query ? `?${query}` : ''}`);
  },
    
  getById: (id: string) =>
    request(`/skills/${id}`),
    
  create: (data: { name: string; displayName?: string; description?: string; icon?: string; tags?: string[]; readme?: string }) =>
    request('/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  update: (id: string, data: Partial<{ name: string; displayName: string; description: string; icon: string; tags: string[]; status: string; readme: string }>) =>
    request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  delete: (id: string) =>
    request(`/skills/${id}`, {
      method: 'DELETE',
    }),
    
  addFile: (skillId: string, data: { name: string; type: string; path: string; content?: string; parentId?: string }) =>
    request(`/skills/${skillId}/files`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// 聊天 API
export const chatApi = {
  getSessions: () =>
    request<Array<{
      id: string;
      agentId: string;
      title: string;
      createdAt: string;
      updatedAt: string;
    }>>('/chat/sessions'),
    
  getMessages: (sessionId: string) =>
    request<Array<{
      id: string;
      agentId?: string;
      role: 'user' | 'assistant';
      content: string;
      timestamp: string;
    }>>(`/chat/sessions/${sessionId}/messages`),
    
  createSession: (data: { agentId: string; title?: string }) =>
    request('/chat/sessions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  deleteSession: (sessionId: string) =>
    request(`/chat/sessions/${sessionId}`, {
      method: 'DELETE',
    }),
    
  // SSE 流式发送消息
  sendMessage: async (
    data: { sessionId: string; content: string; agentId?: string },
    onMessage: (event: { type: string; data: any }) => void
  ) => {
    const url = `${API_BASE_URL}/chat/messages`;
    const token = getToken();
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: '发送消息失败' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('无法读取响应');
    }
    
    const decoder = new TextDecoder();
    let buffer = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      
      // 解析 SSE 格式
      const lines = buffer.split('\n');
      buffer = '';
      
      let currentEvent: { type: string; data: any } | null = null;
      
      for (const line of lines) {
        if (line.startsWith('event:')) {
          currentEvent = { type: line.slice(6).trim(), data: null };
        } else if (line.startsWith('data:')) {
          if (currentEvent) {
            try {
              currentEvent.data = JSON.parse(line.slice(5).trim());
            } catch {
              currentEvent.data = line.slice(5).trim();
            }
          }
        } else if (line === '' && currentEvent) {
          onMessage(currentEvent);
          currentEvent = null;
        } else {
          buffer += line + '\n';
        }
      }
      
      // 如果还有未处理的事件，保留到下一次
      if (currentEvent) {
        buffer = `event: ${currentEvent.type}\ndata: ${JSON.stringify(currentEvent.data)}\n`;
      }
    }
  },
};

// 知识库 API
export const knowledgeApi = {
  getFolders: () =>
    request<Array<{
      id: string;
      name: string;
      type: string;
      createdAt: string;
      files: Array<{
        id: string;
        name: string;
        type: string;
        size: string;
        status: string;
        version: string;
        creator: string;
        createdAt: string;
        updatedAt: string;
        canDownload: boolean;
        assistant?: string;
      }>;
    }>>('/knowledge/folders'),
    
  createFolder: (data: { name: string; type?: string }) =>
    request('/knowledge/folders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  updateFolder: (id: string, data: { name: string }) =>
    request(`/knowledge/folders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  deleteFolder: (id: string) =>
    request(`/knowledge/folders/${id}`, {
      method: 'DELETE',
    }),
    
  addFile: (data: { folderId: string; name: string; type: string; size: string; filePath?: string }) =>
    request('/knowledge/files', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  updateFile: (id: string, data: Partial<{ status: string; version: string; assistant: string }>) =>
    request(`/knowledge/files/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  deleteFile: (id: string) =>
    request(`/knowledge/files/${id}`, {
      method: 'DELETE',
    }),
};

export default {
  auth: authApi,
  agents: agentApi,
  skills: skillApi,
  chat: chatApi,
  knowledge: knowledgeApi,
};
