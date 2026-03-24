import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Card,
  Tag,
  Tooltip,
  Dropdown,
  Modal,
  Form,
  Select,
  Tabs,
  message,
} from 'antd';
import {
  SendOutlined,
  PaperClipOutlined,
  GlobalOutlined,
  PlusOutlined,
  MoreOutlined,
  EyeOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import type { Report, ReportTemplate, DataSource } from '@/types/report';
import './style.css';

const { TextArea } = Input;
const { TabPane } = Tabs;

// AI行业分析模板
const reportTemplates: ReportTemplate[] = [
  {
    id: 'industry-analysis',
    name: '行业分析报告',
    description: '全面分析行业发展现状、市场规模、竞争格局和未来趋势',
    icon: '📊',
    category: '行业研究',
  },
  {
    id: 'market-research',
    name: '市场调研报告',
    description: '深入调研市场需求、用户画像、产品定位和营销策略',
    icon: '🔍',
    category: '市场研究',
  },
  {
    id: 'competitor-analysis',
    name: '竞品分析报告',
    description: '系统分析竞争对手的产品、策略、优劣势和市场表现',
    icon: '⚔️',
    category: '竞争分析',
  },
  {
    id: 'trend-forecast',
    name: '趋势预测报告',
    description: '基于数据分析预测行业未来发展趋势和机遇',
    icon: '📈',
    category: '趋势研究',
  },
  {
    id: 'investment-research',
    name: '投资研究报告',
    description: '专业分析投资价值、风险评估和收益预测',
    icon: '💰',
    category: '投资研究',
  },
  {
    id: 'policy-analysis',
    name: '政策分析报告',
    description: '解读行业相关政策法规，分析影响和应对策略',
    icon: '📋',
    category: '政策研究',
  },
  {
    id: 'technology-analysis',
    name: '技术研究报告',
    description: '深入研究前沿技术发展趋势、技术路线和产业化应用前景',
    icon: '🔬',
    category: '技术研究',
  },
  {
    id: 'supply-chain-analysis',
    name: '产业链分析报告',
    description: '全面梳理产业链上下游结构、关键环节和价值分布',
    icon: '🔗',
    category: '产业链研究',
  },
];

// 数据源选项
const dataSources: DataSource[] = [
  {
    id: 'enterprise',
    name: '企业工商数据',
    description: '企业注册信息、股权结构、经营状况等',
    icon: '🏢',
    category: '企业数据',
  },
  {
    id: 'industry',
    name: '行业数据库',
    description: '行业规模、增长率、市场份额等统计数据',
    icon: '📊',
    category: '行业数据',
  },
  {
    id: 'financial',
    name: '财务数据',
    description: '上市公司财报、财务指标、估值数据等',
    icon: '💹',
    category: '财务数据',
  },
  {
    id: 'news',
    name: '新闻资讯',
    description: '行业新闻、政策动态、市场热点等',
    icon: '📰',
    category: '资讯数据',
  },
  {
    id: 'patent',
    name: '专利数据',
    description: '技术专利、研发投入、创新趋势等',
    icon: '🔬',
    category: '技术数据',
  },
  {
    id: 'recruitment',
    name: '招聘数据',
    description: '人才需求、薪资水平、岗位趋势等',
    icon: '👥',
    category: '人才数据',
  },
];

// Mock 报告数据
const mockReports: Report[] = [
  {
    id: '1',
    title: '聚苯乙烯产品技术研究报告',
    description: '深入分析聚苯乙烯产品技术发展趋势、市场应用和竞争格局',
    type: '产品研究',
    cover: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop',
    views: 2800,
    downloads: 1800,
    createdAt: '2024-03-23',
    status: 'completed',
  },
  {
    id: '2',
    title: '中际旭创2025年业绩分析报告',
    description: '全面分析中际旭创2025年业绩表现、财务状况和发展前景',
    type: '企业研究',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    views: 2800,
    downloads: 1800,
    createdAt: '2024-03-23',
    status: 'completed',
  },
  {
    id: '3',
    title: '2026年具身智能行业发展研究报告',
    description: '深入探讨具身智能行业技术发展、应用场景和市场机遇',
    type: '行业研究',
    cover: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    views: 2800,
    downloads: 1800,
    createdAt: '2024-03-23',
    status: 'completed',
  },
];

const ReportHome = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [dataSourceModalVisible, setDataSourceModalVisible] = useState(false);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [form] = Form.useForm();

  // 快速发送
  const handleQuickSend = async () => {
    if (!inputValue.trim()) {
      message.warning('请输入报告主题');
      return;
    }

    setLoading(true);
    // 模拟跳转
    setTimeout(() => {
      setLoading(false);
      navigate('/reports/chat', {
        state: { theme: inputValue, dataSources: selectedDataSources },
      });
    }, 500);
  };

  // 打开新建弹窗
  const handleCreateReport = () => {
    setCreateModalVisible(true);
  };

  // 确认创建
  const handleConfirmCreate = async () => {
    try {
      const values = await form.validateFields();
      setCreateModalVisible(false);
      navigate('/reports/chat', {
        state: {
          title: values.title,
          theme: values.theme,
          template: values.template,
          dataSources: selectedDataSources,
        },
      });
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 选择数据源
  const handleSelectDataSource = (id: string) => {
    setSelectedDataSources(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // 报告卡片操作
  const reportActions = [
    { key: 'view', icon: <EyeOutlined />, label: '查看' },
    { key: 'share', icon: <ShareAltOutlined />, label: '分享' },
    { key: 'download', icon: <DownloadOutlined />, label: '下载' },
  ];

  return (
    <div className="report-home">
      {/* 顶部标题区 */}
      <div className="report-hero">
        <h1 className="report-title">海量行业数据，一键生成专业报告</h1>

        {/* 快速输入框 */}
        <div className="quick-input-wrapper">
          <div className="quick-input-card">
            <TextArea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="请输入报告的主题和需求，输入@引用文件"
              className="quick-input"
              autoSize={{ minRows: 3, maxRows: 6 }}
              onPressEnter={e => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleQuickSend();
                }
              }}
            />
            <div className="quick-input-actions">
              <div className="input-left-actions">
                <Tooltip title="联网搜索">
                  <Button
                    type="text"
                    icon={<GlobalOutlined />}
                    className="action-btn"
                  />
                </Tooltip>
                <Tooltip title="添加数据源">
                  <Button
                    type="text"
                    icon={<DatabaseOutlined />}
                    className="action-btn"
                    onClick={() => setDataSourceModalVisible(true)}
                  >
                    {selectedDataSources.length > 0 && (
                      <span className="data-source-badge">
                        {selectedDataSources.length}
                      </span>
                    )}
                  </Button>
                </Tooltip>
              </div>
              <div className="input-right-actions">
                <Tooltip title="添加附件">
                  <Button
                    type="text"
                    icon={<PaperClipOutlined />}
                    className="action-btn"
                  />
                </Tooltip>
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  loading={loading}
                  onClick={handleQuickSend}
                  className="send-btn"
                >
                  生成报告
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 优质案例 */}
      <div className="report-section">
        <div className="section-header">
          <h2 className="section-title">优质案例</h2>
          <Button type="link" onClick={handleCreateReport}>
            <PlusOutlined /> 新建报告
          </Button>
        </div>
        <div className="report-cards">
          {mockReports.map(report => (
            <Card
              key={report.id}
              className="report-card"
              cover={
                <div className="report-cover">
                  <img src={report.cover} alt={report.title} />
                  <Tag className="report-type-tag">{report.type}</Tag>
                </div>
              }
              actions={[
                <Dropdown
                  key="more"
                  menu={{ items: reportActions }}
                  placement="bottomRight"
                >
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>,
              ]}
            >
              <Card.Meta
                title={report.title}
                description={
                  <div className="report-meta">
                    <div className="report-stats">
                      <span>
                        <EyeOutlined /> {report.views}
                      </span>
                      <span>
                        <DownloadOutlined /> {report.downloads}
                      </span>
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </div>

      {/* 报告模板 */}
      <div className="report-section">
        <h2 className="section-title">AI 行业分析模板</h2>
        <div className="template-grid">
          {reportTemplates.map(template => (
            <Card
              key={template.id}
              className="template-card"
              hoverable
              onClick={() => {
                // 根据模板类型预设内容
                if (template.id === 'industry-analysis') {
                  form.setFieldsValue({
                    template: template.id,
                    title: '2026年人工智能行业深度分析报告',
                    theme: '请生成一份关于AI人工智能行业的深度分析报告，涵盖市场规模、技术趋势、竞争格局、应用场景、投资机遇等多个维度的分析内容。',
                  });
                } else {
                  form.setFieldsValue({ template: template.id });
                }
                setCreateModalVisible(true);
              }}
            >
              <div className="template-icon">{template.icon}</div>
              <h3 className="template-name">{template.name}</h3>
              <p className="template-desc">{template.description}</p>
              <Tag className="template-category">{template.category}</Tag>
            </Card>
          ))}
        </div>
      </div>

      {/* 新建报告弹窗 */}
      <Modal
        title="新建报告"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={handleConfirmCreate}
        width={600}
        okText="确认创建"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="报告标题"
            rules={[{ required: true, message: '请输入报告标题' }]}
          >
            <Input placeholder="请输入标题" maxLength={50} showCount />
          </Form.Item>

          <Form.Item
            name="theme"
            label="报告主题"
            rules={[{ required: true, message: '请描述报告的主题和需求' }]}
          >
            <TextArea
              placeholder="请描述报告的主题和需求"
              maxLength={2000}
              showCount
              autoSize={{ minRows: 4, maxRows: 8 }}
            />
          </Form.Item>

          <Form.Item name="template" label="选择模板">
            <Select placeholder="请选择报告模板">
              {reportTemplates.map(template => (
                <Select.Option key={template.id} value={template.id}>
                  {template.icon} {template.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="已选数据源">
            <div className="selected-data-sources">
              {selectedDataSources.length === 0 ? (
                <span className="no-data-source">未选择数据源</span>
              ) : (
                selectedDataSources.map(id => {
                  const source = dataSources.find(s => s.id === id);
                  return source ? (
                    <Tag
                      key={id}
                      closable
                      onClose={() => handleSelectDataSource(id)}
                    >
                      {source.icon} {source.name}
                    </Tag>
                  ) : null;
                })
              )}
              <Button
                type="dashed"
                size="small"
                icon={<PlusOutlined />}
                onClick={() => setDataSourceModalVisible(true)}
              >
                添加数据源
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* 数据源选择弹窗 */}
      <Modal
        title="选择数据源"
        open={dataSourceModalVisible}
        onCancel={() => setDataSourceModalVisible(false)}
        onOk={() => setDataSourceModalVisible(false)}
        width={700}
        okText="确认"
        cancelText="取消"
      >
        <Tabs defaultActiveKey="all">
          <TabPane tab="全部" key="all">
            <div className="data-source-grid">
              {dataSources.map(source => (
                <Card
                  key={source.id}
                  className={`data-source-card ${
                    selectedDataSources.includes(source.id) ? 'selected' : ''
                  }`}
                  hoverable
                  onClick={() => handleSelectDataSource(source.id)}
                >
                  <div className="data-source-icon">{source.icon}</div>
                  <h4 className="data-source-name">{source.name}</h4>
                  <p className="data-source-desc">{source.description}</p>
                  <Tag size="small">{source.category}</Tag>
                </Card>
              ))}
            </div>
          </TabPane>
          {['企业数据', '行业数据', '财务数据', '资讯数据', '技术数据', '人才数据'].map(
            category => (
              <TabPane tab={category} key={category}>
                <div className="data-source-grid">
                  {dataSources
                    .filter(s => s.category === category)
                    .map(source => (
                      <Card
                        key={source.id}
                        className={`data-source-card ${
                          selectedDataSources.includes(source.id)
                            ? 'selected'
                            : ''
                        }`}
                        hoverable
                        onClick={() => handleSelectDataSource(source.id)}
                      >
                        <div className="data-source-icon">{source.icon}</div>
                        <h4 className="data-source-name">{source.name}</h4>
                        <p className="data-source-desc">
                          {source.description}
                        </p>
                      </Card>
                    ))}
                </div>
              </TabPane>
            )
          )}
        </Tabs>
      </Modal>
    </div>
  );
};

export default ReportHome;
