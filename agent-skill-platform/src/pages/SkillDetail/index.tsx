import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Tag,
  Tree,
  Tabs,
  Descriptions,
  Empty,
  Spin,
} from 'antd';
import {
  LeftOutlined,
  DownloadOutlined,
  CopyOutlined,
  FolderOutlined,
  FileOutlined,
  FileMarkdownOutlined,
  FileTextOutlined,
  ShareAltOutlined,
  ThunderboltOutlined,
  BugOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@/stores';
import { mockSkills } from '@/utils/mockData';
import type { SkillFile } from '@/types';
import './style.css';

const { DirectoryTree } = Tree;
const { TabPane } = Tabs;

const SkillDetail = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<SkillFile | null>(null);
  
  const currentSkill = useAppStore((state) => state.currentSkill);
  const setCurrentSkill = useAppStore((state) => state.setCurrentSkill);

  useEffect(() => {
    const skill = mockSkills.find((s) => s.id === skillId);
    if (skill) {
      setCurrentSkill(skill);
      // 默认选中SKILL.md文件
      const findSkillMdFile = (files: any[]): any | null => {
        for (const file of files) {
          if (file.name === 'SKILL.md') return file;
          if (file.children) {
            const found = findSkillMdFile(file.children);
            if (found) return found;
          }
        }
        return null;
      };
      const skillMdFile = findSkillMdFile(skill.files || []);
      if (skillMdFile) {
        setSelectedFile(skillMdFile);
      }
    }
  }, [skillId]);

  const handleBack = () => {
    navigate('/skills');
  };

  const handlePublish = () => {
    navigate(`/skills/${skillId}/publish`);
  };

  const handleDebug = () => {
    navigate(`/skills/${skillId}/debug`);
  };

  const handleUseInTaiqing = () => {
    // 在太擎中使用
  };

  const handleFileSelect = (selectedKeys: string[], info: any) => {
    const findFile = (files: SkillFile[], key: string): SkillFile | null => {
      for (const file of files) {
        if (file.id === key) return file;
        if (file.children) {
          const found = findFile(file.children, key);
          if (found) return found;
        }
      }
      return null;
    };

    if (currentSkill?.files) {
      const file = findFile(currentSkill.files, selectedKeys[0]);
      if (file && file.type === 'file') {
        setSelectedFile(file);
      }
    }
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith('.md')) return <FileMarkdownOutlined style={{ color: '#1890ff' }} />;
    if (name.endsWith('.py')) return <FileTextOutlined style={{ color: '#52c41a' }} />;
    return <FileOutlined style={{ color: '#8c8c8c' }} />;
  };

  const buildTreeData = (files: SkillFile[]): any[] => {
    return files.map((file) => ({
      key: file.id,
      title: file.name,
      icon: file.type === 'folder' ? (
        <FolderOutlined style={{ color: '#d4a574' }} />
      ) : (
        getFileIcon(file.name)
      ),
      children: file.children ? buildTreeData(file.children) : undefined,
      isLeaf: file.type === 'file',
    }));
  };

  if (!currentSkill) {
    return (
      <div className="skill-detail-page">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="skill-detail-page">
      {/* Header */}
      <div className="detail-header">
        <div className="header-left">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={handleBack}
            className="back-btn"
          >
            返回
          </Button>
          <div className="header-actions">
            <Button type="text" icon={<DownloadOutlined />}>
              下载
            </Button>
            <Button type="text" icon={<CopyOutlined />}>
              复制
            </Button>
            <Button type="text" icon={<ShareAltOutlined />}>
              分享
            </Button>
          </div>
        </div>
        <div className="header-right">
          <Button
            icon={<BugOutlined />}
            className="debug-btn"
            onClick={handleDebug}
          >
            调试
          </Button>
          <Button
            className="publish-btn"
            onClick={handlePublish}
          >
            发布到广场
          </Button>
          <Button
            type="primary"
            className="use-btn"
            onClick={handleUseInTaiqing}
          >
            在太擎中使用
          </Button>
        </div>
      </div>

      {/* Skill Info */}
      <div className="skill-info-section">
        <div className="skill-header">
          <div className="skill-icon-large">🐞</div>
          <div className="skill-title-section">
            <h2>
              {currentSkill.displayName}
              <span className="skill-id">（{currentSkill.name}）</span>
            </h2>
            <div className="skill-tags">
              {currentSkill.tags.map((tag) => (
                <Tag key={tag} color="blue" className="skill-tag">
                  {tag}
                </Tag>
              ))}
            </div>
            <p className="skill-desc">{currentSkill.description}</p>
            <div className="skill-meta">
              <span>创建时间：{currentSkill.createdAt}</span>
              <span>创建人：{currentSkill.creator}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-content">
        {/* Left - File Tree */}
        <div className="file-tree-section">
          <div className="section-title">技能文件目录</div>
          {currentSkill.files && currentSkill.files.length > 0 ? (
            <DirectoryTree
              treeData={buildTreeData(currentSkill.files)}
              onSelect={handleFileSelect}
              defaultExpandAll
              showIcon
              className="skill-file-tree"
            />
          ) : (
            <Empty description="暂无文件" />
          )}
        </div>

        {/* Middle - File Content */}
        <div className="file-content-section">
          {selectedFile ? (
            <div className="file-viewer">
              <div className="file-viewer-header">
                <span className="file-name">{selectedFile.name}</span>
              </div>
              <div className="file-viewer-content">
                <pre>{selectedFile.content || currentSkill.readme || '文件内容...'}</pre>
              </div>
            </div>
          ) : (
            <Empty description="选择一个文件查看内容" />
          )}
        </div>

        {/* Right - AI Skill Creation */}
        <div className="ai-creation-section">
          <div className="section-title">AI 技能创作</div>
          <div className="ai-chat-preview">
            <div className="chat-message user">
              <div className="message-bubble">
                创建一个小红书爆款文章每天获取的skill
              </div>
            </div>
            <div className="chat-message assistant">
              <div className="message-bubble">
                <p>好的，开始小红书爆款文章每天获取的 Skill。</p>
                <div className="file-creation-list">
                  <div className="file-item">
                    <FileOutlined /> 创建文件：./xiaohongshu-hot-posts/SKILL.md
                  </div>
                  <div className="file-item">
                    <FileOutlined /> 创建文件：./xiaohongshu-hot-posts/scripts/fetch_hot_posts.py
                  </div>
                  <div className="file-item">
                    <FileOutlined /> 创建文件：./xiaohongshu-hot-posts/references/api-guide.md
                  </div>
                </div>
                <p>所有文件已创建完成，现在进行打包。</p>
                <p>小红书爆款文章获取 Skill 已创建完成</p>
              </div>
            </div>
            <div className="chat-input-preview">
              <div className="input-placeholder">请描述你想要创建的技能！</div>
              <div className="input-actions">
                <Button type="text" icon={<ThunderboltOutlined />} />
                <Button type="primary" icon={<ShareAltOutlined />} className="send-btn">
                  发送
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;
