import React from 'react';
import { Card, CardBody, Tabs, Tab, Input, Textarea, Select, SelectItem, Button, Checkbox, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Can you help me find information about our Q2 sales report?',
    timestamp: new Date('2023-07-15T10:30:00')
  },
  {
    id: '2',
    role: 'assistant',
    content: 'I found the Q2 sales report in your company knowledge base. The total revenue was $1.2M, which is 15% above target. Would you like me to summarize the key points?',
    timestamp: new Date('2023-07-15T10:30:30')
  },
  {
    id: '3',
    role: 'user',
    content: 'Yes, please summarize the main highlights and any areas of concern.',
    timestamp: new Date('2023-07-15T10:31:00')
  },
  {
    id: '4',
    role: 'assistant',
    content: 'Here are the highlights from the Q2 sales report:\n\n• Total revenue: $1.2M (15% above target)\n• New customers: 45 (20% increase from Q1)\n• Average deal size: $26,500 (5% increase)\n• Sales cycle: 32 days (improved by 3 days)\n\nAreas of concern:\n• Customer churn increased to 5% (up from 3% in Q1)\n• West region missed targets by 8%\n• Enterprise segment growth slowed to 4% (vs 12% in Q1)\n\nThe report recommends focusing on retention strategies and investigating the slowdown in the enterprise segment.',
    timestamp: new Date('2023-07-15T10:31:45')
  }
];

const Agents: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: 'I\'m processing your request. This is a simulated response from the RAG-enabled agent.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Agent / RAG Builder</h1>
        <p className="text-default-500">Create and configure AI agents with Retrieval Augmented Generation</p>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full">
        {/* Chat History Panel */}
        <Card className="w-full lg:w-1/3 h-full">
          <CardBody className="p-0 h-full flex flex-col">
            <div className="p-4 border-b border-divider">
              <h3 className="font-semibold">Chat History</h3>
              <p className="text-small text-default-500">Test your agent with example queries</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-default-100 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p className="text-tiny mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-divider mt-auto">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onValueChange={setNewMessage}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  isIconOnly
                  color="primary"
                  onPress={handleSendMessage}
                >
                  <Icon icon="lucide:send" width={18} />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* Configuration Panel */}
        <Card className="w-full lg:w-2/3 h-full">
          <CardBody className="h-full">
            <Tabs aria-label="Agent configuration tabs" className="h-full">
              <Tab
                key="system-prompt"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:file-text" width={16} />
                    <span>System Prompt</span>
                  </div>
                }
              >
                <div className="space-y-4 p-2">
                  <Input
                    label="Agent Name"
                    placeholder="Enter agent name"
                    defaultValue="Sales Data Assistant"
                  />
                  
                  <Select
                    label="Base Model"
                    placeholder="Select base model"
                    defaultSelectedKeys={["gpt4"]}
                  >
                    <SelectItem key="gpt4" value="gpt4">GPT-4</SelectItem>
                    <SelectItem key="gpt35" value="gpt35">GPT-3.5 Turbo</SelectItem>
                    <SelectItem key="claude" value="claude">Claude 3</SelectItem>
                    <SelectItem key="mistral" value="mistral">Mistral Large</SelectItem>
                  </Select>
                  
                  <Textarea
                    label="System Prompt"
                    placeholder="Enter system prompt"
                    defaultValue="You are a helpful assistant that specializes in retrieving and explaining sales data. You have access to the company's sales reports, customer data, and market analysis. Always be concise and accurate. If you don't know something, say so and don't make up information."
                    rows={6}
                  />
                  
                  <div>
                    <p className="text-small font-medium mb-2">Example Pairs</p>
                    <Card className="mb-4">
                      <CardBody className="gap-2">
                        <div>
                          <p className="text-small font-medium">User</p>
                          <p className="text-small p-2 bg-default-100 rounded-md">What were our top selling products last quarter?</p>
                        </div>
                        <div>
                          <p className="text-small font-medium">Assistant</p>
                          <p className="text-small p-2 bg-default-100 rounded-md">Based on the Q2 sales data, your top selling products were:
1. Product X - $450K (22% of revenue)
2. Product Y - $320K (16% of revenue)
3. Product Z - $280K (14% of revenue)

