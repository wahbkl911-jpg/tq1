import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Card,
  Avatar,
  Typography,
  Tag,
  Spin,
  Tabs,
  Table,
  Statistic,
  Row,
  Col,
} from 'antd';
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import type { Report, ReportContent, ReportMessage } from '@/types/report';
import './style.css';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

// AI行业深度分析报告预设内容
const aiIndustryReportContent: ReportContent = {
  cover: {
    title: '2026年人工智能行业深度分析报告',
    subtitle: 'AI技术发展、市场格局与投资机遇全景解读',
    publishDate: '2026年3月',
    researchInstitution: '太擎AI研究院',
    backgroundImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
  },
  toc: [
    { id: '1', title: '执行摘要', page: 1, level: 1 },
    { id: '2', title: '行业概述与发展历程', page: 2, level: 1 },
    { id: '2-1', title: '2.1 AI技术演进脉络', page: 2, level: 2 },
    { id: '2-2', title: '2.2 行业发展阶段', page: 3, level: 2 },
    { id: '3', title: '市场规模与增长趋势', page: 4, level: 1 },
    { id: '3-1', title: '3.1 全球市场规模', page: 4, level: 2 },
    { id: '3-2', title: '3.2 中国市场分析', page: 5, level: 2 },
    { id: '4', title: '技术发展趋势分析', page: 6, level: 1 },
    { id: '4-1', title: '4.1 大语言模型发展', page: 6, level: 2 },
    { id: '4-2', title: '4.2 多模态AI技术', page: 7, level: 2 },
    { id: '4-3', title: '4.3 AI Agent智能体', page: 8, level: 2 },
    { id: '5', title: '竞争格局分析', page: 9, level: 1 },
    { id: '5-1', title: '5.1 国际巨头布局', page: 9, level: 2 },
    { id: '5-2', title: '5.2 国内厂商竞争', page: 10, level: 2 },
    { id: '6', title: '应用场景与商业化', page: 11, level: 1 },
    { id: '7', title: '投资机遇与风险提示', page: 13, level: 1 },
    { id: '8', title: '未来展望', page: 14, level: 1 },
  ],
  sections: [
    {
      id: '1',
      title: '执行摘要',
      content: `
## 核心观点

人工智能行业正迎来历史性发展机遇。2025-2026年，以大语言模型为核心的生成式AI技术实现突破性进展，推动行业进入规模化应用新阶段。

### 关键数据
- **全球AI市场规模**：预计2026年达到$1,200亿美元，年复合增长率达38.1%
- **中国AI市场规模**：预计2026年突破人民币5,000亿元，占全球市场25%
- **企业采用率**：全球超过60%的企业已将AI技术纳入核心业务流程
- **投资热度**：2025年全球AI领域融资总额超过$800亿美元

### 主要结论
1. **技术突破**：大语言模型能力持续跃升，多模态融合成为主流方向
2. **应用爆发**：AI Agent智能体引领新一轮应用创新浪潮
3. **竞争加剧**：国际科技巨头与新兴独角兽展开全方位竞争
4. **商业化加速**：从技术研发向产业应用转型，商业模式日趋成熟
      `,
    },
    {
      id: '2',
      title: '行业概述与发展历程',
      content: `
## 2.1 AI技术演进脉络

人工智能发展历经三次浪潮，当前正处于以深度学习和大模型为核心的第三次浪潮高峰期。

### 技术演进阶段

**第一阶段（1956-1980）：符号主义AI**
- 基于逻辑推理和知识表示
- 代表性成果：专家系统、逻辑推理机
- 局限：知识获取瓶颈、计算能力限制

**第二阶段（1980-2010）：机器学习兴起**
- 统计学习方法主导
- 代表性技术：SVM、随机森林、早期神经网络
- 突破：数据驱动范式确立

**第三阶段（2010至今）：深度学习时代**
- 2012年：AlexNet开启深度学习革命
- 2017年：Transformer架构提出，奠定大模型基础
- 2022年：ChatGPT发布，生成式AI爆发
- 2025-2026年：多模态大模型与AI Agent成为主流

## 2.2 行业发展阶段

| 阶段 | 时间 | 特征 | 代表事件 |
|------|------|------|----------|
| 萌芽期 | 1956-1980 | 理论奠基 | 达特茅斯会议 |
| 第一次低谷 | 1980-1990 | 期望落空 | 专家系统衰退 |
| 复苏期 | 1990-2010 | 机器学习 | IBM深蓝 |
| 爆发期 | 2010-2020 | 深度学习 | AlphaGo、ImageNet |
| 应用期 | 2020-2025 | 产业落地 | GPT-3、BERT |
| 普及期 | 2025至今 | 全面渗透 | ChatGPT、AI Agent |
      `,
    },
    {
      id: '3',
      title: '市场规模与增长趋势',
      content: `
## 3.1 全球市场规模

全球人工智能市场呈现高速增长态势，各细分领域均实现显著扩张。

### 市场规模预测（单位：亿美元）

| 细分领域 | 2024年 | 2025年 | 2026年 | CAGR |
|----------|--------|--------|--------|------|
| 生成式AI | 450 | 680 | 980 | 47.5% |
| 机器学习平台 | 280 | 350 | 430 | 24.0% |
| 计算机视觉 | 220 | 280 | 350 | 26.2% |
| 自然语言处理 | 180 | 250 | 340 | 37.4% |
| AI芯片 | 650 | 850 | 1,100 | 30.2% |
| **总计** | **1,780** | **2,410** | **3,200** | **34.0%** |

### 区域市场分布
- **北美**：占比42%，技术领先，应用成熟
- **亚太**：占比35%，增长最快，中国市场主导
- **欧洲**：占比18%，监管严格，注重伦理
- **其他**：占比5%，新兴市场潜力巨大

## 3.2 中国市场分析

中国AI市场保持高速增长，政策支持与市场需求双轮驱动。

### 发展特点
1. **政策红利**："人工智能+"行动计划全面推进
2. **场景丰富**：庞大人口基数带来多样化应用场景
3. **数据优势**：海量数据资源支撑模型训练
4. **生态完善**：从芯片到应用的全产业链布局

### 重点城市AI发展指数
| 城市 | 发展指数 | 核心优势 | 代表企业 |
|------|----------|----------|----------|
| 北京 | 95 | 科研资源、政策支持 | 百度、字节 |
| 上海 | 88 | 金融应用、国际合作 | 商汤、依图 |
| 深圳 | 85 | 硬件基础、产业配套 | 腾讯、华为 |
| 杭州 | 82 | 电商场景、云计算 | 阿里、网易 |
      `,
    },
    {
      id: '4',
      title: '技术发展趋势分析',
      content: `
## 4.1 大语言模型发展

大语言模型（LLM）已成为AI领域的核心技术底座，模型能力持续提升。

### 技术演进路线

**参数规模增长**
- GPT-3（2020）：1,750亿参数
- GPT-4（2023）：估计1.8万亿参数
- GPT-5（2025）：估计5万亿参数
- 行业趋势：从单纯追求参数向效率优化转变

**能力突破**
1. **推理能力**：逻辑推理、数学计算显著增强
2. **代码生成**：编程辅助能力接近专业开发者
3. **多语言支持**：跨语言理解与生成能力提升
4. **上下文长度**：从4K扩展到1M+ tokens

### 主流大模型对比

| 模型 | 厂商 | 参数规模 | 上下文 | 特点 |
|------|------|----------|--------|------|
| GPT-5 | OpenAI | 5T | 1M | 通用能力最强 |
| Claude 4 | Anthropic | 3T | 500K | 安全性突出 |
| Gemini 3 | Google | 4T | 2M | 多模态领先 |
| 文心5.0 | 百度 | 2T | 256K | 中文优化 |
| 通义3.0 | 阿里 | 1.5T | 128K | 电商场景 |

## 4.2 多模态AI技术

多模态融合成为AI发展的重要方向，实现文本、图像、音频、视频的统一理解。

### 技术突破
- **视觉理解**：图像识别准确率超过99%
- **视频生成**：Sora类模型实现电影级视频生成
- **语音交互**：端到端语音模型实现自然对话
- **跨模态检索**：文本搜图、以图搜文精准匹配

## 4.3 AI Agent智能体

AI Agent被视为大模型落地的关键形态，具备自主规划、工具调用、任务执行能力。

### Agent架构演进
1. **单Agent**：单一任务执行
2. **多Agent协作**：多智能体协同工作
3. **Agent生态系统**：智能体网络与平台

### 应用场景
- **个人助理**：日程管理、信息检索、内容创作
- **企业自动化**：流程自动化、数据分析、客户服务
- **代码开发**：需求分析、代码生成、测试调试
- **科研辅助**：文献检索、实验设计、论文撰写
      `,
    },
    {
      id: '5',
      title: '竞争格局分析',
      content: `
## 5.1 国际巨头布局

全球科技巨头在AI领域展开全方位竞争，形成多元化竞争格局。

### OpenAI / Microsoft
- **核心优势**：技术领先、资金雄厚、生态完整
- **主要产品**：GPT系列、Copilot、DALL-E
- **战略布局**：云服务+AI应用双轮驱动
- **2025年营收**：预计超过$150亿美元

### Google / Alphabet
- **核心优势**：数据资源、搜索入口、技术积累
- **主要产品**：Gemini、Bard、DeepMind
- **战略布局**：AI First战略全面深化
- **研发投入**：年投入超过$300亿美元

### Meta
- **核心优势**：社交数据、VR/AR、开源策略
- **主要产品**：Llama系列、Meta AI
- **战略布局**：开源大模型+元宇宙融合
- **差异化**：开源生态构建

### 其他重要玩家
| 公司 | 核心产品 | 特色定位 |
|------|----------|----------|
| Anthropic | Claude | AI安全与对齐 |
| xAI | Grok | 实时信息+个性化 |
| Cohere | Command | 企业级API服务 |
| Mistral | Mixtral | 欧洲开源先锋 |

## 5.2 国内厂商竞争

中国AI市场呈现"百模大战"格局，头部效应逐渐显现。

### 第一梯队：科技巨头

**百度（文心一言）**
- 技术路线：知识增强大模型
- 核心优势：搜索数据、知识图谱
- 应用场景：智能搜索、自动驾驶
- 文心大模型日均调用量：超过15亿次

**阿里巴巴（通义千问）**
- 技术路线：多模态统一架构
- 核心优势：电商场景、云计算
- 应用场景：智能客服、内容生成
- 开源模型下载量：超过3亿次

**腾讯（混元）**
- 技术路线：多模态大模型
- 核心优势：社交数据、游戏场景
- 应用场景：广告创意、游戏AI
- 内部业务接入：超过600个场景

**字节跳动（豆包）**
- 技术路线：高效推理优化
- 核心优势：内容理解、推荐算法
- 应用场景：内容创作、智能剪辑
- 日活跃用户：超过5,000万

### 第二梯队：AI独角兽

| 公司 | 核心产品 | 估值 | 特色 |
|------|----------|------|------|
| 智谱AI | ChatGLM | $30亿 | 清华系技术 |
| 月之暗面 | Kimi | $33亿 | 长文本处理 |
| MiniMax | abab | $25亿 | 多模态能力 |
| 零一万物 | Yi | $10亿 | 李开复领衔 |
| 百川智能 | Baichuan | $12亿 | 医疗场景 |
      `,
    },
    {
      id: '6',
      title: '应用场景与商业化',
      content: `
## 主要应用场景

AI技术已在多个行业实现深度应用，商业价值持续释放。

### 1. 内容创作与媒体
- **文本生成**：新闻写作、营销文案、小说创作
- **图像生成**：广告设计、电商配图、游戏美术
- **视频制作**：短视频生成、广告片制作、虚拟主播
- **市场规模**：2026年预计达到$280亿美元

### 2. 企业办公与协作
- **智能文档**：自动摘要、翻译校对、格式排版
- **会议助手**：实时转录、要点提炼、任务追踪
- **代码辅助**：代码生成、Bug修复、代码审查
- **效率提升**：平均提升办公效率40-60%

### 3. 客户服务
- **智能客服**：7×24小时在线、多轮对话、情感识别
- **工单处理**：自动分类、智能分派、解决方案推荐
- **成本降低**：客服成本降低50-70%
- **满意度提升**：客户满意度平均提升15%

### 4. 教育培训
- **个性化学习**：自适应学习路径、智能推荐
- **智能评估**：作业批改、能力测评、学习分析
- **虚拟教师**：一对一辅导、答疑解惑
- **市场增长**：年复合增长率达45%

### 5. 医疗健康
- **医学影像**：病灶检测、影像诊断、报告生成
- **药物研发**：分子设计、临床试验优化
- **健康管理**：慢病监测、健康咨询
- **应用前景**：预计2030年市场规模超$1,000亿

### 6. 金融科技
- **智能投顾**：资产配置、风险评估、投资建议
- **风控反欺诈**：实时监测、异常识别
- **智能信贷**：信用评估、自动审批
- **效率提升**：信贷审批时间从天级缩短至分钟级

## 商业模式分析

| 模式 | 描述 | 代表企业 | 特点 |
|------|------|----------|------|
| API服务 | 按调用量计费 | OpenAI | 灵活便捷 |
| SaaS订阅 | 月度/年度订阅 | Jasper | 稳定收入 |
| 企业定制 | 私有化部署 | 百度智能云 | 高客单价 |
| 广告变现 | 免费+广告 | 微软Copilot | 流量变现 |
| 硬件绑定 | AI+硬件 | 苹果 | 生态闭环 |
      `,
    },
    {
      id: '7',
      title: '投资机遇与风险提示',
      content: `
## 投资机遇

### 高成长赛道

**1. AI基础设施**
- **AI芯片**：GPU、TPU、NPU需求爆发
- **云计算**：AI算力服务成为核心增长点
- **数据中心**：智算中心建设加速
- **代表标的**：英伟达、AMD、寒武纪

**2. 企业级应用**
- **办公软件**：AI Copilot模式验证成功
- **CRM/ERP**：智能化升级需求旺盛
- **网络安全**：AI安全成为刚需
- **代表标的**：Salesforce、ServiceNow

**3. 垂直行业AI**
- **医疗AI**：诊断、制药、健康管理
- **自动驾驶**：L3+级别逐步落地
- **智能制造**：工业质检、预测性维护
- **代表标的**：Tempus、Mobileye

**4. AI Agent平台**
- **开发平台**：降低AI应用开发门槛
- **Agent市场**：智能体应用商店
- **基础设施**：Agent编排、调度系统
- **代表标的**：LangChain、AutoGPT

### 估值分析

| 细分领域 | 2024年P/S | 2026年预期P/S | 投资评级 |
|----------|-----------|---------------|----------|
| 大模型 | 25-40x | 15-25x | 谨慎 |
| AI芯片 | 20-35x | 12-20x | 推荐 |
| 企业应用 | 8-15x | 6-10x | 推荐 |
| 垂直行业 | 10-20x | 8-12x | 推荐 |

## 风险提示

### 技术风险
- **模型幻觉**：大模型输出不准确信息
- **安全对齐**：AI行为与人类价值观对齐
- **技术迭代**：技术路线变化导致投资损失

### 监管风险
- **数据隐私**：GDPR、数据安全法合规要求
- **算法监管**：算法备案、透明度要求
- **出口管制**：AI技术出口限制

### 市场风险
- **估值泡沫**：部分标的估值过高
- **竞争加剧**：价格战压缩利润空间
- **宏观环境**：利率变化影响成长股估值

### 运营风险
- **人才竞争**：AI人才稀缺，成本上升
- **算力成本**：训练和推理成本高昂
- **客户集中**：大客户依赖风险
      `,
    },
    {
      id: '8',
      title: '未来展望',
      content: `
## 2026-2030年发展预测

### 技术趋势

**1. AGI路径逐步清晰**
- 2027年：实现专业级AGI（特定领域超越人类）
- 2029年：实现通用级AGI（多数任务达到人类水平）
- 技术路线：Scale is not all you need，新架构涌现

**2. 具身智能崛起**
- 人形机器人进入家庭场景
- 自动驾驶实现L4级大规模商用
- 工业机器人智能化升级

**3. 脑机接口突破**
- 医疗级应用：帮助残障人士恢复功能
- 消费级产品：增强人类认知能力
- 伦理挑战：隐私、身份认同问题

### 产业变革

**工作方式变革**
- 50%以上的知识工作将由AI辅助完成
- 新兴职业：AI训练师、提示词工程师、AI伦理师
- 传统职业：部分消失，部分转型

**社会结构影响**
- 教育：个性化学习成为主流
- 医疗：精准医疗、预防医学普及
- 娱乐：沉浸式、个性化内容消费

**经济格局重塑**
- AI产业占全球GDP比重超过10%
- 数据成为核心生产要素
- 算力成为战略性资源

### 战略建议

**对企业**
1. 制定AI战略，明确应用场景
2. 投资数据基础设施
3. 培养AI人才队伍
4. 关注AI伦理与合规

**对投资者**
1. 关注AI基础设施赛道
2. 布局垂直行业应用
3. 分散投资降低风险
4. 长期视角看待回报

**对政策制定者**
1. 完善AI治理框架
2. 投资AI基础研究
3. 推动国际协作
4. 关注就业转型

---

*本报告由太擎AI研究院基于公开资料整理分析，仅供参考，不构成投资建议。*
      `,
    },
  ],
};

