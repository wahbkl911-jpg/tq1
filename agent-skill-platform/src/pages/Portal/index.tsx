import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import {
  ArrowRightOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import './style.css';

const Portal = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: '智能体引擎',
      subtitle: 'Agent Engine',
      description: '零代码构建企业级 AI 智能体，让创意瞬间落地',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    },
    {
      title: '知识库',
      subtitle: 'Knowledge Base',
      description: '统一管理企业知识资产，AI 驱动的智能检索',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
    {
      title: '数据分析',
      subtitle: 'Data Analytics',
      description: '深度洞察业务数据，智能生成可视化报表',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
  ];

  const agents = [
    {
      name: '销售助手',
      desc: '智能分析销售数据',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    },
    {
      name: '文档智脑',
      desc: '一键解析文档内容',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    },
    {
      name: '会议管家',
      desc: '自动整理会议纪要',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    },
  ];

  return (
    <div className="apple-portal">
      {/* Hero Section */}
      <section ref={heroRef} className="apple-hero">
        <div 
          className="hero-background"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 1 - scrollY / 800,
          }}
        >
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>太擎智能体平台</span>
          </div>
          
          <h1 className="hero-headline">
            <span className="headline-main">构建您的专属</span>
            <span className="headline-gradient">AI 智能体</span>
          </h1>
          
          <p className="hero-subhead">
            零代码、快速部署、安全可靠
            <br />
            让 AI 成为企业的得力助手
          </p>
          
          <div className="hero-cta">
            <Button 
              className="cta-primary"
              onClick={() => navigate('/agents')}
            >
              免费开始使用
            </Button>
            <Button 
              className="cta-secondary"
              icon={<PlayCircleOutlined />}
            >
              观看演示
            </Button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">智能体</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">50000+</span>
              <span className="stat-label">企业用户</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100000+</span>
              <span className="stat-label">技能数量</span>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="floating-showcase">
          <div 
            className="showcase-card card-main"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          >
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="agent-avatars">
                {agents.map((agent, i) => (
                  <div key={i} className="avatar-item" style={{ animationDelay: `${i * 0.2}s` }}>
                    <img src={agent.avatar} alt={agent.name} />
                    <div className="avatar-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="card-text">
                <span className="typing-text">智能体正在运行...</span>
              </div>
            </div>
          </div>
          
          <div 
            className="showcase-card card-secondary"
            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
          >
            <div className="metric-chart">
              <div className="chart-line"></div>
              <div className="chart-dots">
                <span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
            <div className="metric-value">+127%</div>
            <div className="metric-label">效率提升</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">强大功能</h2>
          <p className="section-subtitle">一站式 AI 智能体开发平台</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="feature-image">
                <img src={feature.image} alt={feature.title} />
                <div className="image-overlay"></div>
              </div>
              <div className="feature-content">
                <span className="feature-subtitle">{feature.subtitle}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
                <a className="feature-link">
                  了解更多 <ArrowRightOutlined />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agents Showcase */}
      <section className="agents-section">
        <div className="section-header">
          <h2 className="section-title">预设智能体</h2>
          <p className="section-subtitle">开箱即用，满足各类业务场景</p>
        </div>
        
        <div className="agents-marquee">
          <div className="marquee-track">
            {[...agents, ...agents, ...agents].map((agent, index) => (
              <div key={index} className="agent-card">
                <div className="agent-avatar-glow">
                  <img src={agent.avatar} alt={agent.name} />
                </div>
                <h4>{agent.name}</h4>
                <p>{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="gradient-mesh"></div>
        </div>
        <div className="cta-content">
          <h2 className="cta-title">准备好开始了吗？</h2>
          <p className="cta-subtitle">立即体验太擎智能体平台</p>
          <Button 
            className="cta-button"
            onClick={() => navigate('/agents')}
          >
            免费开始使用
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="apple-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="logo-icon">
                <div className="moon"></div>
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="brand-text">
                <span className="brand-name">太擎</span>
                <span className="brand-sub">HANPAAS</span>
              </div>
            </div>
          </div>
          <div className="footer-links">
            <div className="link-column">
              <h4>产品</h4>
              <a href="#">智能体引擎</a>
              <a href="#">知识库</a>
              <a href="#">数据分析</a>
            </div>
            <div className="link-column">
              <h4>资源</h4>
              <a href="#">帮助中心</a>
              <a href="#">API 文档</a>
              <a href="#">更新日志</a>
            </div>
            <div className="link-column">
              <h4>公司</h4>
              <a href="#">关于我们</a>
              <a href="#">加入我们</a>
              <a href="#">联系我们</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 太擎 HANPAAS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portal;
