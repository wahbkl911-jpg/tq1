import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Avatar, Empty, Spin, Modal, Tabs, Tree, Checkbox, Upload, Form, Select, Tag, message } from 'antd';
import {
  SendOutlined,
  LeftOutlined,
  SettingOutlined,
  PaperClipOutlined,
  BookOutlined,
  UploadOutlined,
  FolderOutlined,
  FileOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@/stores';
import { mockAgents, mockChatSessions, mockKnowledgeFolders, mockSkills } from '@/utils/mockData';
import type { ChatMessage, KnowledgeFile, Skill } from '@/types';
import './style.css';

const { TabPane } = Tabs;
const { DirectoryTree } = Tree;
const { TextArea } = Input;
const { Option } = Select;

interface CreateAgentForm {
  name: string;
  description: string;
  exampleInputs: string[];
  selectedSkills: string[];
}

const AgentChat = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [knowledgeModalVisible, setKnowledgeModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('select');
  const [selectedKnowledgeFiles, setSelectedKnowledgeFiles] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  
  // 创建Agent弹窗相关状态
  const [createAgentModalVisible, setCreateAgentModalVisible] = useState(false);
  const [createAgentForm] = Form.useForm();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearchText, setSkillSearchText] = useState('');
  const [exampleInputs, setExampleInputs] = useState<string[]>(['']);

  const currentAgent = useAppStore((state) => state.currentAgent);
  const setCurrentAgent = useAppStore((state) => state.setCurrentAgent);
  const chatSessions = useAppStore((state) => state.chatSessions);
  const setChatSessions = useAppStore((state) => state.setChatSessions);
  const currentSession = useAppStore((state) => state.currentSession);
  const setCurrentSession = useAppStore((state) => state.setCurrentSession);
  const agents = useAppStore((state) => state.agents);
  const setAgents = useAppStore((state) => state.setAgents);

  useEffect(() => {
    // 加载Agent数据
    const agent = mockAgents.find((a) => a.id === agentId);
    if (agent) {
      setCurrentAgent(agent);
    }
    
    // 加载聊天会话
    setChatSessions(mockChatSessions);
    const session = mockChatSessions.find((s) => s.agentId === agentId);
    if (session) {
      setCurrentSession(session);
    }
  }, [agentId]);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !currentAgent) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      agentId: currentAgent.id,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    // 更新当前会话
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        messages: [...currentSession.messages, newMessage],
      };
      setCurrentSession(updatedSession);
    }

    setInputValue('');
    setLoading(true);

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        agentId: currentAgent.id,
        role: 'assistant',
        content: `我是${currentAgent.name}，${currentAgent.description}`,
        timestamp: new Date().toISOString(),
      };

      if (currentSession) {
        const updatedSession = {
          ...currentSession,
          messages: [...currentSession.messages, newMessage, aiResponse],
        };
        setCurrentSession(updatedSession);
      }
      setLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 获取文件图标
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'docx':
      case 'doc':
        return <FileWordOutlined style={{ color: '#1890ff' }} />;
      case 'xlsx':
      case 'xls':
        return <FileExcelOutlined style={{ color: '#52c41a' }} />;
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <FileOutlined style={{ color: '#8c8c8c' }} />;
    }
  };

  // 处理知识库文件选择
  const handleKnowledgeFileSelect = (fileId: string, checked: boolean) => {
    if (checked) {
      setSelectedKnowledgeFiles([...selectedKnowledgeFiles, fileId]);
    } else {
      setSelectedKnowledgeFiles(selectedKnowledgeFiles.filter(id => id !== fileId));
    }
  };

  // 处理知识库确认
  const handleKnowledgeConfirm = () => {
    // 这里可以将选择的文件关联到当前对话
    console.log('Selected knowledge files:', selectedKnowledgeFiles);
    setKnowledgeModalVisible(false);
  };

  // 获取当前选中文件夹的文件
  const getCurrentFolderFiles = (): KnowledgeFile[] => {
    const folder = mockKnowledgeFolders.find(f => f.id === selectedFolder);
    return folder?.files || [];
  };

  // 获取技能图标
  const getSkillIcon = (skill: Skill) => {
    if (skill.name.includes('xiaohongshu')) {
      return <span className="skill-icon red">📕</span>;
    }
    if (skill.name.includes('find')) {
      return <span className="skill-icon blue">🔍</span>;
    }
    if (skill.name.includes('write')) {
      return <span className="skill-icon green">📝</span>;
    }
    if (skill.name.includes('code')) {
      return <span className="skill-icon purple">💻</span>;
    }
    if (skill.name.includes('wechat')) {
      return <span className="skill-icon green">💬</span>;
    }
    if (skill.name.includes('douyin')) {
      return <span className="skill-icon black">🎵</span>;
    }
    if (skill.name.includes('document')) {
      return <span className="skill-icon orange">📄</span>;
    }
    if (skill.name.includes('data')) {
      return <span className="skill-icon cyan">📊</span>;
    }
    if (skill.name.includes('ppt')) {
      return <span className="skill-icon red">📽️</span>;
    }
    if (skill.name.includes('research')) {
      return <span className="skill-icon indigo">🔬</span>;
    }
    if (skill.name.includes('design')) {
      return <span className="skill-icon pink">🎨</span>;
    }
    if (skill.name.includes('skill-creator')) {
      return <span className="skill-icon amber">🛠️</span>;
    }
    if (skill.name.includes('internal')) {
      return <span className="skill-icon teal">📢</span>;
    }
    if (skill.name.includes('marketing')) {
      return <span className="skill-icon rose">📈</span>;
    }
    if (skill.name.includes('general')) {
      return <span className="skill-icon slate">🧰</span>;
    }
    if (skill.name.includes('customer')) {
      return <span className="skill-icon sky">🎧</span>;
    }
    if (skill.name.includes('content')) {
      return <span className="skill-icon violet">✍️</span>;
    }
    if (skill.name.includes('meeting')) {
      return <span className="skill-icon emerald">🤝</span>;
    }
    return <span className="skill-icon">⚡</span>;
  };

  // 处理技能选择
  const handleSkillToggle = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  // 添加示例输入
  const addExampleInput = () => {
    setExampleInputs([...exampleInputs, '']);
  };

  // 更新示例输入
  const updateExampleInput = (index: number, value: string) => {
    const newExamples = [...exampleInputs];
    newExamples[index] = value;
    setExampleInputs(newExamples);
  };

  // 删除示例输入
  const removeExampleInput = (index: number) => {
    if (exampleInputs.length > 1) {
      const newExamples = exampleInputs.filter((_, i) => i !== index);
      setExampleInputs(newExamples);
    }
  };

  // 处理创建Agent
  const handleCreateAgent = async () => {
    try {
      const values = await createAgentForm.validateFields();
      
      // 过滤空示例
      const validExamples = exampleInputs.filter(ex => ex.trim() !== '');
      
      if (selectedSkills.length === 0) {
        message.warning('请至少选择一个技能');
        return;
      }

      // 创建新Agent
      const newAgent = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        status: 'active' as const,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        creator: '当前用户',
        usageScope: ['当前用户'],
        skills: selectedSkills,
        exampleInputs: validExamples,
      };

      // 更新agents列表
      const updatedAgents = [...(agents || mockAgents), newAgent];
      setAgents(updatedAgents);

      message.success('Agent创建成功！');
      
      // 关闭弹窗并重置表单
      setCreateAgentModalVisible(false);
      createAgentForm.resetFields();
      setSelectedSkills([]);
      setExampleInputs(['']);
      setSkillSearchText('');

      // 可选：跳转到新创建的Agent
      // navigate(`/agents/${newAgent.id}`);
    } catch (error) {
      console.error('创建Agent失败:', error);
    }
  };

  // 关闭创建Agent弹窗
  const handleCloseCreateModal = () => {
    setCreateAgentModalVisible(false);
    createAgentForm.resetFields();
    setSelectedSkills([]);
    setExampleInputs(['']);
    setSkillSearchText('');
  };

  // 过滤技能
  const filteredSkills = mockSkills.filter(skill =>
    skill.displayName.toLowerCase().includes(skillSearchText.toLowerCase()) ||
    skill.description.toLowerCase().includes(skillSearchText.toLowerCase()) ||
    skill.tags.some(tag => tag.toLowerCase().includes(skillSearchText.toLowerCase()))
  );

  if (!currentAgent) {
    return (
      <div className="agent-chat-page">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="agent-chat-page">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="header-left">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={() => navigate('/agents')}
            className="back-btn"
          />
          <Avatar size="large" style={{ backgroundColor: '#d4a574' }}>
            {currentAgent.name.charAt(0)}
          </Avatar>
          <div className="agent-info">
            <h3>{currentAgent.name}</h3>
            <p>{currentAgent.description}</p>
          </div>
        </div>
        <div className="header-right">
          <Button type="text" icon={<SettingOutlined />}>
            设置
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {!currentSession || currentSession.messages.length === 0 ? (
          <div className="empty-chat">
            <Empty
              description="开始与Agent对话"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ) : (
          <>
            {currentSession.messages.map((message) => (
              <div
                key={message.id}
                className={`message-item ${message.role}`}
              >
                <div className="message-avatar">
                  {message.role === 'assistant' ? (
                    <Avatar style={{ backgroundColor: '#d4a574' }}>
                      {currentAgent.name.charAt(0)}
                    </Avatar>
                  ) : (
                    <Avatar style={{ backgroundColor: '#1890ff' }}>我</Avatar>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    {message.content}
                  </div>
                  <div className="message-time">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message-item assistant loading">
                <div className="message-avatar">
                  <Avatar style={{ backgroundColor: '#d4a574' }}>
                    {currentAgent.name.charAt(0)}
                  </Avatar>
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <Spin size="small" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Chat Input */}
      <div className="chat-input-area">
        <div className="input-toolbar">
          <Button type="text" icon={<PaperClipOutlined />}>
            附件
          </Button>
          <Button
            type="text"
            icon={<BookOutlined />}
            onClick={() => setKnowledgeModalVisible(true)}
          >
            选择知识库
          </Button>
          {/* 创建Agent按钮 */}
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={() => setCreateAgentModalVisible(true)}
            className="create-agent-btn"
          >
            创建Agent
          </Button>
        </div>
        <div className="input-box">
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入您的问题..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="message-input"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            disabled={!inputValue.trim() || loading}
            className="send-btn"
            style={{ background: '#d4a574', borderColor: '#d4a574' }}
          />
        </div>
      </div>

      {/* 知识库选择弹窗 */}
      <Modal
        title="选择知识库"
        open={knowledgeModalVisible}
        onCancel={() => setKnowledgeModalVisible(false)}
        onOk={handleKnowledgeConfirm}
        width={800}
        className="knowledge-modal"
        okText="确定"
        cancelText="取消"
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="knowledge-tabs">
          <TabPane tab="选择文档" key="select">
            <div className="knowledge-select-content">
              <div className="knowledge-sidebar">
                <div className="knowledge-tabs-header">
                  <span className="tab-item active">个人</span>
                  <span className="tab-item">部门</span>
                  <span className="tab-item">公共</span>
                </div>
                <div className="folder-list">
                  {mockKnowledgeFolders.map((folder) => (
                    <div
                      key={folder.id}
                      className={`folder-item ${selectedFolder === folder.id ? 'active' : ''}`}
                      onClick={() => setSelectedFolder(folder.id)}
                    >
                      <FolderOutlined className="folder-icon" />
                      <span className="folder-name">{folder.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="knowledge-file-list">
                <div className="file-list-header">
                  <span className="folder-title">
                    {mockKnowledgeFolders.find(f => f.id === selectedFolder)?.name || '请选择文件夹'}
                  </span>
                  <Upload showUploadList={false}>
                    <Button icon={<UploadOutlined />} size="small">
                      上传本地文件
                    </Button>
                  </Upload>
                </div>
                <div className="file-list-content">
                  {selectedFolder ? (
                    getCurrentFolderFiles().length > 0 ? (
                      getCurrentFolderFiles().map((file) => (
                        <div key={file.id} className="file-item">
                          <Checkbox
                            checked={selectedKnowledgeFiles.includes(file.id)}
                            onChange={(e) => handleKnowledgeFileSelect(file.id, e.target.checked)}
                          />
                          <span className="file-icon">{getFileIcon(file.type)}</span>
                          <span className="file-name">{file.name}</span>
                        </div>
                      ))
                    ) : (
                      <Empty description="该文件夹暂无文件" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )
                  ) : (
                    <Empty description="请选择左侧文件夹" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="选择文件夹" key="folder">
            <div className="knowledge-folder-content">
              <DirectoryTree
                treeData={mockKnowledgeFolders.map(folder => ({
                  title: folder.name,
                  key: folder.id,
                  icon: <FolderOutlined />,
                  children: folder.files?.map(file => ({
                    title: file.name,
                    key: file.id,
                    icon: getFileIcon(file.type),
                    isLeaf: true,
                  })) || [],
                }))}
                defaultExpandAll
              />
            </div>
          </TabPane>
          <TabPane tab="选择知识库" key="knowledge">
            <div className="knowledge-list-content">
              {mockKnowledgeFolders.slice(0, 5).map((folder) => (
                <div key={folder.id} className="knowledge-item">
                  <Checkbox />
                  <BookOutlined className="knowledge-icon" />
                  <span className="knowledge-name">{folder.name}</span>
                </div>
              ))}
            </div>
          </TabPane>
        </Tabs>
      </Modal>

      {/* 创建Agent弹窗 */}
      <Modal
        title="创建Agent"
        open={createAgentModalVisible}
        onCancel={handleCloseCreateModal}
        onOk={handleCreateAgent}
        width={700}
        className="create-agent-modal"
        okText="创建"
        cancelText="取消"
        destroyOnClose
      >
        <div className="create-agent-content">
          <Form
            form={createAgentForm}
            layout="vertical"
            className="create-agent-form"
          >
            {/* Agent名称 */}
            <Form.Item
              label="Agent名称"
              name="name"
              rules={[{ required: true, message: '请输入Agent名称' }]}
            >
              <Input placeholder="例如：聚烯烃分析师" maxLength={20} showCount />
            </Form.Item>

            {/* Agent描述 */}
            <Form.Item
              label="Agent描述"
              name="description"
              rules={[{ required: true, message: '请输入Agent描述' }]}
            >
              <TextArea
                placeholder="描述这个Agent的专业领域和能力，例如：专注于聚乙烯（PE）、聚丙烯（PP）等聚烯烃产品的市场分析..."
                autoSize={{ minRows: 3, maxRows: 5 }}
                maxLength={200}
                showCount
              />
            </Form.Item>

            {/* 示例填写信息 */}
            <div className="example-inputs-section">
              <label className="section-label">示例提问（可选）</label>
              <p className="section-desc">添加示例问题，帮助用户了解如何与Agent对话</p>
              <div className="example-inputs-list">
                {exampleInputs.map((example, index) => (
                  <div key={index} className="example-input-item">
                    <Input
                      value={example}
                      onChange={(e) => updateExampleInput(index, e.target.value)}
                      placeholder={`示例问题 ${index + 1}`}
                      className="example-input"
                    />
                    {exampleInputs.length > 1 && (
                      <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={() => removeExampleInput(index)}
                        className="remove-example-btn"
                      />
                    )}
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={addExampleInput}
                  className="add-example-btn"
                  block
                >
                  <PlusOutlined /> 添加示例
                </Button>
              </div>
            </div>
          </Form>

          {/* 技能选择区域 */}
          <div className="skill-select-section">
            <div className="skill-select-header">
              <label className="section-label">选择技能 <span className="required">*</span></label>
              <span className="selected-count">已选择 {selectedSkills.length} 个</span>
            </div>
            <p className="section-desc">选择Agent需要具备的技能能力</p>
            
            {/* 技能搜索 */}
            <Input
              placeholder="搜索技能名称、描述或标签"
              value={skillSearchText}
              onChange={(e) => setSkillSearchText(e.target.value)}
              className="skill-search-input"
              allowClear
            />

            {/* 技能列表 */}
            <div className="skills-select-list">
              {filteredSkills.length > 0 ? (
                filteredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`skill-select-item ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
                    onClick={() => handleSkillToggle(skill.id)}
                  >
                    <div className="skill-select-icon">{getSkillIcon(skill)}</div>
                    <div className="skill-select-info">
                      <div className="skill-select-name">{skill.displayName}</div>
                      <div className="skill-select-desc">{skill.description.slice(0, 50)}...</div>
                      <div className="skill-select-tags">
                        {skill.tags.slice(0, 3).map((tag) => (
                          <Tag key={tag} size="small" className="skill-tag">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div className="skill-select-check">
                      {selectedSkills.includes(skill.id) && (
                        <CheckOutlined className="check-icon" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <Empty description="未找到匹配的技能" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgentChat;