// 预设AI行业报告
const presetAIReport: Report = {
  id: 'ai-industry-report-2026',
  title: '2026年人工智能行业深度分析报告',
  description: 'AI技术发展、市场格局与投资机遇全景解读',
  type: '行业研究',
  cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
  views: 15800,
  downloads: 6200,
  createdAt: '2026-03-24',
  status: 'completed',
  content: aiIndustryReportContent,
};

// 市场数据图表
const marketData = [
  { year: '2024', global: 1780, china: 420 },
  { year: '2025', global: 2410, china: 580 },
  { year: '2026', global: 3200, china: 780 },
  { year: '2027', global: 4200, china: 1050 },
  { year: '2028', global: 5500, china: 1400 },
];

// 竞争格局数据
const competitionData = [
  { company: 'OpenAI', share: 28, growth: 45 },
  { company: 'Google', share: 22, growth: 32 },
  { company: 'Microsoft', share: 18, growth: 38 },
  { company: 'Meta', share: 12, growth: 25 },
  { company: '百度', share: 8, growth: 55 },
  { company: '阿里', share: 6, growth: 48 },
  { company: '其他', share: 6, growth: 30 },
];

const ReportChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [report, setReport] = useState<Report | null>(null);
  const [messages, setMessages] = useState<ReportMessage[]>([]);

  const { title, theme, template } = location.state || {};

  // 初始化报告
  useEffect(() => {
    // 如果是行业分析报告模板，显示预设报告
    if (template === 'industry-analysis' || theme?.includes('AI') || theme?.includes('人工智能')) {
      setReport(presetAIReport);
      setMessages([
        {
          id: '1',
          reportId: 'ai-industry-report-2026',
          role: 'assistant',
          content: `已为您生成《${presetAIReport.title}》，这是一份关于AI行业的深度分析报告，涵盖市场规模、技术趋势、竞争格局、投资机遇等多个维度。`,
          type: 'report',
          metadata: { report: presetAIReport },
          timestamp: new Date().toISOString(),
        },
      ]);
    } else {
      // 其他情况生成通用报告
      const genericReport: Report = {
        id: 'generic-report-' + Date.now(),
        title: title || '新建研究报告',
        description: theme || '',
        type: '研究报告',
        views: 0,
        downloads: 0,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'completed',
      };
      setReport(genericReport);
      setMessages([
        {
          id: '1',
          reportId: genericReport.id,
          role: 'assistant',
          content: `已为您创建《${genericReport.title}》，请告诉我您希望深入分析的具体方向，我将为您完善报告内容。`,
          type: 'text',
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [template, title, theme]);

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ReportMessage = {
      id: Date.now().toString(),
      reportId: report?.id || '',
      role: 'user',
      content: inputValue,
      type: 'text',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    // 模拟AI回复
    setTimeout(() => {
      const assistantMessage: ReportMessage = {
        id: (Date.now() + 1).toString(),
        reportId: report?.id || '',
        role: 'assistant',
        content: '我已收到您的问题，正在为您分析相关数据并更新报告内容...',
        type: 'text',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 1500);
  };

  // 渲染报告内容
  const renderReportContent = () => {
    if (!report?.content) return null;

    const { cover, toc, sections } = report.content;

    return (
      <div className="report-document">
        {/* 封面 */}
        <div className="report-cover-page" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${cover.backgroundImage})`,
        }}>
          <div className="cover-content">
            <Text className="cover-institution">{cover.researchInstitution}</Text>
            <Title level={1} className="cover-title">{cover.title}</Title>
            <Text className="cover-subtitle">{cover.subtitle}</Text>
            <Text className="cover-date">{cover.publishDate}</Text>
          </div>
        </div>

        {/* 目录 */}
        <Card className="report-toc-card">
          <Title level={3}>目录</Title>
          <div className="toc-list">
            {toc.map(item => (
              <div
                key={item.id}
                className={`toc-item level-${item.level}`}
              >
                <span className="toc-title">{item.title}</span>
                <span className="toc-page">{item.page}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 章节内容 */}
        {sections.map(section => (
          <Card key={section.id} className="report-section-card" id={`section-${section.id}`}>
            <Title level={section.id.includes('-') ? 4 : 3}>{section.title}</Title>
            <div className="section-content">
              {section.content.split('\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return <Title level={5} key={idx}>{paragraph.replace('## ', '')}</Title>;
                }
                if (paragraph.startsWith('### ')) {
                  return <Text strong key={idx} style={{ display: 'block', marginTop: 12, marginBottom: 8, fontSize: 14 }}>{paragraph.replace('### ', '')}</Text>;
                }
                if (paragraph.startsWith('- ')) {
                  return <li key={idx}>{paragraph.replace('- ', '')}</li>;
                }
                if (paragraph.startsWith('|')) {
                  // 表格处理简化版
                  return null;
                }
                if (paragraph.trim()) {
                  return <Paragraph key={idx}>{paragraph}</Paragraph>;
                }
                return null;
              })}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  // 渲染数据看板
  const renderDashboard = () => (
    <div className="report-dashboard">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="全球市场规模(亿美元)"
              value={3200}
              precision={0}
              valueStyle={{ color: '#d4a574' }}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="中国市场规模(亿元)"
              value={780}
              precision={0}
              valueStyle={{ color: '#52c41a' }}
              prefix={<LineChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="年复合增长率"
              value={38.1}
              precision={1}
              valueStyle={{ color: '#1890ff' }}
              suffix="%"
              prefix={<PieChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="企业采用率"
              value={60}
              precision={0}
              valueStyle={{ color: '#722ed1' }}
              suffix="%"
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="市场规模预测" className="dashboard-chart-card">
        <Table
          dataSource={marketData}
          pagination={false}
          columns={[
            { title: '年份', dataIndex: 'year', key: 'year' },
            { title: '全球市场(亿美元)', dataIndex: 'global', key: 'global' },
            { title: '中国市场(亿元)', dataIndex: 'china', key: 'china' },
          ]}
        />
      </Card>

      <Card title="竞争格局" className="dashboard-chart-card">
        <Table
          dataSource={competitionData}
          pagination={false}
          columns={[
            { title: '公司', dataIndex: 'company', key: 'company' },
            { title: '市场份额(%)', dataIndex: 'share', key: 'share' },
            { title: '增长率(%)', dataIndex: 'growth', key: 'growth' },
          ]}
        />
      </Card>
    </div>
  );

  return (
    <div className="report-chat-page">
      {/* 顶部导航 */}
      <div className="report-chat-header">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/reports')}
          className="back-btn"
        >
          返回
        </Button>
        <div className="header-title">
          <Title level={4}>{report?.title || '报告生成中...'}</Title>
          <Text type="secondary">{report?.description}</Text>
        </div>
        <div className="header-actions">
          <Button icon={<DownloadOutlined />}>下载</Button>
          <Button icon={<ShareAltOutlined />}>分享</Button>
          <Button icon={<PrinterOutlined />}>打印</Button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="report-chat-content">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="对话" key="chat">
            <div className="chat-container">
              <div className="messages-list">
                {messages.map(msg => (
                  <div key={msg.id} className={`message-item ${msg.role}`}>
                    <Avatar
                      icon={msg.role === 'assistant' ? <RobotOutlined /> : <UserOutlined />}
                      className={msg.role}
                    />
                    <div className="message-content">
                      {msg.type === 'report' && msg.metadata?.report ? (
                        <Card className="report-preview-card">
                          <div className="report-preview-header">
                            <FileTextOutlined className="report-icon" />
                            <div className="report-preview-info">
                              <Text strong>{msg.metadata.report.title}</Text>
                              <Text type="secondary" className="report-desc">
                                {msg.metadata.report.description}
                              </Text>
                            </div>
                          </div>
                          <div className="report-preview-stats">
                            <Tag icon={<BarChartOutlined />}>行业研究</Tag>
                            <Tag>15800 阅读</Tag>
                            <Tag>6200 下载</Tag>
                          </div>
                          <Button
                            type="primary"
                            onClick={() => setActiveTab('report')}
                            className="view-report-btn"
                          >
                            查看完整报告
                          </Button>
                        </Card>
                      ) : (
                        <div className="text-content">{msg.content}</div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="message-item assistant">
                    <Avatar icon={<RobotOutlined />} className="assistant" />
                    <div className="message-content">
                      <Spin size="small" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-area">
                <TextArea
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="继续追问报告相关内容..."
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  onPressEnter={e => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSend}
                  loading={loading}
                  className="send-btn"
                >
                  发送
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab="报告" key="report">
            {renderReportContent()}
          </TabPane>

          <TabPane tab="数据看板" key="dashboard">
            {renderDashboard()}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportChat;
