import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Empty,
  Spin,
  Tag,
  Avatar,
  Select,
} from 'antd';
import {
  LeftOutlined,
  SendOutlined,
  BugOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@/stores';
import { mockSkills, mockDebugSessions } from '@/utils/mockData';
import type { ChatMessage, DebugLog } from '@/types';
import './style.css';

const { TextArea } = Input;

// 聚乙烯（PE）市场分析报告样例数据
const sampleReportData = {
  thinking: `1. 确定报告类型：数据分析报告
2. 分析需求：PE市场分析，需要价格走势、供需分析、未来预测
3. 数据来源：石化行业数据库、期货市场价格数据
4. 报告结构：市场概况→价格走势→供需分析→未来预测→投资建议`,
  execSteps: `✓ 调用 data_analysis_report.py 加载PE价格数据
✓ 生成价格趋势折线图和供需对比柱状图
✓ 整合市场分析文本
✓ 生成Word格式报告`,
  output: `📄 《2024年Q3聚乙烯（PE）市场分析报告.docx》已生成

【报告页数】28页
【包含图表】12个（价格趋势图、供需对比图、产能分布图等）

【核心数据】
• Q3 PE价格先涨后跌，均价较Q2上涨5.3%
• 预计Q4维持震荡格局
• 产能利用率：82%
• 库存水平：中等偏上

【投资建议】
建议关注石化企业库存变化，把握低位补库机会。`,
  fullReport: `# 2024年第三季度聚乙烯（PE）市场分析报告

## 一、市场概况

### 1.1 行业背景
聚乙烯（PE）是全球产量最大的塑料品种，广泛应用于包装、建筑、农业、电子等领域。2024年第三季度，国内PE市场呈现先涨后跌的震荡走势。

### 1.2 报告范围
- 时间范围：2024年7月-9月
- 产品范围：LLDPE、LDPE、HDPE三大品种
- 区域范围：华东、华南、华北主要消费市场

## 二、价格走势分析

### 2.1 季度价格走势
2024年第三季度PE均价为8,850元/吨，较第二季度上涨5.3%。

| 月份 | LLDPE均价 | 环比变化 | LDPE均价 | 环比变化 | HDPE均价 | 环比变化 |
|------|-----------|----------|----------|----------|----------|----------|
| 7月  | 8,650     | +2.1%    | 9,200    | +1.8%    | 8,400    | +2.5%    |
| 8月  | 8,920     | +3.1%    | 9,450    | +2.7%    | 8,680    | +3.3%    |
| 9月  | 8,780     | -1.6%    | 9,280    | -1.8%    | 8,520    | -1.8%    |

### 2.2 价格影响因素
1. **原料成本**：乙烯价格Q3均价7,200元/吨，支撑PE价格
2. **供需关系**：新增产能释放，供应端压力增大
3. **下游需求**：农膜旺季支撑，包装需求平稳
4. **宏观环境**：原油价格波动，影响市场心态

## 三、供需分析

### 3.1 供应端
2024年第三季度国内PE产量约685万吨，同比增长8.2%。

**主要生产企业开工情况：**
- 中石化：平均开工率85%
- 中石油：平均开工率82%
- 煤化工企业：平均开工率78%

**新增产能：**
- 浙江石化二期：40万吨/年HDPE装置于8月投产
- 盛虹炼化：30万吨/年LLDPE装置于9月投产

### 3.2 需求端
第三季度PE表观消费量约720万吨，同比增长6.5%。

**下游消费结构：**
- 包装膜：占比42%，需求平稳
- 农膜：占比18%，旺季支撑明显
- 管材：占比15%，基建需求带动
- 注塑：占比12%，家电需求一般
- 其他：占比13%

### 3.3 进出口情况
- 进口量：185万吨，同比下降3.2%
- 出口量：28万吨，同比增长15.6%
- 进口依存度：25.7%，同比下降2.1个百分点

## 四、库存分析

### 4.1 社会库存
截至9月底，PE社会库存约85万吨，处于中等偏高水平。

### 4.2 石化库存
两油库存维持在65-75万吨区间，库存压力可控。

## 五、成本利润分析

### 5.1 生产成本
- 油制PE：平均成本7,850元/吨
- 煤制PE：平均成本7,200元/吨
- 外采乙烯制：平均成本8,100元/吨

### 5.2 行业利润
- 油制利润：约1,000元/吨
- 煤制利润：约1,650元/吨
- 整体盈利水平较去年同期下降约15%

## 六、未来预测

### 6.1 四季度展望
预计2024年第四季度PE市场将维持震荡格局：
- 价格区间：8,500-9,200元/吨
- 均价预测：约8,800元/吨，环比基本持平

### 6.2 影响因素分析
**利好因素：**
1. 农膜需求进入传统旺季
2. 包装需求年底有望提升
3. 进口量预计维持低位

**利空因素：**
1. 新增产能持续释放
2. 原油价格存在不确定性
3. 宏观经济增速放缓

## 七、投资建议

### 7.1 对生产企业
1. 优化产品结构，提高差异化产品比例
2. 加强成本管控，提升竞争力
3. 关注库存管理，避免积压

### 7.2 对下游企业
1. 把握低位补库机会，降低采购成本
2. 与供应商建立长期合作关系
3. 关注替代材料发展动态

### 7.3 对投资者
1. 关注具有成本优势的煤制PE企业
2. 布局下游高附加值应用领域
3. 警惕产能扩张带来的价格压力

## 八、风险提示

1. 原油价格大幅波动风险
2. 新增产能集中投放风险
3. 下游需求不及预期风险
4. 宏观经济下行风险
5. 环保政策趋严风险

---
**报告编制单位：** 太擎AI研究院  
**报告日期：** 2024年10月15日  
**免责声明：** 本报告仅供参考，不构成投资建议`
};

const SkillDebug = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [logs, setLogs] = useState<DebugLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [showReport, setShowReport] = useState(true);
  
  const currentSkill = useAppStore((state) => state.currentSkill);
  const setCurrentSkill = useAppStore((state) => state.setCurrentSkill);

  useEffect(() => {
    const skill = mockSkills.find((s) => s.id === skillId);
    if (skill) {
      setCurrentSkill(skill);
    }
    
    // 加载该技能的所有调试会话记录
    const skillSessions = mockDebugSessions.filter((s) => s.skillId === skillId);
    if (skillSessions.length > 0) {
      setMessages(skillSessions[sessionIndex]?.messages || []);
      setLogs(skillSessions[sessionIndex]?.logs || []);
    }
  }, [skillId, sessionIndex]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate(`/skills/${skillId}`);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !currentSkill) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      agentId: 'debug',
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setLoading(true);

    // 添加日志
    const newLog: DebugLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      message: `用户输入: ${inputValue}`,
    };
    setLogs((prev) => [...prev, newLog]);

    // 模拟AI回复 - 使用PE市场分析样例数据
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        agentId: 'debug',
        role: 'assistant',
        content: `【思考过程】\n${sampleReportData.thinking}\n\n【执行步骤】\n${sampleReportData.execSteps}\n\n【报告输出】\n${sampleReportData.output}`,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setShowReport(true);
      
      // 添加执行日志
      const execLog: DebugLog = {
        id: (Date.now() + 2).toString(),
        timestamp: new Date().toLocaleTimeString(),
        level: 'success',
        message: '报告生成完成',
      };
      setLogs((prev) => [...prev, execLog]);
      
      setLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error':
        return '#ff4d4f';
      case 'warn':
        return '#faad14';
      case 'success':
        return '#52c41a';
      default:
        return '#1890ff';
    }
  };

  const parseMessageContent = (content: string) => {
    const thinkingMatch = content.match(/【思考过程】([\s\S]*?)(?=【|$)/);
    const outputMatch = content.match(/【报告输出】([\s\S]*?)(?=【|$)/);
    const execMatch = content.match(/【执行步骤】([\s\S]*?)(?=【|$)/);
    
    return {
      thinking: thinkingMatch ? thinkingMatch[1].trim() : null,
      execSteps: execMatch ? execMatch[1].trim() : null,
      output: outputMatch ? outputMatch[1].trim() : null,
      raw: content
    };
  };

  const renderThinkingSteps = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines.map((line, index) => (
      <div key={index} className="thinking-step">
        <div className="step-number">{index + 1}</div>
        <div className="step-content">{line.replace(/^\d+\.\s*/, '')}</div>
      </div>
    ));
  };

  const renderExecSteps = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines.map((line, index) => (
      <div key={index} className="exec-step">
        <CheckCircleOutlined className="step-icon" />
        <span className="step-text">{line.replace(/^✓\s*/, '')}</span>
      </div>
    ));
  };

  if (!currentSkill) {
    return (
      <div className="skill-debug-page">
        <Spin size="large" />
      </div>
    );
  }

  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop();
  const parsedContent = lastAssistantMessage ? parseMessageContent(lastAssistantMessage.content) : null;

  return (
    <div className="skill-debug-page">
      {/* Header */}
      <div className="debug-header">
        <div className="header-left">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={handleBack}
            className="back-btn"
          >
            返回
          </Button>
          <div className="skill-info">
            <BugOutlined className="debug-icon" />
            <span className="skill-name">调试: {currentSkill.displayName}</span>
          </div>
        </div>
        <div className="header-right">
          {(() => {
            const skillSessions = mockDebugSessions.filter((s) => s.skillId === skillId);
            if (skillSessions.length > 1) {
              return (
                <div className="session-selector">
                  <span className="session-label">会话记录:</span>
                  <Select
                    value={sessionIndex}
                    onChange={(value) => setSessionIndex(value)}
                    style={{ width: 180 }}
                    size="small"
                  >
                    {skillSessions.map((session, index) => (
                      <Select.Option key={index} value={index}>
                        会话 {index + 1} - {session.createdAt}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              );
            }
            return null;
          })()}
          <Button type="primary" icon={<PlayCircleOutlined />} className="run-btn">
            运行
          </Button>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="debug-content">
        {/* Left - Chat */}
        <div className="chat-section">
          <div className="section-header-title">
            <ClockCircleOutlined />
            <span>对话</span>
          </div>
          <div className="chat-messages">
            {messages.length === 0 ? (
              <Empty description="开始调试对话" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message-item ${message.role}`}
                  >
                    <div className="message-avatar">
                      {message.role === 'assistant' ? (
                        <Avatar style={{ backgroundColor: '#d4a574' }}>
                          AI
                        </Avatar>
                      ) : (
                        <Avatar style={{ backgroundColor: '#1890ff' }}>我</Avatar>
                      )}
                    </div>
                    <div className="message-content">
                      <div className="message-bubble">
                        {message.role === 'user' ? (
                          message.content
                        ) : (
                          <div className="ai-response">
                            已生成报告，请查看右侧报告面板
                          </div>
                        )}
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
                      <Avatar style={{ backgroundColor: '#d4a574' }}>AI</Avatar>
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
          <div className="chat-input-area">
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="请输入调试指令..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="debug-input"
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              disabled={!inputValue.trim() || loading}
              className="send-btn"
            >
              发送
            </Button>
          </div>
        </div>

        {/* Middle - Thinking Process */}
        <div className="thinking-section-panel">
          <div className="section-header-title">
            <BugOutlined />
            <span>思考过程</span>
          </div>
          <div className="thinking-content">
            {parsedContent?.thinking ? (
              <>
                <div className="thinking-block">
                  <div className="block-title">💭 分析思路</div>
                  <div className="block-body">
                    {renderThinkingSteps(parsedContent.thinking)}
                  </div>
                </div>
                {parsedContent.execSteps && (
                  <div className="thinking-block">
                    <div className="block-title">⚙️ 执行步骤</div>
                    <div className="block-body">
                      {renderExecSteps(parsedContent.execSteps)}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Empty description="等待输入..." image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>

        {/* Right - Report Output */}
        <div className="report-section">
          <div className="section-header-title">
            <FileTextOutlined />
            <span>报告输出</span>
          </div>
          <div className="report-content">
            {showReport ? (
              <div className="report-document">
                <div className="report-header">
                  <h1>2024年第三季度聚乙烯（PE）市场分析报告</h1>
                  <div className="report-meta">
                    <span>生成时间：2024-10-15 09:30:25</span>
                    <span>报告页数：28页</span>
                    <span>包含图表：12个</span>
                    <Tag color="success">已完成</Tag>
                  </div>
                </div>
                <div className="report-body">
                  {/* 核心数据摘要 */}
                  <div className="report-summary">
                    <h3>📊 核心数据摘要</h3>
                    <div className="summary-cards">
                      <div className="summary-card">
                        <div className="card-label">Q3均价</div>
                        <div className="card-value">8,850</div>
                        <div className="card-unit">元/吨</div>
                      </div>
                      <div className="summary-card">
                        <div className="card-label">环比涨幅</div>
                        <div className="card-value up">+5.3%</div>
                        <div className="card-unit">vs Q2</div>
                      </div>
                      <div className="summary-card">
                        <div className="card-label">产能利用率</div>
                        <div className="card-value">82%</div>
                        <div className="card-unit">行业平均</div>
                      </div>
                      <div className="summary-card">
                        <div className="card-label">产量</div>
                        <div className="card-value">685</div>
                        <div className="card-unit">万吨</div>
                      </div>
                    </div>
                  </div>

                  {/* 价格走势图表数据 */}
                  <div className="report-chart-section">
                    <h3>📈 价格走势分析</h3>
                    <div className="chart-container">
                      <div className="chart-title">2024年Q3 PE价格走势（元/吨）</div>
                      <div className="line-chart">
                        <svg viewBox="0 0 400 180" className="line-chart-svg">
                          {/* 网格线 */}
                          <line x1="40" y1="20" x2="360" y2="20" stroke="#f0f0f0" strokeWidth="1"/>
                          <line x1="40" y1="60" x2="360" y2="60" stroke="#f0f0f0" strokeWidth="1"/>
                          <line x1="40" y1="100" x2="360" y2="100" stroke="#f0f0f0" strokeWidth="1"/>
                          <line x1="40" y1="140" x2="360" y2="140" stroke="#f0f0f0" strokeWidth="1"/>
                          
                          {/* Y轴标签 */}
                          <text x="30" y="25" textAnchor="end" fontSize="10" fill="#8c8c8c">9,200</text>
                          <text x="30" y="65" textAnchor="end" fontSize="10" fill="#8c8c8c">9,000</text>
                          <text x="30" y="105" textAnchor="end" fontSize="10" fill="#8c8c8c">8,800</text>
                          <text x="30" y="145" textAnchor="end" fontSize="10" fill="#8c8c8c">8,600</text>
                          
                          {/* 折线 */}
                          <polyline
                            points="80,75 200,35 320,55"
                            fill="none"
                            stroke="#d4a574"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          
                          {/* 数据点 */}
                          <circle cx="80" cy="75" r="6" fill="#d4a574" stroke="#fff" strokeWidth="2"/>
                          <circle cx="200" cy="35" r="6" fill="#ff4d4f" stroke="#fff" strokeWidth="2"/>
                          <circle cx="320" cy="55" r="6" fill="#d4a574" stroke="#fff" strokeWidth="2"/>
                          
                          {/* 数据标签 */}
                          <text x="80" y="95" textAnchor="middle" fontSize="11" fill="#595959" fontWeight="500">8,650</text>
                          <text x="200" y="20" textAnchor="middle" fontSize="11" fill="#ff4d4f" fontWeight="600">8,920</text>
                          <text x="320" y="80" textAnchor="middle" fontSize="11" fill="#595959" fontWeight="500">8,780</text>
                          
                          {/* X轴 */}
                          <line x1="40" y1="140" x2="360" y2="140" stroke="#e8e8e8" strokeWidth="2"/>
                          
                          {/* X轴标签 */}
                          <text x="80" y="160" textAnchor="middle" fontSize="12" fill="#8c8c8c">7月</text>
                          <text x="200" y="160" textAnchor="middle" fontSize="12" fill="#8c8c8c">8月</text>
                          <text x="320" y="160" textAnchor="middle" fontSize="12" fill="#8c8c8c">9月</text>
                        </svg>
                      </div>
                      <div className="chart-legend">
                        <span className="legend-item"><span className="legend-dot-line"></span>PE价格走势</span>
                        <span className="legend-item" style={{marginLeft: '20px'}}><span className="legend-dot-peak"></span>季度高点</span>
                      </div>
                    </div>
                    <div className="chart-analysis">
                      <p><strong>价格走势分析：</strong>7-8月受成本支撑和需求回暖影响，PE价格持续上涨，8月达到季度高点8,920元/吨；9月随着新增产能释放，价格出现回调至8,780元/吨。整体呈现"先涨后跌"的震荡走势。</p>
                    </div>
                  </div>

                  {/* 供需平衡表 */}
                  <div className="report-table-section">
                    <h3>📋 供需平衡表（2024年Q3）</h3>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>指标</th>
                          <th>数值</th>
                          <th>同比变化</th>
                          <th>环比变化</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>国内产量</td>
                          <td>685万吨</td>
                          <td className="up">+8.2%</td>
                          <td className="up">+3.5%</td>
                        </tr>
                        <tr>
                          <td>进口量</td>
                          <td>185万吨</td>
                          <td className="down">-3.2%</td>
                          <td className="down">-1.8%</td>
                        </tr>
                        <tr>
                          <td>出口量</td>
                          <td>28万吨</td>
                          <td className="up">+15.6%</td>
                          <td className="up">+8.2%</td>
                        </tr>
                        <tr>
                          <td>表观消费量</td>
                          <td>720万吨</td>
                          <td className="up">+6.5%</td>
                          <td className="up">+2.1%</td>
                        </tr>
                        <tr>
                          <td>期末库存</td>
                          <td>85万吨</td>
                          <td className="up">+12.3%</td>
                          <td className="up">+5.6%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 下游需求结构 */}
                  <div className="report-chart-section">
                    <h3>🥧 下游需求结构</h3>
                    <div className="pie-chart-container">
                      <div className="pie-chart">
                        <div className="pie-segment" style={{background: '#d4a574', flex: 42}}>包装膜 42%</div>
                        <div className="pie-segment" style={{background: '#1890ff', flex: 18}}>农膜 18%</div>
                        <div className="pie-segment" style={{background: '#52c41a', flex: 15}}>管材 15%</div>
                        <div className="pie-segment" style={{background: '#faad14', flex: 12}}>注塑 12%</div>
                        <div className="pie-segment" style={{background: '#8c8c8c', flex: 13}}>其他 13%</div>
                      </div>
                      <div className="pie-legend">
                        <div className="legend-row">
                          <span className="legend-dot" style={{background: '#d4a574'}}></span>
                          <span>包装膜 42%</span>
                          <span className="legend-desc">需求平稳，占比最大</span>
                        </div>
                        <div className="legend-row">
                          <span className="legend-dot" style={{background: '#1890ff'}}></span>
                          <span>农膜 18%</span>
                          <span className="legend-desc">旺季支撑明显</span>
                        </div>
                        <div className="legend-row">
                          <span className="legend-dot" style={{background: '#52c41a'}}></span>
                          <span>管材 15%</span>
                          <span className="legend-desc">基建需求带动</span>
                        </div>
                        <div className="legend-row">
                          <span className="legend-dot" style={{background: '#faad14'}}></span>
                          <span>注塑 12%</span>
                          <span className="legend-desc">家电需求一般</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 成本利润分析 */}
                  <div className="report-table-section">
                    <h3>💰 成本利润分析（2024年Q3）</h3>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>工艺路线</th>
                          <th>生产成本</th>
                          <th>平均售价</th>
                          <th>吨利润</th>
                          <th>利润率</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>油制PE</td>
                          <td>7,850元/吨</td>
                          <td>8,850元/吨</td>
                          <td className="profit">1,000元/吨</td>
                          <td className="profit">12.7%</td>
                        </tr>
                        <tr>
                          <td>煤制PE</td>
                          <td>7,200元/吨</td>
                          <td>8,850元/吨</td>
                          <td className="profit high">1,650元/吨</td>
                          <td className="profit high">22.9%</td>
                        </tr>
                        <tr>
                          <td>外采乙烯制</td>
                          <td>8,100元/吨</td>
                          <td>8,850元/吨</td>
                          <td className="profit low">750元/吨</td>
                          <td className="profit low">9.3%</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="table-note">
                      <p>注：煤制PE成本优势明显，利润空间最大；油制PE利润较去年同期下降约15%。</p>
                    </div>
                  </div>

                  {/* 主要生产企业开工率 */}
                  <div className="report-chart-section">
                    <h3>🏭 主要生产企业开工率</h3>
                    <div className="progress-bars">
                      <div className="progress-item">
                        <span className="progress-label">中石化</span>
                        <div className="progress-bar-bg">
                          <div className="progress-bar" style={{width: '85%'}}></div>
                        </div>
                        <span className="progress-value">85%</span>
                      </div>
                      <div className="progress-item">
                        <span className="progress-label">中石油</span>
                        <div className="progress-bar-bg">
                          <div className="progress-bar" style={{width: '82%'}}></div>
                        </div>
                        <span className="progress-value">82%</span>
                      </div>
                      <div className="progress-item">
                        <span className="progress-label">煤化工企业</span>
                        <div className="progress-bar-bg">
                          <div className="progress-bar" style={{width: '78%'}}></div>
                        </div>
                        <span className="progress-value">78%</span>
                      </div>
                      <div className="progress-item">
                        <span className="progress-label">行业平均</span>
                        <div className="progress-bar-bg">
                          <div className="progress-bar average" style={{width: '82%'}}></div>
                        </div>
                        <span className="progress-value">82%</span>
                      </div>
                    </div>
                  </div>

                  {/* 市场分析 */}
                  <div className="report-section-content">
                    <h3>一、市场概况</h3>
                    <p>聚乙烯（PE）是全球产量最大的塑料品种，广泛应用于包装、建筑、农业、电子等领域。2024年第三季度，国内PE市场呈现先涨后跌的震荡走势。本季度新增产能集中释放，浙江石化二期40万吨/年HDPE装置于8月投产，盛虹炼化30万吨/年LLDPE装置于9月投产，对市场供应形成一定压力。</p>
                    
                    <h3>二、价格走势分析</h3>
                    <p>2024年第三季度PE均价为8,850元/吨，较第二季度上涨5.3%。价格走势呈现明显的阶段性特征：</p>
                    <p><strong>7月：</strong>价格稳步上涨，月均8,650元/吨，环比上涨2.1%。主要受原料乙烯价格上涨支撑，同时下游农膜需求进入传统旺季。</p>
                    <p><strong>8月：</strong>价格达到季度高点8,920元/吨，环比上涨3.1%。市场供需偏紧，石化企业库存处于低位，贸易商积极补库。</p>
                    <p><strong>9月：</strong>价格回调至8,780元/吨，环比下降1.6%。新增产能释放，供应压力增大，同时下游需求边际走弱。</p>
                    
                    <h3>三、供需分析</h3>
                    <p><strong>供应端：</strong>第三季度国内PE产量约685万吨，同比增长8.2%，环比增长3.5%。新增产能集中投放是产量增长的主要原因。进口量185万吨，同比下降3.2%，国产替代效应明显。</p>
                    <p><strong>需求端：</strong>第三季度PE表观消费量约720万吨，同比增长6.5%。下游消费结构保持稳定，包装膜占比42%，农膜占比18%，管材占比15%。农膜需求旺季支撑明显，但包装需求增长放缓。</p>
                    
                    <h3>四、投资建议</h3>
                    <p><strong>短期展望（Q4）：</strong>预计2024年第四季度PE市场将维持震荡格局，价格区间8,500-9,200元/吨。利好因素包括农膜需求旺季、包装需求年底提升；利空因素包括新增产能持续释放、原油价格不确定性。</p>
                    <p><strong>投资策略：</strong></p>
                    <p>1. <strong>生产企业：</strong>优化产品结构，提高差异化产品比例；加强成本管控，关注煤制PE成本优势。</p>
                    <p>2. <strong>下游企业：</strong>把握低位补库机会，建议8,600元/吨以下分批采购；与供应商建立长期合作关系。</p>
                    <p>3. <strong>投资者：</strong>关注具有成本优势的煤制PE企业，如宝丰能源、中煤能源；警惕产能扩张带来的价格压力。</p>
                    
                    <h3>五、风险提示</h3>
                    <p>1. 原油价格大幅波动风险：原油每涨跌10美元/桶，PE成本影响约800-1,000元/吨。</p>
                    <p>2. 新增产能集中投放风险：2024年四季度至2025年仍有超过200万吨产能计划投产。</p>
                    <p>3. 下游需求不及预期风险：宏观经济增速放缓可能影响包装、家电等下游需求。</p>
                    <p>4. 环保政策趋严风险：秋冬季环保限产可能影响部分下游企业开工。</p>
                  </div>

                  {/* 报告底部 */}
                  <div className="report-footer">
                    <div className="footer-line"></div>
                    <p className="footer-text">
                      <strong>报告编制单位：</strong>太擎AI研究院石化行业研究中心<br/>
                      <strong>报告日期：</strong>2024年10月15日<br/>
                      <strong>数据来源：</strong>国家统计局、海关总署、石化联合会、Wind资讯<br/>
                      <strong>免责声明：</strong>本报告仅供参考，不构成投资建议。投资者据此操作，风险自担。
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Empty description="报告将在此显示" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDebug;
