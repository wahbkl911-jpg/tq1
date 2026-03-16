import { Card, Row, Col, DatePicker, Button } from 'antd';
import {
  TeamOutlined,
  MessageOutlined,
  ArrowRightOutlined,
  GlobalOutlined,
  RobotOutlined,
  CustomerServiceOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import './style.css';

const { RangePicker } = DatePicker;

// 近一周问答趋势数据
const trendData = [
  { date: '03-04', count: 320, users: 45 },
  { date: '03-05', count: 180, users: 32 },
  { date: '03-06', count: 450, users: 58 },
  { date: '03-07', count: 280, users: 38 },
  { date: '03-08', count: 520, users: 72 },
  { date: '03-09', count: 380, users: 55 },
  { date: '03-10', count: 290, users: 42 },
];

// 部门问答次数数据
const departmentData = [
  { name: '杭州中粮包装有限公司', value: 708, color: '#5470c6' },
  { name: '研发部门', value: 171, color: '#91cc75' },
  { name: '销售人员', value: 105, color: '#fac858' },
  { name: '产品', value: 89, color: '#ee6666' },
  { name: '市场', value: 77, color: '#73c0de' },
  { name: '其他', value: 66, color: '#3ba272' },
];

// AI助理问答次数数据
const aiAssistantData = [
  { name: '大模型', value: 213, color: '#5470c6' },
  { name: '电商大模型', value: 195, color: '#91cc75' },
  { name: '招商大模型', value: 175, color: '#fac858' },
  { name: '开发类AI', value: 134, color: '#ee6666' },
  { name: '客户管理', value: 119, color: '#73c0de' },
  { name: '其他', value: 105, color: '#3ba272' },
];

// 猜你想问数据
const suggestedQuestions = [
  { icon: <FileTextOutlined />, text: '商业版介绍有什么', color: '#1890ff' },
  { icon: <GlobalOutlined />, text: '广州市生产白酒的企业有哪些', color: '#52c41a' },
  { icon: <ShoppingOutlined />, text: '现在在内蒙古，我需要采购羊肉的企业，以及提供联系方式', color: '#faad14' },
  { icon: <CustomerServiceOutlined />, text: '我想找武汉市服装批发商联系方式', color: '#722ed1' },
  { icon: <ThunderboltOutlined />, text: '请提供26年成立的公司，和它们的成立日期', color: '#eb2f96' },
  { icon: <BarChartOutlined />, text: '广州做家具门窗的门店有哪些', color: '#13c2c2' },
  { icon: <RobotOutlined />, text: '我是做装修贷款的，我的潜在客户在哪里？', color: '#f5222d' },
  { icon: <TeamOutlined />, text: '帮我找下广州比较大的化妆品公司', color: '#fa8c16' },
  { icon: <MessageOutlined />, text: '今天拜访的客户有哪些', color: '#2f4554' },
  { icon: <FileTextOutlined />, text: '上班时间', color: '#1890ff' },
  { icon: <GlobalOutlined />, text: '帮我找一下晋中市煤炭加工的企业并购联系方式', color: '#52c41a' },
  { icon: <ShoppingOutlined />, text: '东莞市有哪些有选址意向的电子信息企业？', color: '#faad14' },
];

const Home = () => {
  return (
    <div className="home-page">
      {/* 头部标题和筛选 */}
      <div className="home-header">
        <div className="header-left">
          <h1 className="page-title">问答概览</h1>
        </div>
        <div className="header-right">
          <RangePicker className="date-picker" />
        </div>
      </div>

      {/* 统计卡片区域 */}
      <Row gutter={16} className="stats-row">
        <Col span={8}>
          <Card className="stat-card today-card">
            <div className="stat-header">
              <span className="stat-label">今日</span>
            </div>
            <Row gutter={24}>
              <Col span={12}>
                <div className="stat-value">83</div>
                <div className="stat-sub-label">总次数</div>
              </Col>
              <Col span={12}>
                <div className="stat-value">2</div>
                <div className="stat-sub-label">总人数</div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="stat-card period-card">
            <div className="stat-header">
              <span className="stat-label">近30天</span>
            </div>
            <Row gutter={24}>
              <Col span={12}>
                <div className="stat-value">2,556</div>
                <div className="stat-sub-label">总次数</div>
              </Col>
              <Col span={12}>
                <div className="stat-value">17</div>
                <div className="stat-sub-label">总人数</div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="stat-card pending-card">
            <div className="stat-header flex-between">
              <span className="stat-label">待优化回答</span>
              <Button type="link" className="view-all-btn">
                查看明细 <ArrowRightOutlined />
              </Button>
            </div>
            <Row gutter={24}>
              <Col span={12}>
                <div className="stat-value warning">20</div>
                <div className="stat-sub-label">待优化</div>
              </Col>
              <Col span={12}>
                <div className="stat-value error">22</div>
                <div className="stat-sub-label">反馈数</div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={16} className="charts-row">
        {/* 近一周问答趋势 */}
        <Col span={8}>
          <Card
            title="近一周问答趋势"
            className="chart-card"
            extra={
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="dot blue"></span>人数
                </span>
                <span className="legend-item">
                  <span className="dot green"></span>次数
                </span>
              </div>
            }
          >
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#91cc75" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* 近一周部门问答次数 */}
        <Col span={8}>
          <Card title="近一周部门问答次数" className="chart-card">
            <div className="chart-container pie-chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {departmentData.map((item, index) => (
                  <div key={index} className="pie-legend-item">
                    <span className="dot" style={{ backgroundColor: item.color }}></span>
                    <span className="name">{item.name}</span>
                    <span className="value">{item.value}({((item.value / 1206) * 100).toFixed(1)}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* 近一周AI助理问答次数 */}
        <Col span={8}>
          <Card title="近一周AI助理问答次数" className="chart-card">
            <div className="chart-container pie-chart-container">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={aiAssistantData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {aiAssistantData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {aiAssistantData.map((item, index) => (
                  <div key={index} className="pie-legend-item">
                    <span className="dot" style={{ backgroundColor: item.color }}></span>
                    <span className="name">{item.name}</span>
                    <span className="value">{item.value}({((item.value / 941) * 100).toFixed(1)}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 猜你想问区域 */}
      <Card title="猜你想问" className="questions-card">
        <Row gutter={[16, 16]}>
          {suggestedQuestions.map((item, index) => (
            <Col span={8} key={index}>
              <div className="question-item">
                <span className="question-icon" style={{ color: item.color }}>
                  {item.icon}
                </span>
                <span className="question-text">{item.text}</span>
                <ArrowRightOutlined className="question-arrow" />
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default Home;
