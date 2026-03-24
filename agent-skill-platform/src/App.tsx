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
import ReportHome from './pages/Report';
import ReportChat from './pages/ReportChat';
import Portal from './pages/Portal';
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
      <Router basename="/tq1">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Default redirect to home */}
            <Route index element={<Navigate to="/home" replace />} />

            {/* Home Route */}
            <Route path="home" element={<Home />} />

            {/* Portal Route - 门户页 */}
            <Route path="portal" element={<Portal />} />

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
            
            {/* Report */}
            <Route path="reports" element={<ReportHome />} />
            <Route path="reports/chat" element={<ReportChat />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
