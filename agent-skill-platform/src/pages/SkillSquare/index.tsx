import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Card,
  Tag,
  Avatar,
  Tabs,
  Empty,
  Dropdown,
  Menu,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  ThunderboltOutlined,
  RobotOutlined,
  RightOutlined,
  SendOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  EditOutlined,
  ShareAltOutlined,
  BugOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@/stores';
import { mockSkills } from '@/utils/mockData';
import type { Skill } from '@/types';
import './style.css';

const { TabPane } = Tabs;
const { Meta } = Card;

const SkillSquare = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('discover');
  
  const skills = useAppStore((state) => state.skills);
  const setSkills = useAppStore((state) => state.setSkills);
  const setCurrentSkill = useAppStore((state) => state.setCurrentSkill);

  useEffect(() => {
    setSkills(mockSkills);
  }, []);

  const handleSkillClick = (skill: Skill) => {
    setCurrentSkill(skill);
    navigate(`/skills/${skill.id}`);
  };

  const handleCreateSkill = () => {
    navigate('/skills/create');
  };

  const handleDebugSkill = (skill: Skill, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSkill(skill);
    navigate(`/skills/${skill.id}/debug`);
  };

  const handlePublishSkill = (skill: Skill, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/skills/${skill.id}/publish`);
  };

  const handleUseSkill = (skill: Skill, e: React.MouseEvent) => {
    e.stopPropagation();
    // 在太擎中使用
  };

  const officialSkills = skills.filter((s) => s.isOfficial);
  const mySkills = skills.filter((s) => !s.isOfficial && s.creator !== '官方');

  const filteredOfficialSkills = officialSkills.filter((skill) =>
    skill.displayName.toLowerCase().includes(searchText.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchText.toLowerCase())
  );

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

  const renderSkillCard = (skill: Skill, showActions = false) => (
    <Card
      key={skill.id}
      className="skill-card"
      onClick={() => handleSkillClick(skill)}
      hoverable
    >
      <div className="skill-card-header">
        <div className="skill-icon-wrapper">{getSkillIcon(skill)}</div>
        <div className="skill-name-wrapper">
          <h4 className="skill-name">{skill.displayName}</h4>
          <div className="skill-tags">
            {skill.tags.map((tag) => (
              <Tag key={tag} size="small" className="skill-tag">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
      <p className="skill-description">{skill.description}</p>
      {showActions && (
        <div className="skill-actions">
          <Button
            size="small"
            onClick={(e) => handlePublishSkill(skill, e)}
            className="publish-btn"
          >
            发布上架
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={(e) => handleUseSkill(skill, e)}
            className="use-btn"
          >
            立即使用
          </Button>
          <Button
            type="text"
            size="small"
            icon={<BugOutlined />}
            onClick={(e) => handleDebugSkill(skill, e)}
            className="debug-btn"
          >
            调试
          </Button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="skill-square-page">
      <div className="skill-content">
        {/* Main Content */}
        <div className="skill-main skill-main-full">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="skill-tabs">
            <TabPane tab="发现" key="discover">
              {/* Official Skills */}
              <div className="section">
                <h3 className="section-title">官方出品</h3>
                <div className="skills-grid">
                  {filteredOfficialSkills.map((skill) => renderSkillCard(skill))}
                </div>
              </div>

              {/* Hot Skills */}
              <div className="section">
                <h3 className="section-title">全网热门（999）</h3>
                <div className="hot-skills-banner">
                  <p>发现全网 10w+ 技能，试试通过 发现技能 查询【代码开发】、【爆款文章获取】、【行业研究】等场景</p>
                  <div className="hot-skills-actions">
                    <Button type="primary">发现技能</Button>
                  </div>
                </div>
              </div>
            </TabPane>

            <TabPane tab="创作" key="create">
              <div className="create-skill-section">
                <div className="create-header">
                  <h3>AI 技能创作</h3>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateSkill}
                    className="create-btn"
                  >
                    创建技能
                  </Button>
                </div>
                <div className="create-examples">
                  <h4>创作示例</h4>
                  <div className="example-cards">
                    <Card 
                      className="example-card" 
                      hoverable 
                      onClick={() => navigate('/skills/3')}
                    >
                      <div className="example-icon">📝</div>
                      <h5>写报告</h5>
                      <p>创建一个自动生成工作周报、项目复盘、数据分析报告的技能</p>
                      <Tag color="blue">生成创作</Tag>
                    </Card>
                    <Card className="example-card" hoverable>
                      <div className="example-icon">🔍</div>
                      <h5>数据获取</h5>
                      <p>创建一个从指定网站抓取数据并整理成表格的技能</p>
                      <Tag color="green">数据获取</Tag>
                    </Card>
                    <Card className="example-card" hoverable>
                      <div className="example-icon">💬</div>
                      <h5>智能客服</h5>
                      <p>创建一个自动回复客户咨询、处理常见问题的技能</p>
                      <Tag color="orange">对话交互</Tag>
                    </Card>
                    <Card className="example-card" hoverable>
                      <div className="example-icon">📊</div>
                      <h5>数据分析</h5>
                      <p>创建一个分析Excel数据并生成可视化图表的技能</p>
                      <Tag color="purple">数据分析</Tag>
                    </Card>
                  </div>
                </div>
                <div className="create-chat">
                  <div className="chat-placeholder">
                    <div className="chat-messages">
                      <div className="chat-message ai">
                        <Avatar icon={<RobotOutlined />} style={{ backgroundColor: '#d4a574' }} />
                        <div className="message-content">
                          <p>你好！我是AI技能创作助手。请描述你想要创建的技能，比如：</p>
                          <ul>
                            <li>"创建一个自动生成工作周报的技能"</li>
                            <li>"创建一个抓取小红书热门文章的技能"</li>
                            <li>"创建一个分析销售数据并生成图表的技能"</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="chat-input-area">
                      <Input.TextArea
                        placeholder="描述你想要创建的技能，AI将帮你生成..."
                        autoSize={{ minRows: 3, maxRows: 6 }}
                        className="chat-input"
                      />
                      <Button type="primary" icon={<SendOutlined />} className="send-btn">
                        发送
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>

            <TabPane tab="我的" key="mine">
              <div className="my-skills-section">
                <div className="my-skills-header">
                  <h3>我的技能</h3>
                  <div className="filter-tabs">
                    <Button type="text">全部</Button>
                    <Button type="text">我创建的</Button>
                    <Button type="text">我添加的</Button>
                    <Button type="text">我发布的</Button>
                  </div>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateSkill}
                    className="create-btn"
                  >
                    创建技能
                  </Button>
                </div>
                <div className="skills-list">
                  {mySkills.length > 0 ? (
                    mySkills.map((skill) => renderSkillCard(skill, true))
                  ) : (
                    <Empty description="暂无技能，快去创建一个吧" />
                  )}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SkillSquare;
