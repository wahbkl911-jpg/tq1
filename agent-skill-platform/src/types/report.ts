// 报告相关类型定义

export interface Report {
  id: string;
  title: string;
  description?: string;
  type: string;
  cover?: string;
  views: number;
  downloads: number;
  createdAt: string;
  updatedAt?: string;
  status: 'generating' | 'completed' | 'failed';
  content?: ReportContent;
  materials?: Material[];
  createdBy?: string;
}

export interface ReportContent {
  cover: CoverInfo;
  toc: TOCItem[];
  sections: Section[];
}

export interface CoverInfo {
  title: string;
  subtitle?: string;
  publishDate: string;
  researchInstitution?: string;
  backgroundImage?: string;
}

export interface TOCItem {
  id: string;
  title: string;
  page: number;
  level: number;
  children?: TOCItem[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  charts?: ChartData[];
  tables?: TableData[];
}

export interface ChartData {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  title: string;
  data: any[];
  config?: Record<string, any>;
}

export interface TableData {
  id: string;
  title: string;
  headers: string[];
  rows: any[][];
}

export interface Material {
  id: string;
  type: 'file' | 'data';
  name: string;
  source: string;
  size?: string;
  uploadTime?: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface DataSource {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface ReportMessage {
  id: string;
  reportId: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'file' | 'progress' | 'chart' | 'report';
  metadata?: {
    files?: FileInfo[];
    progress?: number;
    chart?: ChartData;
    report?: Partial<Report>;
  };
  timestamp: string;
}

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: string;
  url?: string;
}

export interface CreateReportParams {
  title: string;
  theme: string;
  template?: string;
  dataSources?: string[];
  materials?: Material[];
}
