import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Avatar, Empty, Spin, Badge, Modal, Tabs, Tree, Checkbox, Upload, Form, Tag, message, Dropdown } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  SendOutlined,
  MoreOutlined,
  PaperClipOutlined,
  BookOutlined,
  UploadOutlined,
  FolderOutlined,
  FileOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@/stores';
import { mockAgents, mockChatSessions, mockKnowledgeFolders, mockSkills } from '@/utils/mockData';
import type { Agent, ChatMessage, KnowledgeFile, Skill } from '@/types';
import './style.css';

const { TabPane } = Tabs;
const { DirectoryTree } = Tree;
const { TextArea } = Input;

const AgentList = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
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

  // 知识图谱可视化弹窗相关状态
  const [graphModalVisible, setGraphModalVisible] = useState(false);
  const [selectedGraphType, setSelectedGraphType] = useState<string>('');

  const agents = useAppStore((state) => state.agents);
  const setAgents = useAppStore((state) => state.setAgents);
  const currentAgent = useAppStore((state) => state.currentAgent);
  const setCurrentAgent = useAppStore((state) => state.setCurrentAgent);

  useEffect(() => {
    setAgents(mockAgents);
    // 默认选中第一个Agent
    if (mockAgents.length > 0 && !selectedAgentId) {
      setSelectedAgentId(mockAgents[0].id);
      setCurrentAgent(mockAgents[0]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedAgentId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgentId(agent.id);
    setCurrentAgent(agent);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !currentAgent) return;

    setInputValue('');
    setLoading(true);

    // 模拟AI回复
    setTimeout(() => {
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

      // 选中新创建的Agent
      setSelectedAgentId(newAgent.id);
      setCurrentAgent(newAgent);
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

  // 处理删除Agent
  const handleDeleteAgent = () => {
    if (!selectedAgent) return;

    Modal.confirm({
      title: '确认删除',
      content: `确定要删除Agent"${selectedAgent.name}"吗？删除后无法恢复。`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        // 从列表中移除当前Agent
        const updatedAgents = agents.filter(agent => agent.id !== selectedAgent.id);
        setAgents(updatedAgents);
        
        // 如果删除后还有Agent，选中第一个；否则清空选中
        if (updatedAgents.length > 0) {
          setSelectedAgentId(updatedAgents[0].id);
          setCurrentAgent(updatedAgents[0]);
        } else {
          setSelectedAgentId(null);
          setCurrentAgent(null);
        }
        
        message.success('Agent已删除');
      },
    });
  };

  // 过滤技能
  const filteredSkills = mockSkills.filter(skill =>
    skill.displayName.toLowerCase().includes(skillSearchText.toLowerCase()) ||
    skill.description.toLowerCase().includes(skillSearchText.toLowerCase()) ||
    skill.tags.some(tag => tag.toLowerCase().includes(skillSearchText.toLowerCase()))
  );

  const filteredAgents = agents.filter((agent) => {
    const matchSearch = agent.name.toLowerCase().includes(searchText.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchText.toLowerCase());
    return matchSearch;
  });

  const currentSession = mockChatSessions.find((s) => s.agentId === selectedAgentId);
  const selectedAgent = agents.find((a) => a.id === selectedAgentId);

  return (
    <div className="agent-chat-layout">
      {/* 左侧Agent列表 */}
      <div className="agent-sidebar">
        <div className="sidebar-header">
          <h3>我的Agent</h3>
          <Button 
            type="text" 
            icon={<PlusOutlined />} 
            className="create-agent-btn" 
            onClick={() => setCreateAgentModalVisible(true)}
          />
        </div>

        <div className="sidebar-search">
          <Input
            placeholder="搜索智能体"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="agent-list">
          {filteredAgents.length === 0 ? (
            <Empty description="暂无智能体" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className={`agent-list-item ${selectedAgentId === agent.id ? 'active' : ''}`}
                onClick={() => handleAgentSelect(agent)}
              >
                <Avatar size="large" style={{ backgroundColor: '#d4a574', flexShrink: 0 }}>
                  {agent.name.charAt(0)}
                </Avatar>
                <div className="agent-item-info">
                  <div className="agent-item-header">
                    <span className="agent-item-name">{agent.name}</span>
                    <span className="agent-item-time">{agent.updatedAt}</span>
                  </div>
                  <p className="agent-item-desc">{agent.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 右侧聊天区域 */}
      <div className="chat-main">
        {selectedAgent ? (
          <>
            {/* 聊天头部 */}
            <div className="chat-main-header">
              <div className="chat-header-info">
                <Avatar size="large" style={{ backgroundColor: '#d4a574' }}>
                  {selectedAgent.name.charAt(0)}
                </Avatar>
                <div className="chat-header-text">
                  <h4>{selectedAgent.name}</h4>
                  <p>{selectedAgent.description}</p>
                </div>
              </div>
              <div className="chat-header-actions">
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'delete',
                        label: '删除Agent',
                        icon: <DeleteOutlined />,
                        danger: true,
                        onClick: handleDeleteAgent,
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              </div>
            </div>

            {/* 聊天消息区域 */}
            <div className="chat-main-messages">
              {!currentSession || currentSession.messages.length === 0 ? (
                <div className="empty-chat">
                  <Empty
                    description="开始与智能体对话"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              ) : (
                <>
                  <div className="chat-date-divider">
                    <span>今天</span>
                  </div>
                  {currentSession.messages.map((message: ChatMessage) => (
                    <div
                      key={message.id}
                      className={`chat-message ${message.role}`}
                    >
                      {message.role === 'assistant' ? (
                        <>
                          <Avatar size="small" style={{ backgroundColor: '#d4a574', marginRight: 8 }}>
                            {selectedAgent.name.charAt(0)}
                          </Avatar>
                          <div className={`message-bubble ${message.role}`}>
                            <div className="message-content">{message.content}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`message-bubble ${message.role}`}>
                            <div className="message-content">{message.content}</div>
                          </div>
                          <Avatar size="small" style={{ backgroundColor: '#1890ff', marginLeft: -50 }}>
                            我
                          </Avatar>
                        </>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="chat-message assistant loading">
                      <Avatar size="small" style={{ backgroundColor: '#d4a574', marginRight: 8 }}>
                        {selectedAgent.name.charAt(0)}
                      </Avatar>
                      <div className="message-bubble assistant">
                        <Spin size="small" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* 聊天输入区域 */}
            <div className="chat-main-input">
              <div className="input-toolbar">
                <Button type="text" icon={<PaperClipOutlined />} />
                <Button
                  type="text"
                  icon={<BookOutlined />}
                  onClick={() => setKnowledgeModalVisible(true)}
                >
                  选择知识库/图谱库
                </Button>
              </div>
              <div className="input-box">
                <Input.TextArea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`给 ${selectedAgent.name} 发送消息...`}
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
          </>
        ) : (
          <div className="empty-chat-area">
            <Empty description="请选择一个智能体开始对话" />
          </div>
        )}
      </div>

      {/* 知识库选择弹窗 */}
      <Modal
        title="选择知识库/图谱库"
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
          <TabPane tab="选择图谱库" key="knowledge">
            <div className="knowledge-list-content">
              <div className="graph-item" onClick={() => { setSelectedGraphType('装置图谱'); setGraphModalVisible(true); }}>
                <Checkbox onClick={(e) => e.stopPropagation()} />
                <span className="graph-name">装置图谱</span>
              </div>
              <div className="graph-item" onClick={() => { setSelectedGraphType('工艺图谱'); setGraphModalVisible(true); }}>
                <Checkbox onClick={(e) => e.stopPropagation()} />
                <span className="graph-name">工艺图谱</span>
              </div>
              <div className="graph-item" onClick={() => { setSelectedGraphType('事件图谱'); setGraphModalVisible(true); }}>
                <Checkbox onClick={(e) => e.stopPropagation()} />
                <span className="graph-name">事件图谱</span>
              </div>
              <div className="graph-item" onClick={() => { setSelectedGraphType('物流图谱'); setGraphModalVisible(true); }}>
                <Checkbox onClick={(e) => e.stopPropagation()} />
                <span className="graph-name">物流图谱</span>
              </div>
              <div className="graph-item" onClick={() => { setSelectedGraphType('人员图谱'); setGraphModalVisible(true); }}>
                <Checkbox onClick={(e) => e.stopPropagation()} />
                <span className="graph-name">人员图谱</span>
              </div>
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

      {/* 知识图谱可视化弹窗 */}
      <Modal
        title={`${selectedGraphType} - 知识图谱可视化`}
        open={graphModalVisible}
        onCancel={() => setGraphModalVisible(false)}
        width={900}
        className="graph-visualization-modal"
        footer={[
          <Button key="close" onClick={() => setGraphModalVisible(false)}>
            关闭
          </Button>,
        ]}
        destroyOnClose
      >
        <div className="graph-visualization-content">
          {/* 图谱统计信息 */}
          <div className="graph-stats">
            <div className="stat-item">
              <span className="stat-value">1,234</span>
              <span className="stat-label">实体节点</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">3,456</span>
              <span className="stat-label">关系边</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">28</span>
              <span className="stat-label">实体类型</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">15</span>
              <span className="stat-label">关系类型</span>
            </div>
          </div>

          {/* 图谱可视化区域 */}
          <div className="graph-visualization-area">
            <svg className="graph-svg" viewBox="0 0 800 450">
              <defs>
                {/* 中心节点渐变 - 橙色 */}
                <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff9f43" />
                  <stop offset="100%" stopColor="#ff6b35" />
                </radialGradient>
                {/* 普通节点渐变 - 蓝色 */}
                <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4facfe" />
                  <stop offset="100%" stopColor="#00f2fe" />
                </radialGradient>
                {/* 连接线渐变 - 灰色 */}
                <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a0aec0" />
                  <stop offset="100%" stopColor="#718096" />
                </linearGradient>
                {/* 箭头标记 */}
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#718096" />
                </marker>
              </defs>

              {/* 装置图谱 */}
              {selectedGraphType === '装置图谱' && (
                <g className="graph-group">
                  {/* 中心节点 - 装置图谱 */}
                  <circle cx="400" cy="225" r="55" fill="url(#centerGradient)" className="svg-node center" />
                  <text x="400" y="220" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">装置图谱</text>
                  <text x="400" y="240" textAnchor="middle" fill="white" fontSize="12">中心</text>

                  {/* 周边节点 */}
                  <circle cx="400" cy="60" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="65" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">反应器</text>

                  <circle cx="550" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">蒸馏塔</text>

                  <circle cx="550" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">换热器</text>

                  <circle cx="400" cy="390" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="395" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">压缩机</text>

                  <circle cx="250" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">储罐</text>

                  <circle cx="250" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">泵</text>

                  {/* 连接线 - 放在节点后面绘制，确保箭头可见 */}
                  {/* 到反应器 (上) */}
                  <line x1="400" y1="170" x2="400" y2="110" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  {/* 到蒸馏塔 (右上) */}
                  <line x1="445" y1="190" x2="510" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  {/* 到换热器 (右下) */}
                  <line x1="445" y1="260" x2="510" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  {/* 到压缩机 (下) */}
                  <line x1="400" y1="280" x2="400" y2="340" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  {/* 到储罐 (左下) */}
                  <line x1="355" y1="260" x2="290" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  {/* 到泵 (左上) */}
                  <line x1="355" y1="190" x2="290" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </g>
              )}

              {/* 工艺图谱 */}
              {selectedGraphType === '工艺图谱' && (
                <g className="graph-group">
                  <circle cx="400" cy="225" r="55" fill="url(#centerGradient)" className="svg-node center" />
                  <text x="400" y="220" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">工艺图谱</text>
                  <text x="400" y="240" textAnchor="middle" fill="white" fontSize="12">中心</text>

                  <circle cx="400" cy="60" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="65" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">聚合工艺</text>

                  <circle cx="550" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">裂解工艺</text>

                  <circle cx="550" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">精馏工艺</text>

                  <circle cx="400" cy="390" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="395" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">催化工艺</text>

                  <circle cx="250" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">分离工艺</text>

                  <circle cx="250" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">提纯工艺</text>

                  {/* 连接线 */}
                  <line x1="400" y1="170" x2="400" y2="110" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="445" y1="190" x2="510" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="445" y1="260" x2="510" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="400" y1="280" x2="400" y2="340" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="355" y1="260" x2="290" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="355" y1="190" x2="290" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </g>
              )}

              {/* 事件图谱 */}
              {selectedGraphType === '事件图谱' && (
                <g className="graph-group">
                  <circle cx="400" cy="225" r="55" fill="url(#centerGradient)" className="svg-node center" />
                  <text x="400" y="220" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">事件图谱</text>
                  <text x="400" y="240" textAnchor="middle" fill="white" fontSize="12">中心</text>

                  <circle cx="400" cy="60" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="65" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">设备故障</text>

                  <circle cx="550" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">安全事故</text>

                  <circle cx="550" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">检修记录</text>

                  <circle cx="400" cy="390" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="395" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">生产异常</text>

                  <circle cx="250" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">质量事件</text>

                  <circle cx="250" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">环保事件</text>

                  {/* 连接线 */}
                  <line x1="400" y1="170" x2="400" y2="110" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="445" y1="190" x2="510" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="445" y1="260" x2="510" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="400" y1="280" x2="400" y2="340" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="355" y1="260" x2="290" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="355" y1="190" x2="290" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </g>
              )}

              {/* 物流图谱 */}
              {selectedGraphType === '物流图谱' && (
                <g className="graph-group">
                  <circle cx="400" cy="225" r="55" fill="url(#centerGradient)" className="svg-node center" />
                  <text x="400" y="220" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">物流图谱</text>
                  <text x="400" y="240" textAnchor="middle" fill="white" fontSize="12">中心</text>

                  <circle cx="400" cy="60" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="65" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">原料入库</text>

                  <circle cx="550" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">产品出库</text>

                  <circle cx="550" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">运输路线</text>

                  <circle cx="400" cy="390" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="395" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">仓储节点</text>

                  <circle cx="250" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">供应商</text>

                  <circle cx="250" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">客户</text>

                  {/* 连接线 */}
                  <line x1="400" y1="170" x2="400" y2="110" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="445" y1="190" x2="510" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="445" y1="260" x2="510" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="400" y1="280" x2="400" y2="340" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="355" y1="260" x2="290" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="355" y1="190" x2="290" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </g>
              )}

              {/* 人员图谱 */}
              {selectedGraphType === '人员图谱' && (
                <g className="graph-group">
                  <circle cx="400" cy="225" r="55" fill="url(#centerGradient)" className="svg-node center" />
                  <text x="400" y="220" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">人员图谱</text>
                  <text x="400" y="240" textAnchor="middle" fill="white" fontSize="12">中心</text>

                  <circle cx="400" cy="60" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="65" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">生产部</text>

                  <circle cx="550" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">技术部</text>

                  <circle cx="550" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="550" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">安全部</text>

                  <circle cx="400" cy="390" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="400" y="395" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">质检部</text>

                  <circle cx="250" cy="320" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="325" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">维修部</text>

                  <circle cx="250" cy="130" r="45" fill="url(#nodeGradient)" className="svg-node" />
                  <text x="250" y="135" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">管理部</text>

                  {/* 连接线 */}
                  <line x1="400" y1="170" x2="400" y2="110" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="445" y1="190" x2="510" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="445" y1="260" x2="510" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="400" y1="280" x2="400" y2="340" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="355" y1="260" x2="290" y2="300" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="355" y1="190" x2="290" y2="160" stroke="url(#edgeGradient)" strokeWidth="2" markerEnd="url(#arrowhead)" />
                </g>
              )}
            </svg>
          </div>

          {/* 图例 */}
          <div className="graph-legend">
            <div className="legend-title">图例</div>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-color center"></span>
                <span className="legend-label">中心节点</span>
              </div>
              <div className="legend-item">
                <span className="legend-color normal"></span>
                <span className="legend-label">实体节点</span>
              </div>
              <div className="legend-item">
                <span className="legend-line"></span>
                <span className="legend-label">关系连接</span>
              </div>
            </div>
          </div>

          {/* 示例数据表格 */}
          <div className="graph-data-table">
            <div className="table-title">示例数据</div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>实体名称</th>
                  <th>实体类型</th>
                  <th>关联关系</th>
                  <th>关联实体</th>
                </tr>
              </thead>
              <tbody>
                {selectedGraphType === '装置图谱' && (
                  <>
                    <tr>
                      <td>反应器R-101</td>
                      <td>反应设备</td>
                      <td>连接</td>
                      <td>换热器E-201</td>
                    </tr>
                    <tr>
                      <td>蒸馏塔T-301</td>
                      <td>分离设备</td>
                      <td>产出</td>
                      <td>储罐V-501</td>
                    </tr>
                    <tr>
                      <td>压缩机C-401</td>
                      <td>动力设备</td>
                      <td>供应</td>
                      <td>反应器R-101</td>
                    </tr>
                  </>
                )}
                {selectedGraphType === '工艺图谱' && (
                  <>
                    <tr>
                      <td>聚合反应</td>
                      <td>化学反应</td>
                      <td>前置</td>
                      <td>原料预处理</td>
                    </tr>
                    <tr>
                      <td>精馏分离</td>
                      <td>物理分离</td>
                      <td>后续</td>
                      <td>产品包装</td>
                    </tr>
                    <tr>
                      <td>催化裂解</td>
                      <td>转化工艺</td>
                      <td>依赖</td>
                      <td>催化剂系统</td>
                    </tr>
                  </>
                )}
                {selectedGraphType === '事件图谱' && (
                  <>
                    <tr>
                      <td>2024-03-15故障</td>
                      <td>设备故障</td>
                      <td>导致</td>
                      <td>停产2小时</td>
                    </tr>
                    <tr>
                      <td>年度检修</td>
                      <td>计划维护</td>
                      <td>包含</td>
                      <td>反应器清洗</td>
                    </tr>
                    <tr>
                      <td>质量异常</td>
                      <td>品质事件</td>
                      <td>影响</td>
                      <td>批次产品</td>
                    </tr>
                  </>
                )}
                {selectedGraphType === '物流图谱' && (
                  <>
                    <tr>
                      <td>乙烯原料</td>
                      <td>原材料</td>
                      <td>运输</td>
                      <td>生产车间</td>
                    </tr>
                    <tr>
                      <td>聚乙烯产品</td>
                      <td>成品</td>
                      <td>配送</td>
                      <td>华东仓库</td>
                    </tr>
                    <tr>
                      <td>催化剂</td>
                      <td>辅料</td>
                      <td>供应</td>
                      <td>供应商A</td>
                    </tr>
                  </>
                )}
                {selectedGraphType === '人员图谱' && (
                  <>
                    <tr>
                      <td>张工程师</td>
                      <td>技术人员</td>
                      <td>负责</td>
                      <td>反应器维护</td>
                    </tr>
                    <tr>
                      <td>李主管</td>
                      <td>管理人员</td>
                      <td>管理</td>
                      <td>生产班组</td>
                    </tr>
                    <tr>
                      <td>王质检</td>
                      <td>质检人员</td>
                      <td>检验</td>
                      <td>产品质量</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* 示例图谱预览 */}
          <div className="graph-preview-section">
            <div className="graph-preview-title">示例图谱预览</div>
            <div className="graph-preview-content">
              <div className="graph-preview-card">
                <div className="graph-preview-card-title">核心实体关系</div>
                <div className="graph-preview-card-desc">展示{selectedGraphType}中核心实体间的关联关系</div>
                <div className="graph-preview-mini">
                  <div className="mini-node center"></div>
                  <div className="mini-node n1"></div>
                  <div className="mini-node n2"></div>
                  <div className="mini-node n3"></div>
                  <div className="mini-node n4"></div>
                </div>
              </div>
              <div className="graph-preview-card">
                <div className="graph-preview-card-title">层级结构</div>
                <div className="graph-preview-card-desc">{selectedGraphType}的层级分类与组织结构</div>
                <div className="graph-preview-mini">
                  <div className="mini-node center" style={{top: '8px', left: '50%', transform: 'translateX(-50%)'}}></div>
                  <div className="mini-node n1" style={{top: '50%', left: '20px', transform: 'translateY(-50%)', width: '16px', height: '16px'}}></div>
                  <div className="mini-node n2" style={{top: '50%', right: '20px', transform: 'translateY(-50%)', width: '16px', height: '16px'}}></div>
                  <div className="mini-node n3" style={{bottom: '8px', left: '50%', transform: 'translateX(-50%)', width: '16px', height: '16px'}}></div>
                </div>
              </div>
              <div className="graph-preview-card">
                <div className="graph-preview-card-title">关联强度</div>
                <div className="graph-preview-card-desc">实体间关联关系的强弱程度可视化</div>
                <div className="graph-preview-mini">
                  <div className="mini-node center"></div>
                  <div className="mini-node n1" style={{width: '20px', height: '20px', opacity: 0.9}}></div>
                  <div className="mini-node n2" style={{width: '16px', height: '16px', opacity: 0.7}}></div>
                  <div className="mini-node n3" style={{width: '12px', height: '12px', opacity: 0.5}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgentList;

