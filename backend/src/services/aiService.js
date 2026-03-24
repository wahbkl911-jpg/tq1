/**
 * AI 服务统一接口
 * 支持多种 AI 提供商：OpenAI、Azure、百度、阿里等
 */

const { OpenAI } = require('openai');

class AIService {
  constructor() {
    this.provider = process.env.AI_PROVIDER || 'openai';
    this.initClient();
  }

  initClient() {
    switch (this.provider) {
      case 'openai':
        this.client = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
        });
        this.model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
        break;
      
      case 'azure':
        this.client = new OpenAI({
          apiKey: process.env.AZURE_OPENAI_API_KEY,
          baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
          defaultQuery: { 'api-version': '2024-02-01' },
          defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY },
        });
        this.model = process.env.AZURE_OPENAI_DEPLOYMENT;
        break;

      case 'volcano':
        // 字节火山引擎 - 火山方舟
        this.client = new OpenAI({
          apiKey: process.env.VOLCANO_API_KEY,
          baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
        });
        this.model = process.env.VOLCANO_MODEL || 'ep-xxxxxxxxxxxxx'; // 接入点 ID
        break;

      case 'baidu':
        // 百度文心一言接入
        this.client = null; // 需要单独实现
        this.model = 'ernie-bot';
        break;

      case 'aliyun':
        // 阿里通义千问接入
        this.client = null; // 需要单独实现
        this.model = 'qwen-turbo';
        break;

      default:
        throw new Error(`不支持的 AI 提供商: ${this.provider}`);
    }
  }

  /**
   * 构建系统提示词
   * 根据 Agent 信息构建个性化提示词
   */
  buildSystemPrompt(agent, context = {}) {
    const { skills = [], knowledgeFiles = [] } = context;
    
    let prompt = `你是 "${agent.name}"，${agent.description}

你的职责：
1. 以专业、友好的态度回答用户问题
2. 根据你的专业领域提供准确、有用的信息
3. 如果问题超出你的专业范围，诚实地告知用户

回答风格：
- 专业但不失亲和力
- 结构化、条理清晰
- 适当使用 Markdown 格式（标题、列表、表格等）
- 中文回答（除非用户要求其他语言）

`;

    // 添加技能信息
    if (skills.length > 0) {
      prompt += `你具备以下技能：\n`;
      skills.forEach(skill => {
        prompt += `- ${skill.name}: ${skill.description}\n`;
      });
      prompt += '\n';
    }

    // 添加知识库信息
    if (knowledgeFiles.length > 0) {
      prompt += `你可以参考以下知识库文档：\n`;
      knowledgeFiles.forEach(file => {
        prompt += `- ${file.name}\n`;
      });
      prompt += '\n';
    }

    prompt += `请记住：你是 ${agent.name}，始终保持这个角色的人设和专业性。`;

    return prompt;
  }

  /**
   * 流式对话生成
   * @param {Array} messages - 消息历史 [{role, content}]
   * @param {Object} agent - Agent 信息
   * @param {Object} context - 上下文信息（技能、知识库等）
   * @param {Function} onChunk - 流式回调函数
   */
  async *streamChat(messages, agent, context = {}) {
    try {
      // 构建系统提示词
      const systemPrompt = this.buildSystemPrompt(agent, context);
      
      // 构建完整消息列表
      const fullMessages = [
        { role: 'system', content: systemPrompt },
        ...messages
      ];

      console.log(`[AI Service] 发送请求到 ${this.provider}, 模型: ${this.model}`);
      console.log(`[AI Service] 消息数: ${fullMessages.length}`);

      // 调用 AI API
      const stream = await this.client.chat.completions.create({
        model: this.model,
        messages: fullMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          yield {
            type: 'content',
            content: content,
          };
        }
      }

      yield { type: 'done' };

    } catch (error) {
      console.error('[AI Service] 错误:', error);
      yield {
        type: 'error',
        error: error.message || 'AI 服务调用失败',
      };
    }
  }

  /**
   * 非流式对话生成（用于简单场景）
   */
  async chat(messages, agent, context = {}) {
    const chunks = [];
    for await (const chunk of this.streamChat(messages, agent, context)) {
      if (chunk.type === 'content') {
        chunks.push(chunk.content);
      } else if (chunk.type === 'error') {
        throw new Error(chunk.error);
      }
    }
    return chunks.join('');
  }
}

module.exports = new AIService();
