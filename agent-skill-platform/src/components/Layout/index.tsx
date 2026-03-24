import { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge } from 'antd';
import {
  HomeOutlined,
  RobotOutlined,
  BookOutlined,
  ThunderboltOutlined,
  AppstoreOutlined,
  CodeOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  CompassOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAppStore } from '@/stores';
import logoImage from '@/assets/logo.png';
import './style.css';

const { Header, Sider, Content } = Layout;

const LayoutComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const sidebarCollapsed = useAppStore((state) => state.sidebarCollapsed);
  const setSidebarCollapsed = useAppStore((state) => state.setSidebarCollapsed);

  const topMenuItems = [
    { key: 'home', label: '首页', icon: <HomeOutlined /> },
    { key: 'crm', label: '太擎CRM', icon: <AppstoreOutlined /> },
    { key: 'guard', label: '客户卫士', icon: <RobotOutlined /> },
    { key: 'flow', label: '流程引擎', icon: <ThunderboltOutlined /> },
    { key: 'agent', label: '智能体引擎', icon: <RobotOutlined />, active: true },
    { key: 'knowledge', label: '知识引擎', icon: <BookOutlined /> },
    { key: 'report', label: '报表引擎', icon: <BookOutlined /> },
    { key: 'connect', label: '连接引擎', icon: <CodeOutlined /> },
    { key: 'app', label: '应用中心', icon: <AppstoreOutlined /> },
  ];

  const sideMenuItems = [
    {
      key: '/portal',
      icon: <CompassOutlined />,
      label: '门户',
    },
    {
      key: '/agents',
      icon: <RobotOutlined />,
      label: '我的Agent',
    },
    {
      key: '/knowledge',
      icon: <BookOutlined />,
      label: '知识库',
    },
    {
      key: '/skills',
      icon: <ThunderboltOutlined />,
      label: '技能',
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: 'AI报告',
    },
    {
      key: '/home',
      icon: <HomeOutlined />,
      label: '后台概览',
    },
  ];

  const userMenuItems = [
    { key: 'profile', label: '个人中心', icon: <UserOutlined /> },
    { key: 'settings', label: '系统设置', icon: <SettingOutlined /> },
    { key: 'logout', label: '退出登录' },
  ];

  const handleTopMenuClick = (key: string) => {
    if (key === 'agent') {
      navigate('/');
    } else if (key === 'knowledge') {
      window.open('https://console.hanpaas.com/#/knowledge-engine/home', '_blank');
    }
  };

  const handleSideMenuClick = (key: string) => {
    navigate(key);
  };

  return (
    <Layout className="main-layout">
      {/* Top Navigation */}
      <Header className="top-header">
        <div className="logo-section">
          <div className="logo">
            <img src={logoImage} alt="太擎" className="logo-img" />
          </div>
        </div>
        <div className="top-menu">
          {topMenuItems.map((item) => (
            <div
              key={item.key}
              className={`top-menu-item ${item.active ? 'active' : ''}`}
              onClick={() => handleTopMenuClick(item.key)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className="header-right">
          <Badge count={5} size="small">
            <BellOutlined className="header-icon" />
          </Badge>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div className="user-info">
              <Avatar size="small" icon={<UserOutlined />} />
              <span className="company-name">杭州中粮包装有限公司</span>
              <DownOutlined className="dropdown-icon" />
            </div>
          </Dropdown>
        </div>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="side-sider"
          width={200}
        >
          <div className="search-box">
            {!collapsed && (
              <input
                type="text"
                placeholder="搜索"
                className="search-input"
              />
            )}
            {collapsed && <span className="search-icon">🔍</span>}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={sideMenuItems}
            onClick={({ key }) => handleSideMenuClick(key)}
            className="side-menu"
          />
          <div className="sider-footer">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="collapse-btn"
            />
            {!collapsed && <span className="version">汉贝：8000</span>}
          </div>
        </Sider>

        {/* Main Content */}
        <Content className="main-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
