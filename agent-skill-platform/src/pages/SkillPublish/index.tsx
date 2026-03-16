import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Select,
  Tag,
  Upload,
  Modal,
  Steps,
  message,
} from 'antd';
import {
  LeftOutlined,
  UploadOutlined,
  PlusOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useAppStore } from '@/stores';
import { mockSkills } from '@/utils/mockData';
import './style.css';

const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

const SkillPublish = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const currentSkill = useAppStore((state) => state.currentSkill);
  const setCurrentSkill = useAppStore((state) => state.setCurrentSkill);
  const updateSkill = useAppStore((state) => state.updateSkill);

  useEffect(() => {
    const skill = mockSkills.find((s) => s.id === skillId);
    if (skill) {
      setCurrentSkill(skill);
      setTags(skill.tags);
      form.setFieldsValue({
        name: skill.displayName,
        description: skill.description,
        category: 'data',
        tags: skill.tags,
      });
    }
  }, [skillId, form]);

  const handleBack = () => {
    navigate(`/skills/${skillId}`);
  };

  const handleCloseTag = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsModalVisible(true);
      
      // 模拟发布过程
      setTimeout(() => {
        if (currentSkill) {
          updateSkill({
            ...currentSkill,
            status: 'published',
            tags: tags,
          });
        }
        message.success('技能发布成功！');
        setIsModalVisible(false);
        navigate('/skills');
      }, 2000);
    } catch (error) {
      message.error('请完善表单信息');
    }
  };

  const steps = [
    {
      title: '填写信息',
      content: (
        <Form
          form={form}
          layout="vertical"
          className="publish-form"
        >
          <Form.Item
            label="技能名称"
            name="name"
            rules={[{ required: true, message: '请输入技能名称' }]}
          >
            <Input placeholder="请输入技能名称" />
          </Form.Item>

          <Form.Item
            label="技能分类"
            name="category"
            rules={[{ required: true, message: '请选择技能分类' }]}
          >
            <Select placeholder="请选择分类">
              <Option value="data">数据获取</Option>
              <Option value="content">内容创作</Option>
              <Option value="analysis">数据分析</Option>
              <Option value="automation">自动化</Option>
              <Option value="marketing">营销推广</Option>
              <Option value="development">开发工具</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="技能标签"
            name="tags"
          >
            <div className="tags-container">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleCloseTag(tag)}
                  className="skill-tag-item"
                >
                  {tag}
                </Tag>
              ))}
              {inputVisible ? (
                <Input
                  type="text"
                  size="small"
                  className="tag-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                  autoFocus
                />
              ) : (
                <Tag
                  className="site-tag-plus"
                  onClick={() => setInputVisible(true)}
                >
                  <PlusOutlined /> 添加标签
                </Tag>
              )}
            </div>
          </Form.Item>

          <Form.Item
            label="技能描述"
            name="description"
            rules={[{ required: true, message: '请输入技能描述' }]}
          >
            <TextArea
              rows={4}
              placeholder="请详细描述技能的功能和使用场景"
            />
          </Form.Item>

          <Form.Item
            label="使用说明"
            name="instructions"
          >
            <TextArea
              rows={4}
              placeholder="请提供详细的使用说明和示例"
            />
          </Form.Item>

          <Form.Item
            label="封面图片"
            name="cover"
          >
            <Upload
              listType="picture-card"
              className="cover-uploader"
              showUploadList={false}
              action="#"
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>上传封面</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: '审核确认',
      content: (
        <div className="review-content">
          <div className="review-item">
            <span className="label">技能名称：</span>
            <span className="value">{form.getFieldValue('name')}</span>
          </div>
          <div className="review-item">
            <span className="label">技能分类：</span>
            <span className="value">{form.getFieldValue('category')}</span>
          </div>
          <div className="review-item">
            <span className="label">技能标签：</span>
            <span className="value">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </span>
          </div>
          <div className="review-item">
            <span className="label">技能描述：</span>
            <span className="value">{form.getFieldValue('description')}</span>
          </div>
          <div className="review-notice">
            <h4>发布须知</h4>
            <ul>
              <li>发布的技能将通过平台审核，审核通过后即可在技能广场展示</li>
              <li>请确保技能描述准确、完整，便于其他用户理解和使用</li>
              <li>技能发布后将无法修改核心代码，请确保代码质量</li>
              <li>遵守平台规范，不得发布违法违规内容</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  if (!currentSkill) {
    return null;
  }

  return (
    <div className="skill-publish-page">
      {/* Header */}
      <div className="publish-header">
        <div className="header-left">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={handleBack}
            className="back-btn"
          >
            返回
          </Button>
          <h2>发布技能到广场</h2>
        </div>
      </div>

      {/* Steps */}
      <div className="publish-steps">
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>

      {/* Content */}
      <div className="publish-content">
        <div className="step-content">
          {steps[currentStep].content}
        </div>

        {/* Actions */}
        <div className="step-actions">
          {currentStep > 0 && (
            <Button
              style={{ marginRight: 8 }}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              上一步
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="next-btn"
            >
              下一步
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              className="submit-btn"
            >
              确认发布
            </Button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        centered
        className="publish-success-modal"
      >
        <div className="success-content">
          <CheckCircleOutlined className="success-icon" />
          <h3>发布成功！</h3>
          <p>您的技能已提交审核，审核通过后将展示在技能广场</p>
        </div>
      </Modal>
    </div>
  );
};

export default SkillPublish;
