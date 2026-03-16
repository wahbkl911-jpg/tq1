import { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Tabs,
  Tree,
  Switch,
  Tag,
  Space,
  Tooltip,
  Progress,
  Upload,
  message,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  FolderOutlined,
  FileOutlined,
  EyeOutlined,
  DownloadOutlined,
  ReloadOutlined,
  MoreOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileMarkdownOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@/stores';
import { mockKnowledgeFolders } from '@/utils/mockData';
import type { KnowledgeFile, KnowledgeFolder } from '@/types';
import './style.css';

const { TabPane } = Tabs;
const { DirectoryTree } = Tree;

const KnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [searchText, setSearchText] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const knowledgeFolders = useAppStore((state) => state.knowledgeFolders);
  const setKnowledgeFolders = useAppStore((state) => state.setKnowledgeFolders);
  const currentFolder = useAppStore((state) => state.currentFolder);
  const setCurrentFolder = useAppStore((state) => state.setCurrentFolder);

  useEffect(() => {
    setKnowledgeFolders(mockKnowledgeFolders);
    // 默认选中"个人文件夹"
    const defaultFolder = mockKnowledgeFolders.find((f) => f.name === '个人文件夹');
    if (defaultFolder) {
      setCurrentFolder(defaultFolder);
      setSelectedFolder(defaultFolder.id);
    }
  }, []);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'docx':
        return <FileWordOutlined style={{ color: '#2b579a' }} />;
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
      case 'md':
        return <FileMarkdownOutlined style={{ color: '#1890ff' }} />;
      default:
        return <FileTextOutlined style={{ color: '#8c8c8c' }} />;
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'completed':
        return <Tag color="success">已学习</Tag>;
      case 'learning':
        return (
          <Tag color="warning">
            <span className="learning-dot" />学习中
          </Tag>
        );
      case 'error':
        return <Tag color="error">学习失败</Tag>;
      default:
        return <Tag>待学习</Tag>;
    }
  };

  const treeData = knowledgeFolders.map((folder) => ({
    key: folder.id,
    title: folder.name,
    icon: <FolderOutlined style={{ color: '#d4a574' }} />,
    children: folder.files.map((file) => ({
      key: `${folder.id}-${file.id}`,
      title: file.name,
      icon: getFileIcon(file.type),
      isLeaf: true,
    })),
  }));

  const handleFolderSelect = (selectedKeys: string[], info: any) => {
    const folderId = selectedKeys[0];
    if (folderId && !folderId.includes('-')) {
      const folder = knowledgeFolders.find((f) => f.id === folderId);
      if (folder) {
        setCurrentFolder(folder);
        setSelectedFolder(folderId);
      }
    }
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: KnowledgeFile) => (
        <div className="file-name-cell">
          {getFileIcon(record.type)}
          <span className="file-name">{text}</span>
        </div>
      ),
    },
    {
      title: '学习状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      width: 80,
    },
    {
      title: '对话中可下载',
      dataIndex: 'canDownload',
      key: 'canDownload',
      width: 120,
      render: (canDownload: boolean) => (
        <Switch size="small" checked={canDownload} />
      ),
    },
    {
      title: '文档大小',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: '引用的问答助手',
      dataIndex: 'assistant',
      key: 'assistant',
      width: 120,
      render: (assistant: string) => assistant || '-',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 100,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: KnowledgeFile) => (
        <Space size="small">
          <Tooltip title="预览">
            <Button type="text" size="small" icon={<EyeOutlined />}>
              预览
            </Button>
          </Tooltip>
          <Tooltip title="下载">
            <Button type="text" size="small" icon={<DownloadOutlined />}>
              下载
            </Button>
          </Tooltip>
          <Tooltip title="更新">
            <Button type="text" size="small" icon={<ReloadOutlined />}>
              更新
            </Button>
          </Tooltip>
          <Button type="text" size="small" icon={<MoreOutlined />} />
        </Space>
      ),
    },
  ];

  const filteredFiles = currentFolder?.files.filter((file) =>
    file.name.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  const getFileType = (filename: string): 'docx' | 'pdf' | 'txt' | 'md' => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    switch (ext) {
      case 'docx':
      case 'doc':
        return 'docx';
      case 'pdf':
        return 'pdf';
      case 'md':
      case 'markdown':
        return 'md';
      default:
        return 'txt';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + sizes[i];
  };

  const handleUpload = (file: File) => {
    if (!currentFolder) {
      message.error('请先选择一个文件夹');
      return false;
    }

    setUploading(true);

    // 模拟上传过程
    setTimeout(() => {
      const newFile: KnowledgeFile = {
        id: Date.now().toString(),
        name: file.name,
        type: getFileType(file.name),
        size: formatFileSize(file.size),
        status: 'learning',
        version: 'V1',
        creator: '当前用户',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        canDownload: true,
      };

      // 更新当前文件夹
      const updatedFolder = {
        ...currentFolder,
        files: [...currentFolder.files, newFile],
      };

      // 更新文件夹列表
      const updatedFolders = knowledgeFolders.map((folder) =>
        folder.id === currentFolder.id ? updatedFolder : folder
      );

      setKnowledgeFolders(updatedFolders);
      setCurrentFolder(updatedFolder);
      setUploading(false);
      message.success(`文件 "${file.name}" 上传成功`);
    }, 1000);

    return false; // 阻止默认上传行为
  };

  return (
    <div className="knowledge-base-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-left">
          <h2>
            知识库
            <Tooltip title="知识库说明">
              <span className="info-icon">ⓘ</span>
            </Tooltip>
          </h2>
        </div>
        <div className="header-right">
          <span className="storage-info">
            存储空间：已使用118.05MB/10.58GB
          </span>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="warning-banner">
        <span className="warning-icon">⚠️</span>
        <span>知识库支持文档添加水印，快去试试吧</span>
        <a className="link">去设置</a>
      </div>

      <div className="knowledge-content">
        {/* Left Sidebar - Folder Tree */}
        <div className="folder-sidebar">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="folder-tabs">
            <TabPane tab="个人" key="personal">
              <div className="folder-tree-container">
                <Button
                  type="dashed"
                  block
                  icon={<PlusOutlined />}
                  className="new-folder-btn"
                >
                  新建
                </Button>
                <DirectoryTree
                  treeData={treeData}
                  selectedKeys={selectedFolder ? [selectedFolder] : []}
                  onSelect={handleFolderSelect}
                  className="folder-tree"
                  showIcon
                  defaultExpandAll
                />
              </div>
            </TabPane>
            <TabPane tab="部门" key="department" />
            <TabPane tab="公共" key="public" />
          </Tabs>
        </div>

        {/* Right Content - File List */}
        <div className="file-content">
          <div className="content-header">
            <div className="folder-info">
              <FolderOutlined style={{ color: '#d4a574', fontSize: 20 }} />
              <span className="folder-name">{currentFolder?.name || '个人文件夹'}</span>
              <span className="file-count">{filteredFiles.length}个文档</span>
            </div>
            <div className="content-actions">
              <Input
                placeholder="请输入文档名称或标签搜索"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
                style={{ width: 280 }}
              />
              <Upload
                beforeUpload={handleUpload}
                showUploadList={false}
                accept=".doc,.docx,.pdf,.txt,.md,.markdown"
              >
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  className="upload-btn"
                  style={{ background: '#d4a574', borderColor: '#d4a574' }}
                  loading={uploading}
                >
                  上传文档
                </Button>
              </Upload>
            </div>
          </div>

          <div className="file-table-container">
            <Table
              columns={columns}
              dataSource={filteredFiles}
              rowKey="id"
              pagination={{
                total: filteredFiles.length,
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `共 ${total} 项`,
              }}
              className="file-table"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
