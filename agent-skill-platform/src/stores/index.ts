import { create } from 'zustand';
import type { Agent, Skill, ChatSession, KnowledgeFolder, DebugSession } from '@/types';

interface AppState {
  // Agents
  agents: Agent[];
  currentAgent: Agent | null;
  setAgents: (agents: Agent[]) => void;
  setCurrentAgent: (agent: Agent | null) => void;
  addAgent: (agent: Agent) => void;
  
  // Chat Sessions
  chatSessions: ChatSession[];
  currentSession: ChatSession | null;
  setChatSessions: (sessions: ChatSession[]) => void;
  setCurrentSession: (session: ChatSession | null) => void;
  
  // Skills
  skills: Skill[];
  currentSkill: Skill | null;
  setSkills: (skills: Skill[]) => void;
  setCurrentSkill: (skill: Skill | null) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (skill: Skill) => void;
  
  // Debug Sessions
  debugSessions: DebugSession[];
  currentDebugSession: DebugSession | null;
  setDebugSessions: (sessions: DebugSession[]) => void;
  setCurrentDebugSession: (session: DebugSession | null) => void;
  
  // Knowledge Base
  knowledgeFolders: KnowledgeFolder[];
  currentFolder: KnowledgeFolder | null;
  setKnowledgeFolders: (folders: KnowledgeFolder[]) => void;
  setCurrentFolder: (folder: KnowledgeFolder | null) => void;
  
  // UI State
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Agents
  agents: [],
  currentAgent: null,
  setAgents: (agents) => set({ agents }),
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
  
  // Chat Sessions
  chatSessions: [],
  currentSession: null,
  setChatSessions: (sessions) => set({ chatSessions: sessions }),
  setCurrentSession: (session) => set({ currentSession: session }),
  
  // Skills
  skills: [],
  currentSkill: null,
  setSkills: (skills) => set({ skills }),
  setCurrentSkill: (skill) => set({ currentSkill: skill }),
  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  updateSkill: (skill) => set((state) => ({
    skills: state.skills.map((s) => (s.id === skill.id ? skill : s)),
  })),
  
  // Debug Sessions
  debugSessions: [],
  currentDebugSession: null,
  setDebugSessions: (sessions) => set({ debugSessions: sessions }),
  setCurrentDebugSession: (session) => set({ currentDebugSession: session }),
  
  // Knowledge Base
  knowledgeFolders: [],
  currentFolder: null,
  setKnowledgeFolders: (folders) => set({ knowledgeFolders: folders }),
  setCurrentFolder: (folder) => set({ currentFolder: folder }),
  
  // UI State
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));
