import type { Agent, Skill, ChatSession, KnowledgeFolder, DebugSession } from '@/types';

export const mockAgents: Agent[] = [
  // ==================== 预设智能体 - 通用场景 ====================
  {
    id: 'preset-1',
    name: 'AgentCraft 智能体工匠',
    description: '智能体创建引导助手，通过对话收集用户需求，自动推荐智能体角色和技能，生成个性化智能体配置（姓名、形象、性格），并匹配合适的技能组合。',
    status: 'active',
    createdAt: '2024-03-23',
    updatedAt: '2024-03-23',
    creator: '系统预设',
    usageScope: ['所有用户'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'preset-2',
    name: 'DocMind 文档智脑',
    description: '专业文档分析与需求提取专家，支持上传Word/PDF/Excel文档自动解析，提取关键功能点和需求，生成结构化功能清单，适用于产品需求文档、技术文档等分析场景。',
    status: 'active',
    createdAt: '2024-03-23',
    updatedAt: '2024-03-23',
    creator: '系统预设',
    usageScope: ['所有用户'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 'preset-3',
    name: 'MeetGuard 会议管家',
    description: '智能日程与会议管理助手，支持会议日程自动同步与提醒，会前准备事项推送，会议内容摘要与待办生成，适用于周会、评审会、管理层例会等多种会议类型。',
    status: 'active',
    createdAt: '2024-03-23',
    updatedAt: '2024-03-23',
    creator: '系统预设',
    usageScope: ['所有用户'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  },
  // ==================== 业务智能体 - 石化行业 ====================
  {
    id: '1',
    name: '聚烯烃分析师',
    description: '专注于聚乙烯（PE）、聚丙烯（PP）等聚烯烃产品的市场分析，提供价格走势、供需分析、产能变化等专业咨询服务。',
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    creator: '陈曦Joy、何嘉荣Jhon',
    usageScope: ['陈曦Joy', '何嘉荣Jhon'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: '2',
    name: '芳烃产业链助手',
    description: '专业分析纯苯、甲苯、二甲苯等芳烃产品市场动态，涵盖PX-PTA-聚酯产业链上下游信息，助力企业决策。',
    status: 'active',
    createdAt: '2024-01-20',
    updatedAt: '2024-03-09',
    creator: 'Lin',
    usageScope: ['Lin'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: '3',
    name: '甲醇市场顾问',
    description: '提供甲醇市场全方位分析，包括港口库存、进出口数据、下游MTO开工情况以及价格预测等专业服务。',
    status: 'active',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-08',
    creator: '何嘉荣Jhon、Lin',
    usageScope: ['何嘉荣Jhon', 'Lin'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: '4',
    name: '乙二醇研究员',
    description: '专注乙二醇（MEG）市场研究，分析进口来源国变化、港口库存、下游聚酯需求及价格趋势，提供专业投资建议。',
    status: 'active',
    createdAt: '2024-02-10',
    updatedAt: '2024-03-07',
    creator: 'Lin',
    usageScope: ['Lin'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: '5',
    name: '工程塑料专家',
    description: '专业分析PC、PA66、PBT等工程塑料市场，涵盖原料价格、产能投放、下游应用及进出口情况，助力采购决策。',
    status: 'inactive',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-06',
    creator: '冯碧玉Daisy、小米、黄健聪',
    usageScope: ['小米'],
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
  },
];

export const mockChatSessions: ChatSession[] = [
  // ==================== 预设智能体对话示例 ====================
  // AgentCraft 智能体工匠 - 对话示例
  {
    id: 'preset-chat-1',
    agentId: 'preset-1',
    title: '创建智能体助手',
    messages: [
      {
        id: '1',
        agentId: 'preset-1',
        role: 'assistant',
        content: '你好呀😊，我是太擎Master，我可以为你创造专属的AI助理和员工~\n不管是想要特定角色(比如"职场助手""学习搭子")，还是需要助理掌握某类技能(比如写PPT、做笔记)，都可以尽管说，我会一次性帮你确认所有需求，高效搞定专属助理！',
        timestamp: '2024-03-23 09:00:00',
      },
      {
        id: '2',
        agentId: 'preset-1',
        role: 'user',
        content: '我需要能够帮我安排工作日程的助理，包括约开会、跟进度，并且可以随时汇报公司业绩情况',
        timestamp: '2024-03-23 09:00:30',
      },
      {
        id: '3',
        agentId: 'preset-1',
        role: 'assistant',
        content: '好的，已收到你的请求，现在为你寻找合适的助理。\n\n请选择助理性别：\n• 男生\n• 女生',
        timestamp: '2024-03-23 09:00:35',
      },
      {
        id: '4',
        agentId: 'preset-1',
        role: 'user',
        content: '女生',
        timestamp: '2024-03-23 09:00:45',
      },
      {
        id: '5',
        agentId: 'preset-1',
        role: 'assistant',
        content: '好的，已为你自动生成助理信息。\n\n如果需要修改，后续可以和我沟通，也可以在助理信息界面直接修改\n\n📋 助理信息：\n• 助理姓名：敏静\n• 助理形象：👩‍💼 专业女性形象\n• 助理生日：2003年3月5日（今年23岁，处女座）\n• 助理性格：专业严谨 - 说话正式、逻辑清晰、高效直接\n\n接下来给这个助理挑选合适的技能，我需要先问一些问题来明确需求。\n\n这个技能的核心用途是什么？\n○ 基于搜索词分析爆款\n● 基于全网热门文章分析爆款',
        timestamp: '2024-03-23 09:01:00',
      },
    ],
    createdAt: '2024-03-23',
    updatedAt: '2024-03-23',
  },
  // DocMind 文档智脑 - 对话示例
  {
    id: 'preset-chat-2',
    agentId: 'preset-2',
    title: '产品需求文档分析',
    messages: [
      {
        id: '1',
        agentId: 'preset-2',
        role: 'assistant',
        content: '你好，我是你的工作助理，每天10点我都会收集最新的AI资讯，总结后发给你，还能够帮你写专业的行业分析报告和开发系统级软件。\n可以向我提出具体需求，比如"开发一个营销系统"',
        timestamp: '2024-03-23 10:00:00',
      },
      {
        id: '2',
        agentId: 'preset-2',
        role: 'user',
        content: '[上传文件: 进销存管理系统产品需求说明书.doc 1.8MB]',
        timestamp: '2024-03-23 10:05:00',
      },
      {
        id: '3',
        agentId: 'preset-2',
        role: 'assistant',
        content: '好的，让我研究一下这份产品需求说明书',
        timestamp: '2024-03-23 10:05:05',
      },
      {
        id: '4',
        agentId: 'preset-2',
        role: 'assistant',
        content: '根据这份文档说明，需要开发的功能场景和对应功能点包括：\n\n| 功能场景 | 对应功能点 |\n|---------|-----------|\n| 基础管理（系统底座） | 1.组织机构、用户、角色、权限管理<br>2.菜单权限、数据权限、操作日志<br>3.基础数据(商品分类、品牌、单位、规格)管理<br>4.多仓库、库位、库区管理<br>5.供应商、客户档案管理 |\n\n文档分析完成！我已提取了所有功能需求，是否需要我生成详细的功能清单或开发计划？',
        timestamp: '2024-03-23 10:06:30',
      },
    ],
    createdAt: '2024-03-23',
    updatedAt: '2024-03-23',
  },
  // MeetGuard 会议管家 - 对话示例
  {
    id: 'preset-chat-3',
    agentId: 'preset-3',
    title: '会议提醒与准备',
    messages: [
      {
        id: '1',
        agentId: 'preset-3',
        role: 'assistant',
        content: '📅 日程提醒\n\n管理周例会-线上会议\n时间：1月22日 14:00\n会议内容：1.主管汇报 2.总结 3.1月生日会活动\n地点：银河系',
        timestamp: '2024-03-23 14:30:00',
      },
      {
        id: '2',
        agentId: 'preset-3',
        role: 'assistant',
        content: '周一下午2点陈开冉组织管理层周例会，请问你能准时参加吗？',
        timestamp: '2024-03-23 14:30:30',
      },
      {
        id: '3',
        agentId: 'preset-3',
        role: 'assistant',
        content: '本次会议你需要准备好业绩完成情况并汇报',
        timestamp: '2024-03-23 14:30:35',
      },
      {
        id: '4',
        agentId: 'preset-3',
        role: 'user',
        content: '准时参加',
        timestamp: '2024-03-23 14:31:00',
      },
      {
        id: '5',
        agentId: 'preset-3',
        role: 'assistant',
        content: '好嘞，周一我回提前通知你，记得按时参加哦～',
        timestamp: '2024-03-23 14:31:05',
      },
    ],
    createdAt: '2024-03-23',
    updatedAt: '2024-03-23',
  },
  // ==================== 业务智能体对话示例 ====================
  {
    id: '1',
    agentId: '1',
    title: '聚乙烯市场分析咨询',
    messages: [
      {
        id: '1',
        agentId: '1',
        role: 'user',
        content: '你好，请分析一下2024年第三季度聚乙烯（PE）的市场走势',
        timestamp: '2024-10-15 09:00:00',
      },
      {
        id: '2',
        agentId: '1',
        role: 'assistant',
        content: '您好！我是聚烯烃分析师，为您分析2024年Q3聚乙烯市场情况：\n\n【价格走势】\n• LLDPE（线性低密度聚乙烯）：华东市场均价约8500元/吨，较Q2上涨3.5%\n• HDPE（高密度聚乙烯）：注塑级均价约8200元/吨，膜料级约8400元/吨\n• LDPE（低密度聚乙烯）：高压膜料均价约9800元/吨，涨幅5.2%\n\n【供需分析】\n• 供应端：Q3新增产能60万吨（浙江石化、中科炼化），国内总产能达3200万吨\n• 需求端：农膜旺季带动，包装膜需求稳定增长，管材需求受地产影响偏弱\n• 进口量：约380万吨，环比减少8%，国产替代加速\n\n【成本利润】\n• 油制路线：石脑油裂解制PE平均利润约450元/吨\n• 煤制路线：煤制PE利润约380元/吨，成本优势明显\n\n【Q4展望】\n预计PE价格维持高位震荡，农膜需求进入淡季，但新增产能投放放缓，供需相对平衡。',
        timestamp: '2024-10-15 09:00:05',
      },
      {
        id: '3',
        agentId: '1',
        role: 'user',
        content: '聚丙烯（PP）和PE的价差目前是什么情况？',
        timestamp: '2024-10-15 09:05:00',
      },
      {
        id: '4',
        agentId: '1',
        role: 'assistant',
        content: '关于PP与PE的价差分析：\n\n【当前价差情况】（2024年10月）\n• PP拉丝 vs LLDPE：价差约-200元/吨（PP低于PE）\n• PP共聚 vs HDPE注塑：价差约+150元/吨（PP高于PE）\n\n【价差走势分析】\n• 历史均值：PP与LLDPE价差通常在-300至+500元/吨区间波动\n• 当前位置：处于历史中位偏低水平\n• 变化趋势：Q3以来PP涨幅（2.8%）略低于PE（3.5%），价差有所收窄\n\n【影响因素】\n• 供应端：PP新增产能压力更大，2024年新增产能超200万吨\n• 需求端：PP下游汽车、家电需求偏弱，PE农膜需求相对刚性\n• 替代效应：价差收窄后，部分BOPP领域开始尝试使用PE替代\n\n【投资建议】\n当前PP-PE价差处于相对合理区间，建议关注11-12月PP新装置投产进度，若集中投放可能进一步压低PP价格，价差有望继续收窄。',
        timestamp: '2024-10-15 09:05:10',
      },
    ],
    createdAt: '2024-10-15',
    updatedAt: '2024-10-15',
  },
  {
    id: '2',
    agentId: '2',
    title: '纯苯市场走势咨询',
    messages: [
      {
        id: '1',
        agentId: '2',
        role: 'user',
        content: '请分析一下近期纯苯市场的供需情况',
        timestamp: '2024-10-15 10:00:00',
      },
      {
        id: '2',
        agentId: '2',
        role: 'assistant',
        content: '您好！我是芳烃产业链助手，为您分析纯苯市场最新情况：\n\n【价格走势】\n• 华东纯苯：当前价格约7850元/吨，较上月上涨2.8%\n• 山东地炼：价格约7650元/吨，涨幅3.2%\n• 进口货：CFR中国主港约950美元/吨，折合人民币约8350元/吨\n\n【供应分析】\n• 国内产能：总产能约1850万吨，9月平均开工率82%\n• 新增产能：恒力石化二期60万吨装置10月中旬投产\n• 进口量：9月进口约28万吨，主要来自韩国、东南亚\n• 库存水平：华东港口库存约15万吨，处于历史中低位\n\n【需求分析】\n• 苯乙烯：占纯苯需求52%，近期开工率78%，需求稳定\n• 己内酰胺：占需求18%，开工率85%，需求向好\n• 苯酚：占需求15%，开工率72%，需求偏弱\n• 苯胺：占需求8%，开工率80%，MDI需求支撑\n\n【后市展望】\n预计Q4纯苯价格维持偏强震荡，供应端新增产能有限，需求端苯乙烯新装置投产将带动纯苯消费，建议关注恒力、浙石化等装置投产进度。',
        timestamp: '2024-10-15 10:00:05',
      },
    ],
    createdAt: '2024-10-15',
    updatedAt: '2024-10-15',
  },
  {
    id: '3',
    agentId: '3',
    title: '甲醇港口库存分析',
    messages: [
      {
        id: '1',
        agentId: '3',
        role: 'user',
        content: '最近甲醇港口库存变化如何？对价格有什么影响？',
        timestamp: '2024-10-15 11:00:00',
      },
      {
        id: '2',
        agentId: '3',
        role: 'assistant',
        content: '您好！我是甲醇市场顾问，为您分析港口库存及价格影响：\n\n【港口库存现状】（截至10月11日）\n• 华东港口：约98万吨，较上周增加6万吨，环比+6.5%\n• 华南港口：约32万吨，较上周增加2万吨，环比+6.7%\n• 总库存：130万吨，处于历史中高位水平\n\n【库存变化趋势】\n• 9月平均库存：118万吨\n• 10月至今平均：128万吨，呈累库趋势\n• 同比去年：增加约15万吨，库存压力较大\n\n【到港预报】\n• 10月中旬到港量：约45万吨（伊朗、沙特、东南亚货源）\n• 预计10月总进口量：125-130万吨，环比+10%\n\n【价格影响分析】\n• 当前华东价格：2550元/吨，较上周下跌1.9%\n• 库存压力：高库存压制价格上涨空间\n• 基差走弱：现货贴水期货约30元/吨\n• 下游需求：MTO开工率降至75%，需求端支撑减弱\n\n【投资建议】\n短期甲醇价格承压，建议关注：\n1. 伊朗装置开工情况（影响进口量）\n2. MTO装置复工进度\n3. 冬季天然气限气对供应的影响\n4. 港口库存去化节奏',
        timestamp: '2024-10-15 11:00:05',
      },
    ],
    createdAt: '2024-10-15',
    updatedAt: '2024-10-15',
  },
  {
    id: '4',
    agentId: '4',
    title: '乙二醇进口数据分析',
    messages: [
      {
        id: '1',
        agentId: '4',
        role: 'user',
        content: '请分析一下乙二醇进口来源国的情况，哪些国家占比最大？',
        timestamp: '2024-10-15 14:00:00',
      },
      {
        id: '2',
        agentId: '4',
        role: 'assistant',
        content: '您好！我是乙二醇研究员，为您详细分析进口来源国格局：\n\n【2024年1-9月进口数据】\n• 总进口量：约758万吨，同比+5.2%\n• 月均进口量：84.2万吨\n• 进口依存度：约38%，较2023年下降3个百分点\n\n【来源国分布】\n• 沙特阿拉伯：占比36.5%（276.7万吨）\n  - 主要供应商：SABIC、Yanpet\n  - 月均进口：30.7万吨\n  - 同比变化：+8.5%\n\n• 加拿大：占比21.2%（160.7万吨）\n  - 主要供应商：MEGlobal、Shell\n  - 月均进口：17.9万吨\n  - 同比变化：-2.3%\n\n• 新加坡：占比15.8%（119.8万吨）\n  - 主要供应商：Shell、ExxonMobil\n  - 月均进口：13.3万吨\n  - 同比变化：+12.1%\n\n• 韩国：占比11.5%（87.2万吨）\n  - 主要供应商：乐天化学、SK化学\n  - 同比变化：-8.7%\n\n• 伊朗：占比7.2%（54.6万吨）\n  - 同比变化：+28.5%（恢复性增长）\n\n• 其他：占比7.8%（59.1万吨）\n\n【趋势分析】\n• 沙特货源占比持续提升，品质稳定受青睐\n• 伊朗货源恢复性增长，价格优势明显\n• 韩国货源下降，主要因国内产能增加\n• 国产替代加速，进口依存度逐年下降\n\n【价格影响】\n• CFR中国主港均价：528美元/吨\n• 进口成本约：4150元/吨（含关税、增值税）\n• 与国内现货价差：约-100元/吨（进口倒挂）',
        timestamp: '2024-10-15 14:00:05',
      },
    ],
    createdAt: '2024-10-15',
    updatedAt: '2024-10-15',
  },
  {
    id: '5',
    agentId: '5',
    title: 'PC塑料市场行情咨询',
    messages: [
      {
        id: '1',
        agentId: '5',
        role: 'user',
        content: '聚碳酸酯（PC）最近市场行情怎么样？价格走势如何？',
        timestamp: '2024-10-15 15:00:00',
      },
      {
        id: '2',
        agentId: '5',
        role: 'assistant',
        content: '您好！我是工程塑料专家，为您分析PC市场最新行情：\n\n【价格走势】（2024年10月）\n• 国产PC（鲁西化工/利华益）：约15200-15800元/吨\n• 进口PC（科思创/沙比克）：约16800-17500元/吨\n• 较上月变化：国产-1.5%，进口-0.8%，价格小幅回落\n• 同比去年：国产-8.5%，进口-6.2%，全年呈下行趋势\n\n【供需格局】\n• 国内产能：总产能约285万吨/年，2024年新增产能45万吨\n  - 主要企业：科思创（60万吨）、鲁西化工（30万吨）、\n    万华化学（28万吨）、利华益（26万吨）\n• 开工率：行业平均72%，较上月下降3个百分点\n• 产量：9月产量约17.1万吨，环比-4.5%\n\n【需求分析】\n• 电子电器：占需求35%，家电需求偏弱\n• 汽车工业：占需求28%，新能源汽车带动增长\n• 建筑板材：占需求18%，地产低迷影响需求\n• 光学材料：占需求12%，光盘需求持续萎缩\n• 其他：占需求7%\n\n【原料成本】\n• 双酚A价格：约10200元/吨，PC成本支撑减弱\n• 光气法路线：成本约11800元/吨\n• 熔融酯交换法：成本约12200元/吨\n• 行业利润：平均吨利润约1800元，处于合理区间\n\n【后市展望】\n预计Q4 PC价格维持弱势震荡：\n• 供应端：新增产能持续释放，供应压力较大\n• 需求端：传统旺季不旺，下游采购谨慎\n• 成本端：双酚A价格偏弱，成本支撑有限\n• 建议：按需采购，关注万华化学、鲁西化工等装置动态',
        timestamp: '2024-10-15 15:00:05',
      },
    ],
    createdAt: '2024-10-15',
    updatedAt: '2024-10-15',
  },
];

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'xiaohongshu-get-viral-articles',
    displayName: '每日小红书爆文获取写作',
    description: '获取小红书平台热门文章数据，支持关键词搜索、互动数据筛选；当用户需要小红书爆款内容分析、竞品调研、创作参考或趋势把握时使用。',
    tags: ['数据获取', '内容创作', '小红书'],
    status: 'published',
    creator: '刘小美',
    createdAt: '2024-02-28 12:30',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: false,
    readme: `# 小红书爆款文章获取

## 任务目标
- 本 Skill 用于：获取小红书平台的热门文章数据，为内容创作和竞品分析提供参考
- 能力包含：关键词搜索、高互动筛选、数据结构化提取、批量获取
- 触发条件：用户需要小红书热门内容、爆款分析、创作灵感或竞品调研

## 前置准备
- 依赖说明：scripts脚本所需的依赖包及版本
  - requests>=2.28.0
- 凭证配置：需配置小红书Cookie（通过skill_credentials获取）

## 操作步骤

### 标准流程
1. 获取热门文章数据
   - 调用 'scripts/fetch_hot_posts.py' 获取指定关键词的热门文章
   - 参数说明：
     - keyword: 搜索关键词（必填）
     - sort_type: 排序方式（hot_general=综合热门, time_desc=最新发布, like_desc=最多点赞）
     - limit: 返回数量（默认20，最大50）
   - 示例：
   \`\`\`bash
   python /workspace/projects/xiaohongshu-hot-posts/scripts/fetch_hot_posts.py \\
     --keyword "职场穿搭" \\
     --sort_type "hot_general" \\
     --limit 20
   \`\`\``,
    files: [
      {
        id: '1',
        name: 'xiaohongshu-get-viral-articles',
        type: 'folder',
        path: '/',
        children: [
          {
            id: '2',
            name: 'SKILL.md',
            type: 'file',
            path: '/SKILL.md',
            content: '# Skill 说明文档',
          },
          {
            id: '3',
            name: 'references',
            type: 'folder',
            path: '/references',
            children: [
              { id: '4', name: 'api-guide.md', type: 'file', path: '/references/api-guide.md' },
              { id: '5', name: 'content-analysis.md', type: 'file', path: '/references/content-analysis.md' },
              { id: '6', name: 'metrics-guide.md', type: 'file', path: '/references/metrics-guide.md' },
            ],
          },
          {
            id: '7',
            name: 'scripts',
            type: 'folder',
            path: '/scripts',
            children: [
              { id: '8', name: 'fetch_hot_posts.py', type: 'file', path: '/scripts/fetch_hot_posts.py' },
              { id: '9', name: 'attention_analyzer.py', type: 'file', path: '/scripts/attention_analyzer.py' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'find-customers',
    displayName: '找客户',
    description: '销售线索生成与商机挖掘，输入目标客户画像（行业、规模、痛点）输出匹配的企业清单与触达路径。',
    tags: ['销售线索', '信息汇总', '新上线'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '3',
    name: 'write-report',
    displayName: '写报告',
    description: '适用于工作周报、项目复盘、数据分析报告、市场调研、技术文档、会议纪要、年终总结、可行性分析等',
    tags: ['生成创作', '行业调研'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    readme: `# 写报告

## 任务目标
- 本 Skill 用于：自动生成各类工作报告和文档，提升写作效率
- 能力包含：工作周报、项目复盘、数据分析报告、市场调研、技术文档、会议纪要、年终总结、可行性分析
- 触发条件：用户需要撰写各类工作文档或报告时

## 前置准备
- 依赖说明：scripts脚本所需的依赖包及版本
  - python-docx>=0.8.11
  - openpyxl>=3.0.0
  - pandas>=1.3.0
- 凭证配置：无需特殊凭证

## 操作步骤

### 标准流程
1. 生成工作报告
   - 调用 'scripts/generate_report.py' 生成指定类型的报告
   - 参数说明：
     - report_type: 报告类型（weekly=周报, monthly=月报, project=项目复盘, analysis=数据分析）
     - title: 报告标题（必填）
     - content_points: 内容要点（JSON格式，包含关键信息）
     - output_format: 输出格式（docx=Word, pdf=PDF, md=Markdown）
   - 示例：
   \`\`\`bash
   python /workspace/projects/write-report/scripts/generate_report.py \\
     --report_type "weekly" \\
     --title "2024年第10周工作总结" \\
     --content_points '{"completed":["完成A项目开发","修复B系统bug"],"plan":["启动C项目","优化D模块"]}' \\
     --output_format "docx"
   \`\`\`

2. 数据分析报告生成
   - 调用 'scripts/data_analysis_report.py' 基于数据生成分析报告
   - 参数说明：
     - data_source: 数据源路径（CSV或Excel文件）
     - analysis_type: 分析类型（trend=趋势分析, comparison=对比分析, correlation=相关性分析）
     - chart_types: 图表类型（bar=柱状图, line=折线图, pie=饼图, scatter=散点图）
   - 示例：
   \`\`\`bash
   python /workspace/projects/write-report/scripts/data_analysis_report.py \\
     --data_source "/data/sales_q1.csv" \\
     --analysis_type "trend" \\
     --chart_types "line,bar"
   \`\`\`

## 输出规范
- 报告格式：支持Word、PDF、Markdown格式
- 内容结构：包含标题、摘要、正文、结论、建议等标准章节
- 样式要求：专业商务风格，支持自定义模板

## 注意事项
- 请确保提供的数据准确完整
- 复杂报告建议分章节生成后再合并
- 支持中文和英文报告生成`,
    files: [
      {
        id: 'report-1',
        name: 'write-report',
        type: 'folder',
        path: '/',
        children: [
          {
            id: 'report-2',
            name: 'SKILL.md',
            type: 'file',
            path: '/SKILL.md',
            content: `# 写报告

## 任务目标
- 本 Skill 用于：自动生成各类工作报告和文档，提升写作效率
- 能力包含：工作周报、项目复盘、数据分析报告、市场调研、技术文档、会议纪要、年终总结、可行性分析
- 触发条件：用户需要撰写各类工作文档或报告时

## 前置准备
- 依赖说明：scripts脚本所需的依赖包及版本
  - python-docx>=0.8.11
  - openpyxl>=3.0.0
  - pandas>=1.3.0
- 凭证配置：无需特殊凭证

## 操作步骤

### 标准流程
1. 生成工作报告
   - 调用 'scripts/generate_report.py' 生成指定类型的报告
   - 参数说明：
     - report_type: 报告类型（weekly=周报, monthly=月报, project=项目复盘, analysis=数据分析）
     - title: 报告标题（必填）
     - content_points: 内容要点（JSON格式，包含关键信息）
     - output_format: 输出格式（docx=Word, pdf=PDF, md=Markdown）

2. 数据分析报告生成
   - 调用 'scripts/data_analysis_report.py' 基于数据生成分析报告
   - 参数说明：
     - data_source: 数据源路径（CSV或Excel文件）
     - analysis_type: 分析类型（trend=趋势分析, comparison=对比分析, correlation=相关性分析）
     - chart_types: 图表类型（bar=柱状图, line=折线图, pie=饼图, scatter=散点图）

## 输出规范
- 报告格式：支持Word、PDF、Markdown格式
- 内容结构：包含标题、摘要、正文、结论、建议等标准章节
- 样式要求：专业商务风格，支持自定义模板`,
          },
          {
            id: 'report-3',
            name: 'references',
            type: 'folder',
            path: '/references',
            children: [
              { 
                id: 'report-4', 
                name: 'report-templates.md', 
                type: 'file', 
                path: '/references/report-templates.md',
                content: `# 报告模板指南

## 周报模板
- 本周完成工作
- 遇到的问题及解决方案
- 下周工作计划

## 项目复盘模板
- 项目背景与目标
- 执行过程回顾
- 成果与数据
- 经验与教训
- 后续优化建议

## 数据分析报告模板
- 分析目的
- 数据来源与说明
- 分析方法论
- 数据可视化
- 结论与建议`
              },
              { 
                id: 'report-5', 
                name: 'writing-guide.md', 
                type: 'file', 
                path: '/references/writing-guide.md',
                content: `# 写作指南

## 报告写作原则
1. 清晰简洁：避免冗长，突出重点
2. 数据支撑：用数据说话，增强说服力
3. 结构完整：包含背景、分析、结论、建议
4. 语言专业：使用行业术语，保持专业性

## 常用表达
- 完成情况：已完成、进行中、待启动
- 趋势描述：上升、下降、持平、波动
- 程度描述：显著、明显、轻微、基本`
              },
              { 
                id: 'report-6', 
                name: 'examples', 
                type: 'folder', 
                path: '/references/examples',
                children: [
                  {
                    id: 'report-7',
                    name: 'weekly-report-sample.docx',
                    type: 'file',
                    path: '/references/examples/weekly-report-sample.docx'
                  },
                  {
                    id: 'report-8',
                    name: 'project-review-sample.docx',
                    type: 'file',
                    path: '/references/examples/project-review-sample.docx'
                  }
                ]
              },
            ],
          },
          {
            id: 'report-9',
            name: 'scripts',
            type: 'folder',
            path: '/scripts',
            children: [
              { 
                id: 'report-10', 
                name: 'generate_report.py', 
                type: 'file', 
                path: '/scripts/generate_report.py',
                content: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
报告生成脚本
支持生成工作周报、月报、项目复盘、数据分析报告等
"""

import argparse
import json
from datetime import datetime
from docx import Document
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

class ReportGenerator:
    def __init__(self, report_type, title, content_points, output_format='docx'):
        self.report_type = report_type
        self.title = title
        self.content_points = json.loads(content_points) if isinstance(content_points, str) else content_points
        self.output_format = output_format
        self.doc = Document()
    
    def generate(self):
        """生成报告"""
        self._add_title()
        self._add_metadata()
        self._add_content()
        self._save_report()
        return f"报告已生成: {self.title}.{self.output_format}"
    
    def _add_title(self):
        """添加标题"""
        title = self.doc.add_heading(self.title, level=0)
        title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    def _add_metadata(self):
        """添加元数据"""
        meta = self.doc.add_paragraph()
        meta.add_run(f'生成时间: {datetime.now().strftime("%Y-%m-%d %H:%M")}')
        meta.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    
    def _add_content(self):
        """添加内容"""
        if self.report_type == 'weekly':
            self._add_weekly_content()
        elif self.report_type == 'project':
            self._add_project_content()
        elif self.report_type == 'analysis':
            self._add_analysis_content()
    
    def _add_weekly_content(self):
        """添加周报内容"""
        # 本周完成
        self.doc.add_heading('一、本周完成工作', level=1)
        for item in self.content_points.get('completed', []):
            self.doc.add_paragraph(item, style='List Bullet')
        
        # 下周计划
        self.doc.add_heading('二、下周工作计划', level=1)
        for item in self.content_points.get('plan', []):
            self.doc.add_paragraph(item, style='List Bullet')
    
    def _add_project_content(self):
        """添加项目复盘内容"""
        self.doc.add_heading('一、项目背景', level=1)
        self.doc.add_paragraph(self.content_points.get('background', ''))
        
        self.doc.add_heading('二、执行过程', level=1)
        for item in self.content_points.get('process', []):
            self.doc.add_paragraph(item, style='List Bullet')
        
        self.doc.add_heading('三、成果与数据', level=1)
        self.doc.add_paragraph(self.content_points.get('results', ''))
        
        self.doc.add_heading('四、经验总结', level=1)
        self.doc.add_paragraph(self.content_points.get('lessons', ''))
    
    def _add_analysis_content(self):
        """添加数据分析内容"""
        self.doc.add_heading('一、分析目的', level=1)
        self.doc.add_paragraph(self.content_points.get('purpose', ''))
        
        self.doc.add_heading('二、数据概览', level=1)
        self.doc.add_paragraph(self.content_points.get('overview', ''))
        
        self.doc.add_heading('三、分析结论', level=1)
        self.doc.add_paragraph(self.content_points.get('conclusion', ''))
        
        self.doc.add_heading('四、建议措施', level=1)
        for item in self.content_points.get('recommendations', []):
            self.doc.add_paragraph(item, style='List Bullet')
    
    def _save_report(self):
        """保存报告"""
        filename = f"{self.title}.{self.output_format}"
        self.doc.save(filename)

def main():
    parser = argparse.ArgumentParser(description='生成工作报告')
    parser.add_argument('--report_type', required=True, help='报告类型')
    parser.add_argument('--title', required=True, help='报告标题')
    parser.add_argument('--content_points', required=True, help='内容要点(JSON格式)')
    parser.add_argument('--output_format', default='docx', help='输出格式')
    
    args = parser.parse_args()
    
    generator = ReportGenerator(
        args.report_type,
        args.title,
        args.content_points,
        args.output_format
    )
    result = generator.generate()
    print(result)

if __name__ == '__main__':
    main()`
              },
              { 
                id: 'report-11', 
                name: 'data_analysis_report.py', 
                type: 'file', 
                path: '/scripts/data_analysis_report.py',
                content: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据分析报告生成脚本
基于数据源自动生成可视化分析报告
"""

import argparse
import pandas as pd
import matplotlib.pyplot as plt
from docx import Document
from docx.shared import Inches
import os

class DataAnalysisReport:
    def __init__(self, data_source, analysis_type, chart_types):
        self.data_source = data_source
        self.analysis_type = analysis_type
        self.chart_types = chart_types.split(',')
        self.df = None
        self.doc = Document()
        self.chart_files = []
    
    def load_data(self):
        """加载数据"""
        if self.data_source.endswith('.csv'):
            self.df = pd.read_csv(self.data_source)
        elif self.data_source.endswith(('.xlsx', '.xls')):
            self.df = pd.read_excel(self.data_source)
        else:
            raise ValueError('不支持的数据格式')
    
    def generate_charts(self):
        """生成图表"""
        for chart_type in self.chart_types:
            if chart_type == 'line':
                self._create_line_chart()
            elif chart_type == 'bar':
                self._create_bar_chart()
            elif chart_type == 'pie':
                self._create_pie_chart()
    
    def _create_line_chart(self):
        """创建折线图"""
        plt.figure(figsize=(10, 6))
        for col in self.df.select_dtypes(include=['number']).columns[:3]:
            plt.plot(self.df.index, self.df[col], label=col, marker='o')
        plt.title('趋势分析')
        plt.xlabel('时间')
        plt.ylabel('数值')
        plt.legend()
        plt.grid(True, alpha=0.3)
        filename = 'line_chart.png'
        plt.savefig(filename, dpi=150, bbox_inches='tight')
        self.chart_files.append(filename)
        plt.close()
    
    def _create_bar_chart(self):
        """创建柱状图"""
        plt.figure(figsize=(10, 6))
        numeric_cols = self.df.select_dtypes(include=['number']).columns[:5]
        means = self.df[numeric_cols].mean()
        bars = plt.bar(means.index, means.values, color=['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'])
        plt.title('数据对比')
        plt.xlabel('指标')
        plt.ylabel('平均值')
        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2., height,
                    f'{height:.1f}', ha='center', va='bottom')
        filename = 'bar_chart.png'
        plt.savefig(filename, dpi=150, bbox_inches='tight')
        self.chart_files.append(filename)
        plt.close()
    
    def _create_pie_chart(self):
        """创建饼图"""
        plt.figure(figsize=(8, 8))
        categorical_col = self.df.select_dtypes(include=['object']).columns[0]
        value_counts = self.df[categorical_col].value_counts().head(6)
        colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
        plt.pie(value_counts.values, labels=value_counts.index, autopct='%1.1f%%',
                colors=colors, startangle=90)
        plt.title('分布占比')
        filename = 'pie_chart.png'
        plt.savefig(filename, dpi=150, bbox_inches='tight')
        self.chart_files.append(filename)
        plt.close()
    
    def generate_report(self):
        """生成完整报告"""
        # 标题
        self.doc.add_heading('数据分析报告', level=0)
        
        # 数据概览
        self.doc.add_heading('一、数据概览', level=1)
        self.doc.add_paragraph(f'数据行数: {len(self.df)}')
        self.doc.add_paragraph(f'数据列数: {len(self.df.columns)}')
        self.doc.add_paragraph(f'分析类型: {self.analysis_type}')
        
        # 统计摘要
        self.doc.add_heading('二、统计摘要', level=1)
        summary = self.df.describe()
        table = self.doc.add_table(rows=len(summary)+1, cols=len(summary.columns)+1)
        table.style = 'Light Grid Accent 1'
        
        # 填充表头
        hdr_cells = table.rows[0].cells
        hdr_cells[0].text = '统计量'
        for i, col in enumerate(summary.columns):
            hdr_cells[i+1].text = str(col)
        
        # 填充数据
        for i, (index, row) in enumerate(summary.iterrows()):
            row_cells = table.rows[i+1].cells
            row_cells[0].text = str(index)
            for j, val in enumerate(row):
                row_cells[j+1].text = f'{val:.2f}'
        
        # 可视化图表
        self.doc.add_heading('三、可视化分析', level=1)
        for chart_file in self.chart_files:
            self.doc.add_picture(chart_file, width=Inches(5.5))
            self.doc.add_paragraph()
        
        # 保存报告
        self.doc.save('数据分析报告.docx')
        
        # 清理临时文件
        for f in self.chart_files:
            if os.path.exists(f):
                os.remove(f)
        
        return '数据分析报告已生成: 数据分析报告.docx'

def main():
    parser = argparse.ArgumentParser(description='生成数据分析报告')
    parser.add_argument('--data_source', required=True, help='数据源路径')
    parser.add_argument('--analysis_type', required=True, help='分析类型')
    parser.add_argument('--chart_types', required=True, help='图表类型(逗号分隔)')
    
    args = parser.parse_args()
    
    report = DataAnalysisReport(args.data_source, args.analysis_type, args.chart_types)
    report.load_data()
    report.generate_charts()
    result = report.generate_report()
    print(result)

if __name__ == '__main__':
    main()`
              },
              { 
                id: 'report-12', 
                name: 'meeting_minutes.py', 
                type: 'file', 
                path: '/scripts/meeting_minutes.py',
                content: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
会议纪要生成脚本
自动整理会议内容，生成结构化会议纪要
"""

import argparse
import json
from datetime import datetime
from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

class MeetingMinutesGenerator:
    def __init__(self, meeting_info, output_format='docx'):
        self.meeting_info = json.loads(meeting_info) if isinstance(meeting_info, str) else meeting_info
        self.output_format = output_format
        self.doc = Document()
    
    def generate(self):
        """生成会议纪要"""
        self._add_header()
        self._add_basic_info()
        self._add_attendees()
        self._add_agenda()
        self._add_discussion()
        self._add_decisions()
        self._add_action_items()
        self._save()
        return f"会议纪要已生成: 会议纪要_{self.meeting_info.get('date', '')}.{self.output_format}"
    
    def _add_header(self):
        """添加标题"""
        title = self.doc.add_heading('会议纪要', level=0)
        title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    def _add_basic_info(self):
        """添加基本信息"""
        self.doc.add_heading('一、会议信息', level=1)
        info = self.meeting_info
        self.doc.add_paragraph(f'会议主题: {info.get("topic", "")}')
        self.doc.add_paragraph(f'会议时间: {info.get("date", "")} {info.get("time", "")}')
        self.doc.add_paragraph(f'会议地点: {info.get("location", "")}')
        self.doc.add_paragraph(f'记录人: {info.get("recorder", "")}')
    
    def _add_attendees(self):
        """添加参会人员"""
        self.doc.add_heading('二、参会人员', level=1)
        attendees = self.meeting_info.get('attendees', [])
        self.doc.add_paragraph('出席人员: ' + '、'.join(attendees.get('present', [])))
        self.doc.add_paragraph('缺席人员: ' + '、'.join(attendees.get('absent', [])))
    
    def _add_agenda(self):
        """添加会议议程"""
        self.doc.add_heading('三、会议议程', level=1)
        for i, item in enumerate(self.meeting_info.get('agenda', []), 1):
            self.doc.add_paragraph(f'{i}. {item}', style='List Number')
    
    def _add_discussion(self):
        """添加讨论内容"""
        self.doc.add_heading('四、讨论内容', level=1)
        for topic, content in self.meeting_info.get('discussion', {}).items():
            self.doc.add_heading(topic, level=2)
            for point in content:
                self.doc.add_paragraph(point, style='List Bullet')
    
    def _add_decisions(self):
        """添加决议事项"""
        self.doc.add_heading('五、决议事项', level=1)
        for decision in self.meeting_info.get('decisions', []):
            self.doc.add_paragraph(decision, style='List Bullet')
    
    def _add_action_items(self):
        """添加行动项"""
        self.doc.add_heading('六、行动项', level=1)
        table = self.doc.add_table(rows=1, cols=4)
        table.style = 'Light Grid Accent 1'
        hdr_cells = table.rows[0].cells
        hdr_cells[0].text = '事项'
        hdr_cells[1].text = '负责人'
        hdr_cells[2].text = '截止日期'
        hdr_cells[3].text = '状态'
        
        for item in self.meeting_info.get('action_items', []):
            row_cells = table.add_row().cells
            row_cells[0].text = item.get('task', '')
            row_cells[1].text = item.get('owner', '')
            row_cells[2].text = item.get('deadline', '')
            row_cells[3].text = item.get('status', '待办')
    
    def _save(self):
        """保存文档"""
        filename = f"会议纪要_{self.meeting_info.get('date', datetime.now().strftime('%Y%m%d'))}.{self.output_format}"
        self.doc.save(filename)

def main():
    parser = argparse.ArgumentParser(description='生成会议纪要')
    parser.add_argument('--meeting_info', required=True, help='会议信息(JSON格式)')
    parser.add_argument('--output_format', default='docx', help='输出格式')
    
    args = parser.parse_args()
    
    generator = MeetingMinutesGenerator(args.meeting_info, args.output_format)
    result = generator.generate()
    print(result)

if __name__ == '__main__':
    main()`
              },
            ],
          },
          {
            id: 'report-13',
            name: 'templates',
            type: 'folder',
            path: '/templates',
            children: [
              { 
                id: 'report-14', 
                name: 'weekly-template.docx', 
                type: 'file', 
                path: '/templates/weekly-template.docx'
              },
              { 
                id: 'report-15', 
                name: 'project-template.docx', 
                type: 'file', 
                path: '/templates/project-template.docx'
              },
              { 
                id: 'report-16', 
                name: 'analysis-template.docx', 
                type: 'file', 
                path: '/templates/analysis-template.docx'
              },
            ],
          },
          {
            id: 'report-17',
            name: 'config',
            type: 'folder',
            path: '/config',
            children: [
              { 
                id: 'report-18', 
                name: 'report-styles.json', 
                type: 'file', 
                path: '/config/report-styles.json',
                content: `{
  "fonts": {
    "title": "Microsoft YaHei",
    "body": "SimSun",
    "code": "Consolas"
  },
  "colors": {
    "primary": "#1890ff",
    "secondary": "#52c41a",
    "warning": "#faad14",
    "error": "#f5222d"
  },
  "sizes": {
    "title": 18,
    "heading1": 16,
    "heading2": 14,
    "body": 12
  }
}`
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'write-code',
    displayName: '写代码',
    description: '编写高质量、可维护的代码。支持前端（React/Vue/HTML）、后端（Python/Node/Java）、数据库...',
    tags: ['生成创作', 'Python开发'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '5',
    name: 'wechat-private-marketing',
    displayName: '微信私域营销',
    description: '当用户需要在微信生态进行私域流量运营和自动化客户互动时使用此技能。适用于自动回复客户咨询、群发...',
    tags: ['对话交互', '客户营销', '新硬件支持'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-01-20',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '6',
    name: 'douyin-short-video',
    displayName: '抖音短视频运营',
    description: '当用户需要在抖音平台进行本地化获客、同城流量运营和私域引流时使用此技能。适用于同城账号冷启动...',
    tags: ['对话交互', '客户营销', '新硬件支持'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-01-20',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '7',
    name: 'document-skills',
    displayName: '文档处理套件',
    description: '文档处理套件集合，包含Excel、Word、PowerPoint和PDF处理能力。支持文档格式转换、内容提取、批量处理等功能。',
    tags: ['skills', '文档处理', '办公自动化'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '8',
    name: 'data-analysis',
    displayName: '数据分析',
    description: '数据分析插件，支持Excel电子表格创建、编辑和分析功能。支持公式计算、格式设置、数据分析和可视化。还包括通过搜狗搜索微信文章的功能...',
    tags: ['skills', 'rules', '数据分析'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-02-05',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '9',
    name: 'ppt-implement',
    displayName: 'PPT生成助手',
    description: '智能PPT生成助手，一键将您的想法转化为精美演示文稿。支持多种模板风格，自动排版美化。',
    tags: ['skills', 'hooks', 'PPT生成'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-02-10',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '10',
    name: 'deep-research',
    displayName: '深度研究',
    description: '深度研究插件，支持全面的网络研究、信息综合和知识发现。支持多源研究、事实核查和结构化报告生成。',
    tags: ['skills', 'agents', 'rules', '研究分析'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '11',
    name: 'data',
    displayName: '数据洞察',
    description: '数据分析插件，支持SQL查询、数据探索、可视化、仪表板构建和洞察生成。包含完整的数据分析工作流程和最佳实践。',
    tags: ['skills', 'rules', '数据可视化'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-02-20',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '12',
    name: 'design-to-code',
    displayName: '设计转代码',
    description: '将Figma设计和截图转换为生产就绪的代码组件，内置无障碍性支持。支持React、Vue、HTML等多种前端框架。',
    tags: ['skills', 'mcp', 'rules', '前端开发'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-02-25',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '13',
    name: 'skill-creator',
    displayName: '技能创作助手',
    description: '提供创建高效Claude技能的指南，通过专业知识、工作流程和工具集成来扩展AI助手的能力。',
    tags: ['skills', 'AI技能', '开发工具'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '14',
    name: 'internal-comms',
    displayName: '内部通讯助手',
    description: '一套帮助使用公司偏好格式编写内部通讯的资源（状态报告、3P更新、新闻通讯、常见问题解答、事件报告等）。',
    tags: ['skills', '企业办公', '通讯协作'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-03-05',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '15',
    name: 'executing-marketing-campaigns',
    displayName: '营销活动执行',
    description: '规划、创建和优化营销活动，包括内容策略、社交媒体、电子邮件和数据分析。提供完整的营销工作流程管理。',
    tags: ['skills', '市场营销', '活动管理'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-03-08',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '16',
    name: 'general-skills',
    displayName: '通用技能集合',
    description: '通用技能集合，包括文档转换、技能发现、UI/UX设计和前端开发能力。一站式解决常见开发需求。',
    tags: ['skills', 'agents', 'rules', '通用工具'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '17',
    name: 'smart-customer-service',
    displayName: '智能客服助手',
    description: '基于AI的智能客服解决方案，支持多轮对话、意图识别、知识库检索。可自动处理常见客户咨询，提升服务效率。',
    tags: ['skills', 'agents', '客服系统'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-03-12',
    updatedAt: '2024-03-12',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '18',
    name: 'content-generator',
    displayName: '内容生成器',
    description: 'AI驱动的内容创作工具，支持文章、博客、产品描述、广告文案等多种内容类型的自动生成和优化。',
    tags: ['skills', 'rules', '内容创作'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '19',
    name: 'meeting-assistant',
    displayName: '会议助手',
    description: '智能会议管理工具，支持会议记录、语音转文字、待办事项提取和会议纪要自动生成。',
    tags: ['skills', 'hooks', '会议管理'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-03-18',
    updatedAt: '2024-03-18',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
  {
    id: '20',
    name: 'code-reviewer',
    displayName: '代码审查助手',
    description: '自动化代码审查工具，支持多种编程语言的代码质量检查、安全漏洞扫描和最佳实践建议。',
    tags: ['skills', 'mcp', 'rules', '代码质量'],
    status: 'published',
    creator: '官方',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    version: 'V1',
    isOfficial: true,
    files: [],
  },
];

export const mockDebugSessions: DebugSession[] = [
  {
    id: '1',
    skillId: '1',
    messages: [
      {
        id: '1',
        agentId: 'debug',
        role: 'user',
        content: '创建一个小红书爆款文章每天获取的skill',
        timestamp: '2024-03-10 14:00:00',
      },
      {
        id: '2',
        agentId: 'debug',
        role: 'assistant',
        content: '好的，开始小红书爆款文章每天获取的 Skill。\n\n创建文件：./xiaohongshu-hot-posts/SKILL.md\n创建文件：./xiaohongshu-hot-posts/scripts/fetch_hot_posts.py\n创建文件：./xiaohongshu-hot-posts/references/api-guide.md\n创建文件：./xiaohongshu-hot-posts/scripts/fetch_hot_posts.py\n\n所有文件已创建完成，现在进行打包。\n小红书爆款文章获取 Skill 已创建完成',
        timestamp: '2024-03-10 14:00:05',
      },
    ],
    logs: [
      { id: '1', timestamp: '14:00:00', level: 'info', message: '开始创建 Skill...' },
      { id: '2', timestamp: '14:00:01', level: 'info', message: '创建文件：SKILL.md' },
      { id: '3', timestamp: '14:00:02', level: 'info', message: '创建文件：scripts/fetch_hot_posts.py' },
      { id: '4', timestamp: '14:00:03', level: 'info', message: '创建文件：references/api-guide.md' },
      { id: '5', timestamp: '14:00:04', level: 'info', message: '打包 Skill...' },
      { id: '6', timestamp: '14:00:05', level: 'info', message: 'Skill 创建完成' },
    ],
    status: 'completed',
    createdAt: '2024-03-10 14:00:00',
  },
  // 石化行业报告会话记录 - 写报告技能 (skillId: '3')
  {
    id: 'report-1',
    skillId: '3',
    messages: [
      {
        id: 'r1-1',
        agentId: 'debug',
        role: 'user',
        content: '请帮我生成一份2024年第三季度聚乙烯（PE）市场分析报告，需要包含价格走势、供需分析和未来预测',
        timestamp: '2024-10-15 09:00:00',
      },
      {
        id: 'r1-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定报告类型：数据分析报告\n2. 分析需求：PE市场分析，需要价格走势、供需分析、未来预测\n3. 数据来源：石化行业数据库、期货市场价格数据\n4. 报告结构：市场概况→价格走势→供需分析→未来预测→投资建议\n\n【执行步骤】\n✓ 调用 data_analysis_report.py 加载PE价格数据\n✓ 生成价格趋势折线图和供需对比柱状图\n✓ 整合市场分析文本\n✓ 生成Word格式报告\n\n【报告输出】\n📄 《2024年Q3聚乙烯（PE）市场分析报告.docx》已生成\n- 报告页数：28页\n- 包含图表：12个（价格趋势图、供需对比图、产能分布图等）\n- 核心结论：Q3 PE价格先涨后跌，均价较Q2上涨5.3%，预计Q4维持震荡格局',
        timestamp: '2024-10-15 09:02:30',
      },
    ],
    logs: [
      { id: 'r1-l1', timestamp: '09:00:00', level: 'info', message: '接收到PE市场分析请求' },
      { id: 'r1-l2', timestamp: '09:00:15', level: 'info', message: '加载数据源：pe_price_q3_2024.csv' },
      { id: 'r1-l3', timestamp: '09:00:45', level: 'info', message: '生成价格趋势折线图' },
      { id: 'r1-l4', timestamp: '09:01:20', level: 'info', message: '生成供需对比柱状图' },
      { id: 'r1-l5', timestamp: '09:01:50', level: 'info', message: '整合市场分析文本内容' },
      { id: 'r1-l6', timestamp: '09:02:30', level: 'success', message: '报告生成完成：2024年Q3聚乙烯（PE）市场分析报告.docx' },
    ],
    status: 'completed',
    createdAt: '2024-10-15 09:00:00',
  },
  {
    id: 'report-2',
    skillId: '3',
    messages: [
      {
        id: 'r2-1',
        agentId: 'debug',
        role: 'user',
        content: '生成一份聚丙烯（PP）产业链周报，时间范围是2024年10月第2周，重点关注原料丙烯价格和下游需求变化',
        timestamp: '2024-10-14 14:30:00',
      },
      {
        id: 'r2-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定报告类型：周报\n2. 时间范围：2024年10月第2周（10.8-10.14）\n3. 核心关注点：丙烯原料价格、下游需求（注塑、纤维、薄膜）\n4. 产业链分析：丙烯→聚丙烯→下游制品\n\n【执行步骤】\n✓ 调用 generate_report.py 生成周报框架\n✓ 收集丙烯价格数据（山东地炼、进口丙烯）\n✓ 统计PP各品种价格变化（拉丝、共聚、均聚）\n✓ 分析下游开工率变化\n✓ 整合生成周报\n\n【报告输出】\n📄 《聚丙烯（PP）产业链周报_2024W41.docx》已生成\n- 报告页数：15页\n- 核心数据：\n  • 丙烯价格：山东地炼均价7150元/吨，周环比+2.1%\n  • PP拉丝：华东均价7850元/吨，周环比+1.5%\n  • 下游开工：注塑73%（+2%）、BOPP 62%（-1%）、纤维58%（持平）\n- 市场观点：原料支撑较强，但下游需求跟进缓慢，预计短期PP价格高位震荡',
        timestamp: '2024-10-14 14:35:45',
      },
    ],
    logs: [
      { id: 'r2-l1', timestamp: '14:30:00', level: 'info', message: '接收到PP产业链周报请求' },
      { id: 'r2-l2', timestamp: '14:30:20', level: 'info', message: '收集丙烯价格数据' },
      { id: 'r2-l3', timestamp: '14:31:30', level: 'info', message: '统计PP各品种价格' },
      { id: 'r2-l4', timestamp: '14:32:45', level: 'info', message: '分析下游开工率数据' },
      { id: 'r2-l5', timestamp: '14:34:00', level: 'info', message: '生成产业链分析图表' },
      { id: 'r2-l6', timestamp: '14:35:45', level: 'success', message: '周报生成完成' },
    ],
    status: 'completed',
    createdAt: '2024-10-14 14:30:00',
  },
  {
    id: 'report-3',
    skillId: '3',
    messages: [
      {
        id: 'r3-1',
        agentId: 'debug',
        role: 'user',
        content: '帮我写一份关于PTA（精对苯二甲酸）行业2024年前三季度的项目复盘报告，重点分析新增产能投放情况和盈利能力变化',
        timestamp: '2024-10-10 10:00:00',
      },
      {
        id: 'r3-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定报告类型：项目复盘报告\n2. 分析维度：产能投放、盈利能力、市场竞争格局\n3. 时间跨度：2024年1-9月\n4. 关键指标：产能利用率、加工费、PX-PTA价差、库存水平\n\n【执行步骤】\n✓ 调用 generate_report.py 生成复盘报告框架\n✓ 整理2024年新增产能数据（恒力、逸盛、桐昆等项目）\n✓ 分析PTA加工费变化趋势\n✓ 计算行业平均盈利水平\n✓ 评估产能投放对市场的影响\n\n【报告输出】\n📄 《PTA行业2024年前三季度项目复盘报告.docx》已生成\n- 报告页数：32页\n- 核心内容：\n  • 新增产能：2024年1-9月累计新增产能540万吨，同比增长12.3%\n  • 加工费走势：Q1均价420元/吨，Q2降至380元/吨，Q3回升至410元/吨\n  • 行业利润：平均吨利润185元，同比下降23%\n  • 产能利用率：行业平均82%，较2023年同期下降5个百分点\n  • 关键结论：产能集中投放导致供应宽松，加工费压缩，行业进入微利时代',
        timestamp: '2024-10-10 10:08:20',
      },
    ],
    logs: [
      { id: 'r3-l1', timestamp: '10:00:00', level: 'info', message: '接收到PTA行业复盘报告请求' },
      { id: 'r3-l2', timestamp: '10:01:00', level: 'info', message: '整理2024年新增产能数据' },
      { id: 'r3-l3', timestamp: '10:03:30', level: 'info', message: '分析PTA加工费月度数据' },
      { id: 'r3-l4', timestamp: '10:05:00', level: 'info', message: '计算行业盈利水平' },
      { id: 'r3-l5', timestamp: '10:06:45', level: 'info', message: '生成产能投放影响分析' },
      { id: 'r3-l6', timestamp: '10:08:20', level: 'success', message: '复盘报告生成完成' },
    ],
    status: 'completed',
    createdAt: '2024-10-10 10:00:00',
  },
  {
    id: 'report-4',
    skillId: '3',
    messages: [
      {
        id: 'r4-1',
        agentId: 'debug',
        role: 'user',
        content: '生成一份甲醇市场月度分析报告，2024年9月份，需要包含进出口数据、港口库存变化和下游MTO开工情况',
        timestamp: '2024-10-08 16:00:00',
      },
      {
        id: 'r4-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定报告类型：月度分析报告\n2. 时间范围：2024年9月\n3. 核心数据：进出口、港口库存、MTO开工率\n4. 价格分析：期货价格、现货价格、基差变化\n\n【执行步骤】\n✓ 调用 data_analysis_report.py 加载甲醇数据\n✓ 统计9月进出口数据（进口量、出口量、主要来源国）\n✓ 分析港口库存变化趋势（华东、华南）\n✓ 统计MTO装置开工率\n✓ 生成价格走势和关联分析图表\n\n【报告输出】\n📄 《甲醇市场月度分析报告_2024年9月.docx》已生成\n- 报告页数：22页\n- 核心数据：\n  • 进口量：128.5万吨，环比+15.3%，同比+8.7%\n  • 港口库存：华东105万吨（+12万吨）、华南28万吨（+3万吨）\n  • MTO开工率：平均78%，较8月下降6个百分点\n  • 现货价格：江苏均价2550元/吨，环比+3.2%\n  • 基差分析：基差走强，现货升水期货50-80元/吨\n- 市场观点：进口增加叠加MTO降负荷，供需宽松，预计10月价格承压运行',
        timestamp: '2024-10-08 16:06:15',
      },
    ],
    logs: [
      { id: 'r4-l1', timestamp: '16:00:00', level: 'info', message: '接收到甲醇月度分析报告请求' },
      { id: 'r4-l2', timestamp: '16:01:00', level: 'info', message: '统计9月进出口数据' },
      { id: 'r4-l3', timestamp: '16:02:30', level: 'info', message: '分析港口库存变化' },
      { id: 'r4-l4', timestamp: '16:03:45', level: 'info', message: '统计MTO开工率数据' },
      { id: 'r4-l5', timestamp: '16:04:50', level: 'info', message: '生成价格走势图表' },
      { id: 'r4-l6', timestamp: '16:06:15', level: 'success', message: '月度分析报告生成完成' },
    ],
    status: 'completed',
    createdAt: '2024-10-08 16:00:00',
  },
  {
    id: 'report-5',
    skillId: '3',
    messages: [
      {
        id: 'r5-1',
        agentId: 'debug',
        role: 'user',
        content: '写一份关于纯苯-苯乙烯产业链的会议纪要，会议主题是"2024年四季度市场展望"，参会方包括中石化、中石油、万华化学、华泰化工',
        timestamp: '2024-10-05 09:30:00',
      },
      {
        id: 'r5-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定文档类型：会议纪要\n2. 会议主题：纯苯-苯乙烯产业链2024年四季度市场展望\n3. 参会单位：中石化、中石油、万华化学、华泰化工\n4. 讨论要点：纯苯供应、苯乙烯产能、下游需求、价格预测\n\n【执行步骤】\n✓ 调用 meeting_minutes.py 生成会议纪要框架\n✓ 整理会议基本信息和议程\n✓ 记录各方观点（供应端、需求端、贸易商）\n✓ 总结决议事项和行动项\n\n【报告输出】\n📄 《纯苯-苯乙烯产业链市场展望会议纪要_20241005.docx》已生成\n- 会议时间：2024年10月5日 14:00-17:30\n- 会议地点：上海石化会议中心\n- 参会人员：\n  • 中石化：张明（销售总监）、李华（市场分析师）\n  • 中石油：王强（化工事业部经理）\n  • 万华化学：陈工（采购经理）\n  • 华泰化工：刘总（贸易部总经理）\n- 核心观点：\n  • 中石化：Q4纯苯供应偏紧，炼厂检修影响产量\n  • 万华化学：苯乙烯新装置投产进度延后，供应压力暂缓\n  • 华泰化工：下游EPS需求进入淡季，采购意愿减弱\n- 决议事项：\n  • 建立月度价格协调机制\n  • 加强库存信息共享\n  • 联合开展市场调研',
        timestamp: '2024-10-05 09:38:40',
      },
    ],
    logs: [
      { id: 'r5-l1', timestamp: '09:30:00', level: 'info', message: '接收到会议纪要生成请求' },
      { id: 'r5-l2', timestamp: '09:31:00', level: 'info', message: '整理会议基本信息' },
      { id: 'r5-l3', timestamp: '09:33:00', level: 'info', message: '记录各方观点和讨论内容' },
      { id: 'r5-l4', timestamp: '09:35:00', level: 'info', message: '总结决议事项' },
      { id: 'r5-l5', timestamp: '09:36:30', level: 'info', message: '整理行动项和责任人' },
      { id: 'r5-l6', timestamp: '09:38:40', level: 'success', message: '会议纪要生成完成' },
    ],
    status: 'completed',
    createdAt: '2024-10-05 09:30:00',
  },
  {
    id: 'report-6',
    skillId: '3',
    messages: [
      {
        id: 'r6-1',
        agentId: 'debug',
        role: 'user',
        content: '帮我生成一份乙二醇（MEG）进口数据分析报告，分析2024年1-8月的进口来源国变化和价格趋势',
        timestamp: '2024-09-28 11:00:00',
      },
      {
        id: 'r6-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定报告类型：数据分析报告\n2. 时间范围：2024年1-8月\n3. 分析维度：进口来源国、进口量变化、CFR价格趋势\n4. 主要来源国：沙特、加拿大、新加坡、韩国、伊朗\n\n【执行步骤】\n✓ 调用 data_analysis_report.py 加载MEG进口数据\n✓ 统计各来源国进口量占比变化\n✓ 分析CFR中国主港价格走势\n✓ 计算进口成本与国内价格价差\n✓ 生成来源国分布饼图和价格趋势图\n\n【报告输出】\n📄 《乙二醇（MEG）进口数据分析报告_2024年1-8月.docx》已生成\n- 报告页数：26页\n- 核心数据：\n  • 总进口量：658.3万吨，同比+6.2%\n  • 来源国分布：\n    - 沙特：38.5%（253.5万吨，同比+12%）\n    - 加拿大：22.1%（145.5万吨，同比-3%）\n    - 新加坡：15.8%（104.0万吨，同比+8%）\n    - 韩国：12.3%（81.0万吨，同比-5%）\n    - 伊朗：6.5%（42.8万吨，同比+25%）\n  • CFR价格：1-8月均价528美元/吨，同比-8.5%\n  • 进口利润：平均亏损150元/吨，进口窗口多数时间关闭\n- 趋势分析：沙特货源占比提升，伊朗货源恢复性增长，进口整体呈现"量增价跌"格局',
        timestamp: '2024-09-28 11:09:30',
      },
    ],
    logs: [
      { id: 'r6-l1', timestamp: '11:00:00', level: 'info', message: '接收到MEG进口数据分析请求' },
      { id: 'r6-l2', timestamp: '11:01:30', level: 'info', message: '统计各来源国进口量' },
      { id: 'r6-l3', timestamp: '11:04:00', level: 'info', message: '分析CFR价格走势' },
      { id: 'r6-l4', timestamp: '11:05:45', level: 'info', message: '计算进口成本与价差' },
      { id: 'r6-l5', timestamp: '11:07:00', level: 'info', message: '生成来源国分布图表' },
      { id: 'r6-l6', timestamp: '11:09:30', level: 'success', message: '进口数据分析报告生成完成' },
    ],
    status: 'completed',
    createdAt: '2024-09-28 11:00:00',
  },
  {
    id: 'report-7',
    skillId: '3',
    messages: [
      {
        id: 'r7-1',
        agentId: 'debug',
        role: 'user',
        content: '生成一份关于聚碳酸酯（PC）行业的可行性分析报告，评估在华东地区新建年产20万吨PC装置的投资可行性',
        timestamp: '2024-09-20 13:00:00',
      },
      {
        id: 'r7-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定报告类型：可行性分析报告\n2. 项目概况：华东地区、年产20万吨PC装置\n3. 分析维度：市场供需、技术路线、投资估算、财务评价、风险评估\n4. 原料路线：双酚A+光气法 / 双酚A+熔融酯交换法\n\n【执行步骤】\n✓ 调用 generate_report.py 生成可行性分析报告框架\n✓ 分析PC市场供需现状和预测（2024-2030年）\n✓ 评估技术路线（光气法vs非光气法）\n✓ 编制投资估算表（建设投资、流动资金）\n✓ 进行财务评价（NPV、IRR、投资回收期）\n✓ 识别项目风险并提出对策\n\n【报告输出】\n📄 《华东地区20万吨/年聚碳酸酯（PC）项目可行性研究报告.docx》已生成\n- 报告页数：68页\n- 核心内容：\n  • 市场分析：2024年国内PC产能285万吨，需求218万吨，进口依赖度35%\n  • 技术路线：推荐非光气熔融酯交换法（环保、安全、成本优势）\n  • 投资估算：总投资28.5亿元（建设投资25.2亿，流动资金3.3亿）\n  • 财务评价：\n    - 项目资本金净利润率：18.6%\n    - 投资回收期（税后）：7.8年\n    - 财务内部收益率（税后）：16.2%\n    - 财务净现值（i=12%）：8.7亿元\n  • 风险分析：原料价格波动风险、市场竞争风险、技术风险、环保政策风险\n- 结论建议：项目财务指标良好，建议推进实施，但需关注原料双酚A供应保障',
        timestamp: '2024-09-20 13:18:45',
      },
    ],
    logs: [
      { id: 'r7-l1', timestamp: '13:00:00', level: 'info', message: '接收到PC项目可行性分析请求' },
      { id: 'r7-l2', timestamp: '13:02:00', level: 'info', message: '分析PC市场供需现状' },
      { id: 'r7-l3', timestamp: '13:05:30', level: 'info', message: '评估技术路线方案' },
      { id: 'r7-l4', timestamp: '13:09:00', level: 'info', message: '编制投资估算表' },
      { id: 'r7-l5', timestamp: '13:13:00', level: 'info', message: '进行财务评价计算' },
      { id: 'r7-l6', timestamp: '13:16:00', level: 'info', message: '识别项目风险' },
      { id: 'r7-l7', timestamp: '13:18:45', level: 'success', message: '可行性分析报告生成完成' },
    ],
    status: 'completed',
    createdAt: '2024-09-20 13:00:00',
  },
  {
    id: 'report-8',
    skillId: '3',
    messages: [
      {
        id: 'r8-1',
        agentId: 'debug',
        role: 'user',
        content: '写一份苯酚-丙酮产业链的年度总结报告，2024年，重点回顾价格走势、产能变化和下游双酚A需求情况',
        timestamp: '2024-09-15 10:00:00',
      },
      {
        id: 'r8-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定报告类型：年度总结报告\n2. 时间范围：2024年1-9月（前三季度总结）\n3. 产业链结构：纯苯→苯酚/丙酮→双酚A→PC/环氧树脂\n4. 核心指标：苯酚价格、丙酮价格、产能利用率、双酚A需求\n\n【执行步骤】\n✓ 调用 generate_report.py 生成年度总结报告框架\n✓ 分析苯酚-丙酮价格走势（华东市场价）\n✓ 统计2024年新增产能投放情况\n✓ 评估下游双酚A需求变化\n✓ 计算产业链利润分配\n✓ 展望2025年市场趋势\n\n【报告输出】\n📄 《苯酚-丙酮产业链2024年度总结报告.docx》已生成\n- 报告页数：35页\n- 核心数据：\n  • 价格走势：\n    - 苯酚：1-9月均价7850元/吨，同比+3.2%，最高8450元/吨（4月），最低7200元/吨（1月）\n    - 丙酮：1-9月均价6250元/吨，同比+8.5%，最高6850元/吨（6月），最低5650元/吨（2月）\n  • 产能变化：\n    - 2024年新增苯酚产能68万吨（利华益、万华化学）\n    - 2024年新增丙酮产能42万吨\n    - 行业总产能：苯酚485万吨，丙酮302万吨\n  • 下游需求：\n    - 双酚A产量：215万吨，同比+15%，拉动苯酚需求178万吨\n    - 酚醛树脂需求：基本稳定，约85万吨\n    - 异丙醇/MMA需求：丙酮需求约45万吨\n  • 产业链利润：\n    - 苯酚-纯苯价差：平均1850元/吨，同比下降8%\n    - 丙酮-丙烯价差：平均1650元/吨，同比上升12%\n- 2025年展望：预计新增产能放缓，下游双酚A持续扩张，苯酚-丙酮价格有望维持高位',
        timestamp: '2024-09-15 10:11:20',
      },
    ],
    logs: [
      { id: 'r8-l1', timestamp: '10:00:00', level: 'info', message: '接收到苯酚-丙酮年度总结请求' },
      { id: 'r8-l2', timestamp: '10:02:00', level: 'info', message: '分析价格走势数据' },
      { id: 'r8-l3', timestamp: '10:04:30', level: 'info', message: '统计新增产能情况' },
      { id: 'r8-l4', timestamp: '10:06:45', level: 'info', message: '评估下游双酚A需求' },
      { id: 'r8-l5', timestamp: '10:08:00', level: 'info', message: '计算产业链利润分配' },
      { id: 'r8-l6', timestamp: '10:09:30', level: 'info', message: '生成2025年市场展望' },
      { id: 'r8-l7', timestamp: '10:11:20', level: 'success', message: '年度总结报告生成完成' },
    ],
    status: 'completed',
    createdAt: '2024-09-15 10:00:00',
  },
  {
    id: 'report-9',
    skillId: '3',
    messages: [
      {
        id: 'r9-1',
        agentId: 'debug',
        role: 'user',
        content: '生成一份关于EVA（乙烯-醋酸乙烯共聚物）光伏料市场的专题分析报告，分析2024年光伏行业需求对EVA市场的影响',
        timestamp: '2024-09-10 14:00:00',
      },
      {
        id: 'r9-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定报告类型：专题分析报告\n2. 分析主题：EVA光伏料市场\n3. 核心关联：光伏装机量→光伏胶膜需求→EVA光伏料需求\n4. 产品细分：EVA光伏料（VA含量28-33%）、EVA电缆料、EVA发泡料\n\n【执行步骤】\n✓ 调用 data_analysis_report.py 加载EVA市场数据\n✓ 统计2024年光伏装机量和组件产量\n✓ 分析EVA光伏料需求量和价格走势\n✓ 评估国产EVA光伏料替代进口进度\n✓ 分析主要生产企业产能和开工情况\n✓ 预测2025年光伏料需求\n\n【报告输出】\n📄 《EVA光伏料市场专题分析报告_2024年.docx》已生成\n- 报告页数：30页\n- 核心数据：\n  • 光伏行业：\n    - 2024年1-8月国内光伏装机量：152GW，同比+28%\n    - 光伏组件产量：385GW，同比+32%\n    - 光伏胶膜需求量：约42亿平方米\n  • EVA光伏料需求：\n    - 2024年1-8月需求量：98.5万吨，同比+35%\n    - 光伏料占比：EVA总需求的62%（2023年为55%）\n    - 进口依赖度：45%（主要来源：韩华、LG、台塑）\n  • 价格走势：\n    - EVA光伏料均价：13800元/吨，同比-12%\n    - 价格区间：12500-15200元/吨\n    - 与发泡料价差：2800元/吨（光伏料溢价）\n  • 产能格局：\n    - 国产光伏料产能：斯尔邦、联泓新科、宁波台塑合计85万吨\n    - 实际产量：1-8月国产光伏料54万吨，同比+45%\n    - 进口量：44.5万吨，同比+18%\n- 趋势预测：预计2025年光伏料需求145万吨，国产替代加速，进口依赖度降至35%以下',
        timestamp: '2024-09-10 14:10:30',
      },
    ],
    logs: [
      { id: 'r9-l1', timestamp: '14:00:00', level: 'info', message: '接收到EVA光伏料专题分析请求' },
      { id: 'r9-l2', timestamp: '14:01:30', level: 'info', message: '统计光伏装机和组件数据' },
      { id: 'r9-l3', timestamp: '14:03:45', level: 'info', message: '分析EVA光伏料需求量' },
      { id: 'r9-l4', timestamp: '14:05:30', level: 'info', message: '评估国产替代进度' },
      { id: 'r9-l5', timestamp: '14:07:00', level: 'info', message: '统计主要企业产能' },
      { id: 'r9-l6', timestamp: '14:08:30', level: 'info', message: '生成价格走势图表' },
      { id: 'r9-l7', timestamp: '14:10:30', level: 'success', message: '专题分析报告生成完成' },
    ],
    status: 'completed',
    createdAt: '2024-09-10 14:00:00',
  },
  {
    id: 'report-10',
    skillId: '3',
    messages: [
      {
        id: 'r10-1',
        agentId: 'debug',
        role: 'user',
        content: '帮我写一份尼龙66（PA66）产业链的技术文档，详细介绍己二酸-己二胺-尼龙66的生产工艺、技术参数和质量标准',
        timestamp: '2024-09-05 09:00:00',
      },
      {
        id: 'r10-2',
        agentId: 'debug',
        role: 'assistant',
        content: '【思考过程】\n1. 确定文档类型：技术文档\n2. 产业链结构：苯→环己烷→环己醇/酮→己二酸→尼龙66盐→尼龙66\n         丙烯→丙烯腈→己二腈→己二胺→尼龙66盐→尼龙66\n3. 技术内容：生产工艺、反应条件、技术参数、质量标准、设备要求\n4. 产品规格：工业丝级、工程塑料级、薄膜级\n\n【执行步骤】\n✓ 调用 generate_report.py 生成技术文档框架\n✓ 编写己二酸生产工艺（环己烷氧化法、环己烯水合法）\n✓ 编写己二腈/己二胺生产工艺（丁二烯法、丙烯腈电解法、己二酸氨化法）\n✓ 编写尼龙66聚合工艺（连续聚合、间歇聚合）\n✓ 整理技术参数（温度、压力、转化率、选择性）\n✓ 编制产品质量标准（粘度、端基、色度、机械性能）\n✓ 描述主要设备和材质要求\n\n【报告输出】\n📄 《尼龙66（PA66）产业链技术文档.docx》已生成\n- 文档页数：52页\n- 核心内容：\n  • 己二酸生产工艺：\n    - 环己烷氧化法：反应温度150-160℃，压力0.8-1.0MPa，转化率8-10%，选择性85-90%\n    - 环己烯水合法：反应温度100-120℃，选择性99%以上，环保优势明显\n  • 己二腈/己二胺生产工艺：\n    - 丁二烯法（主流）：氯化、氰化、加氢三步反应，己二腈收率92%\n    - 丙烯腈电解法：电耗高，逐步被淘汰\n    - 己二酸氨化法：适合中小规模，己二胺纯度99.5%\n  • 尼龙66聚合工艺：\n    - 连续聚合：产能大（5-20万吨/年），产品质量稳定\n    - 间歇聚合：灵活性高，适合多品种小批量\n    - 聚合温度：280-300℃，压力1.8-2.2MPa，停留时间3-4小时\n  • 技术参数：\n    - 相对粘度：2.4-3.2（工业丝级）、2.6-3.0（工程塑料级）\n    - 端氨基含量：35-50 meq/kg\n    - 端羧基含量：60-90 meq/kg\n    - 含水量：<0.08%\n    - 熔点：255-265℃\n  • 质量标准：\n    - 工业丝级：拉伸强度≥8.0cN/dtex，断裂伸长率25-35%\n    - 工程塑料级：拉伸强度≥80MPa，弯曲模量≥2800MPa\n    - 薄膜级：雾度<3%，拉伸强度≥80MPa\n  • 设备要求：\n    - 反应釜：316L不锈钢，带搅拌和加热系统\n    - 精馏塔：填料塔或板式塔，材质304/316L\n    - 切粒机：水下切粒，产能匹配聚合装置\n- 附录：包含工艺流程图PID、设备一览表、原料产品规格表',
        timestamp: '2024-09-05 09:16:50',
      },
    ],
    logs: [
      { id: 'r10-l1', timestamp: '09:00:00', level: 'info', message: '接收到PA66技术文档请求' },
      { id: 'r10-l2', timestamp: '09:02:00', level: 'info', message: '编写己二酸生产工艺' },
      { id: 'r10-l3', timestamp: '09:04:30', level: 'info', message: '编写己二腈/己二胺工艺' },
      { id: 'r10-l4', timestamp: '09:07:00', level: 'info', message: '编写尼龙66聚合工艺' },
      { id: 'r10-l5', timestamp: '09:10:00', level: 'info', message: '整理技术参数' },
      { id: 'r10-l6', timestamp: '09:13:00', level: 'info', message: '编制质量标准' },
      { id: 'r10-l7', timestamp: '09:15:00', level: 'info', message: '描述设备要求' },
      { id: 'r10-l8', timestamp: '09:16:50', level: 'success', message: '技术文档生成完成' },
    ],
    status: 'completed',
    createdAt: '2024-09-05 09:00:00',
  },
];

export const mockKnowledgeFolders: KnowledgeFolder[] = [
  {
    id: '1',
    name: 'cm测试验收版本管理',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [],
  },
  {
    id: '2',
    name: 'cm测试',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [],
  },
  {
    id: '3',
    name: 'B3837',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [],
  },
  {
    id: '4',
    name: '20251218',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [],
  },
  {
    id: '5',
    name: '线上验收',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [],
  },
  {
    id: '6',
    name: '个人文件夹',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [
      {
        id: '1',
        name: '问答测试文档(2).docx',
        type: 'docx',
        size: '10.18KB',
        status: 'completed',
        version: 'V1',
        creator: 'Lin',
        createdAt: '2024-03-10',
        updatedAt: '2024-03-10',
        canDownload: true,
        assistant: '-',
      },
      {
        id: '2',
        name: '问答测试文档3.docx',
        type: 'docx',
        size: '10.21KB',
        status: 'completed',
        version: 'V1',
        creator: 'Lin',
        createdAt: '2024-03-09',
        updatedAt: '2024-03-09',
        canDownload: true,
        assistant: '-',
      },
      {
        id: '3',
        name: '问答测试文档2.docx',
        type: 'docx',
        size: '10.20KB',
        status: 'completed',
        version: 'V1',
        creator: 'Lin',
        createdAt: '2024-03-08',
        updatedAt: '2024-03-08',
        canDownload: true,
        assistant: '-',
      },
      {
        id: '4',
        name: '问答测试文档1.docx',
        type: 'docx',
        size: '10.18KB',
        status: 'learning',
        version: 'V2',
        creator: 'Lin',
        createdAt: '2024-03-07',
        updatedAt: '2024-03-07',
        canDownload: true,
        assistant: '助理木木',
      },
      {
        id: '5',
        name: '价格表_.docx',
        type: 'docx',
        size: '12.67KB',
        status: 'learning',
        version: 'V1',
        creator: 'Lin',
        createdAt: '2024-03-06',
        updatedAt: '2024-03-06',
        canDownload: true,
        assistant: '助理木木',
      },
    ],
  },
  {
    id: '7',
    name: 'ywh',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [],
  },
  {
    id: '8',
    name: '冯梓航',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [],
  },
  {
    id: '9',
    name: '文件夹',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [],
  },
  {
    id: '10',
    name: 'hjr',
    type: 'personal',
    createdAt: '2024-01-01',
    files: [],
  },
];
