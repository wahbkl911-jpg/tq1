import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Layout from './components/Layout';
import Home from './pages/Home';
import AgentList from './pages/AgentList';
import AgentChat from './pages/AgentChat';
import KnowledgeBase from './pages/KnowledgeBase';
import SkillSquare from './pages/SkillSquare';
import SkillDetail from './pages/SkillDetail';
import SkillDebug from './pages/SkillDebug';
import SkillPublish from './pages/SkillPublish';
import './App.css';

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#d4a574',
          colorLink: '#d4a574',
          colorLinkHover: '#c49a6c',
          borderRadius: 4,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Default redirect to home */}
            <Route index element={<Navigate to="/home" replace />} />

            {/* Home Route */}
            <Route path="home" element={<Home />} />

            {/* Agent Routes */}
            <Route path="agents" element={<AgentList />} />
            <Route path="agents/:agentId/chat" element={<AgentChat />} />
            
            {/* Knowledge Base */}
            <Route path="knowledge" element={<KnowledgeBase />} />
            
            {/* Chat History */}
            <Route path="chat-history" element={<AgentList />} />
            
            {/* Skills Routes */}
            <Route path="skills" element={<SkillSquare />} />
            <Route path="skills/:skillId" element={<SkillDetail />} />
            <Route path="skills/:skillId/debug" element={<SkillDebug />} />
            <Route path="skills/:skillId/publish" element={<SkillPublish />} />
            
            {/* Apps */}
            <Route path="apps" element={<SkillSquare />} />
            
            {/* Develop */}
            <Route path="develop" element={<SkillSquare />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