Product X showed the strongest growth at 28% YoY. Would you like more details on any specific product?</p>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Button
                      variant="flat"
                      color="primary"
                      startContent={<Icon icon="lucide:plus" width={16} />}
                    >
                      Add Example Pair
                    </Button>
                  </div>
                </div>
              </Tab>
              
              <Tab
                key="knowledge"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:database" width={16} />
                    <span>Knowledge Sources</span>
                  </div>
                }
              >
                <div className="space-y-4 p-2">
                  <Select
                    label="Vector Database"
                    placeholder="Select vector database"
                    defaultSelectedKeys={["pinecone"]}
                  >
                    <SelectItem key="pinecone" value="pinecone">Pinecone</SelectItem>
                    <SelectItem key="qdrant" value="qdrant">Qdrant</SelectItem>
                    <SelectItem key="weaviate" value="weaviate">Weaviate</SelectItem>
                    <SelectItem key="redis" value="redis">Redis</SelectItem>
                  </Select>
                  
                  <Select
                    label="Embedding Model"
                    placeholder="Select embedding model"
                    defaultSelectedKeys={["openai"]}
                  >
                    <SelectItem key="openai" value="openai">OpenAI Embeddings</SelectItem>
                    <SelectItem key="cohere" value="cohere">Cohere Embeddings</SelectItem>
                    <SelectItem key="huggingface" value="huggingface">HuggingFace Embeddings</SelectItem>
                  </Select>
                  
                  <div>
                    <p className="text-small font-medium mb-2">Data Sources</p>
                    <Card className="mb-4">
                      <CardBody>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:file" width={16} />
                              <span>Sales Reports</span>
                            </div>
                            <Chip size="sm" color="success" variant="flat">Connected</Chip>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:database" width={16} />
                              <span>Customer Database</span>
                            </div>
                            <Chip size="sm" color="success" variant="flat">Connected</Chip>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:folder" width={16} />
                              <span>Market Analysis</span>
                            </div>
                            <Chip size="sm" color="success" variant="flat">Connected</Chip>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Button
                      variant="flat"
                      color="primary"
                      startContent={<Icon icon="lucide:plus" width={16} />}
                    >
                      Add Data Source
                    </Button>
                  </div>
                </div>
              </Tab>
              
              <Tab
                key="memory-tools"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:tool" width={16} />
                    <span>Memory & Tools</span>
                  </div>
                }
              >
                <div className="space-y-4 p-2">
                  <div>
                    <p className="text-small font-medium mb-2">Memory</p>
                    <Card className="mb-4">
                      <CardBody className="gap-3">
                        <Select
                          label="Memory Type"
                          placeholder="Select memory type"
                          defaultSelectedKeys={["conversation"]}
                        >
                          <SelectItem key="conversation" value="conversation">Conversation History</SelectItem>
                          <SelectItem key="summary" value="summary">Summary Memory</SelectItem>
                          <SelectItem key="buffer" value="buffer">Buffer Memory</SelectItem>
                        </Select>
                        
                        <Input
                          type="number"
                          label="Memory Window (messages)"
                          placeholder="Enter number of messages"
                          defaultValue="10"
                        />
                        
                        <Checkbox defaultSelected>
                          Enable long-term memory storage
                        </Checkbox>
                      </CardBody>
                    </Card>
                  </div>
                  
                  <div>
                    <p className="text-small font-medium mb-2">Tools</p>
                    <Card className="mb-4">
                      <CardBody className="gap-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox defaultSelected />
                            <div>
                              <p className="text-small font-medium">Web Search</p>
                              <p className="text-tiny text-default-500">Search the web for up-to-date information</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox defaultSelected />
                            <div>
                              <p className="text-small font-medium">Calculator</p>
                              <p className="text-tiny text-default-500">Perform mathematical calculations</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Checkbox />
                            <div>
                              <p className="text-small font-medium">Data Visualization</p>
                              <p className="text-tiny text-default-500">Generate charts and graphs from data</p>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Button
                      variant="flat"
                      color="primary"
                      startContent={<Icon icon="lucide:plus" width={16} />}
                    >
                      Add Custom Tool
                    </Button>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button
          variant="flat"
          color="default"
        >
          Save Draft
        </Button>
        <Button
          color="primary"
          startContent={<Icon icon="lucide:rocket" width={16} />}
        >
          Save & Deploy
        </Button>
      </div>
    </div>
  );
};

export default Agents;
