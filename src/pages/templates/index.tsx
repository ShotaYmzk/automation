import React from 'react';
import { Card, CardBody, CardFooter, Button, Input, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  downloads: number;
  image: string;
  requiredConnectors: string[];
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description: 'Automate customer support with an AI chatbot that can answer FAQs and escalate complex issues.',
    category: 'Customer Service',
    difficulty: 'Beginner',
    rating: 4.8,
    downloads: 1245,
    image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=1',
    requiredConnectors: ['OpenAI', 'Slack', 'HubSpot']
  },
  {
    id: '2',
    name: 'Data Extraction Pipeline',
    description: 'Extract structured data from documents, emails, and web pages using AI.',
    category: 'Data Processing',
    difficulty: 'Intermediate',
    rating: 4.5,
    downloads: 876,
    image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=2',
    requiredConnectors: ['OpenAI', 'MongoDB', 'AWS S3']
  },
  {
    id: '3',
    name: 'Content Generator',
    description: 'Generate blog posts, social media content, and marketing copy based on your brand guidelines.',
    category: 'Marketing',
    difficulty: 'Beginner',
    rating: 4.6,
    downloads: 1532,
    image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=3',
    requiredConnectors: ['OpenAI', 'Google Drive']
  },
  {
    id: '4',
    name: 'Sales Lead Qualifier',
    description: 'Automatically qualify and score sales leads based on their interactions and profile data.',
    category: 'Sales',
    difficulty: 'Intermediate',
    rating: 4.3,
    downloads: 654,
    image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=4',
    requiredConnectors: ['Salesforce', 'HubSpot']
  },
  {
    id: '5',
    name: 'Document Summarizer',
    description: 'Automatically summarize long documents, research papers, and reports.',
    category: 'Productivity',
    difficulty: 'Beginner',
    rating: 4.7,
    downloads: 987,
    image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=5',
    requiredConnectors: ['OpenAI', 'Google Drive']
  },
  {
    id: '6',
    name: 'Code Review Assistant',
    description: 'Automatically review code for bugs, security issues, and best practices.',
    category: 'Development',
    difficulty: 'Advanced',
    rating: 4.4,
    downloads: 432,
    image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=6',
    requiredConnectors: ['OpenAI', 'GitHub']
  }
];

const difficultyColorMap = {
  'Beginner': 'success',
  'Intermediate': 'warning',
  'Advanced': 'danger'
};

const Templates: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null);
  const [search, setSearch] = React.useState('');
  
  const filteredTemplates = React.useMemo(() => {
    if (!search) return templates;
    
    return templates.filter(template => 
      template.name.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase()) ||
      template.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);
  
  const handleInstallClick = (template: Template) => {
    setSelectedTemplate(template);
    onOpen();
  };
  
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Templates Marketplace</h1>
          <p className="text-lg mb-6">Jumpstart your AI workflows with pre-built templates. Browse our collection and deploy in minutes.</p>
          <div className="flex flex-wrap gap-4">
            <Button 
              color="default" 
              variant="solid"
              startContent={<Icon icon="lucide:search" width={16} />}
            >
              Browse Templates
            </Button>
            <Button 
              color="default" 
              variant="bordered"
              startContent={<Icon icon="lucide:upload" width={16} />}
            >
              Submit Your Template
            </Button>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          placeholder="Search templates..."
          value={search}
          onValueChange={setSearch}
          startContent={<Icon icon="lucide:search" width={16} />}
          className="md:max-w-xs"
        />
        
        <div className="flex gap-2 flex-wrap">
          <Chip variant="flat" color="default">All</Chip>
          <Chip variant="bordered" color="default">Customer Service</Chip>
          <Chip variant="bordered" color="default">Data Processing</Chip>
          <Chip variant="bordered" color="default">Marketing</Chip>
          <Chip variant="bordered" color="default">Sales</Chip>
          <Chip variant="bordered" color="default">Productivity</Chip>
        </div>
      </div>
      
      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} shadow="sm" className="border border-divider">
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            
            <CardBody className="gap-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-medium">{template.name}</h3>
                <Chip 
                  size="sm" 
                  variant="flat" 
                  color={difficultyColorMap[template.difficulty] as any}
                >
                  {template.difficulty}
                </Chip>
              </div>
              
              <p className="text-small text-default-500">{template.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:star" className="text-warning" width={16} />
                  <span className="text-small">{template.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:download" width={16} />
                  <span className="text-small">{template.downloads}</span>
                </div>
              </div>
            </CardBody>
            
            <CardFooter>
              <Button
                fullWidth
                color="primary"
                onPress={() => handleInstallClick(template)}
              >
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Install Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Install Template</ModalHeader>
              <ModalBody>
                {selectedTemplate && (
                  <>
                    <h3 className="font-semibold">{selectedTemplate.name}</h3>
                    <p className="text-default-500">{selectedTemplate.description}</p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Required Connectors</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.requiredConnectors.map((connector) => {
                          const isInstalled = ['OpenAI', 'Slack', 'AWS S3', 'GitHub'].includes(connector);
                          
                          return (
                            <Chip
                              key={connector}
                              variant="flat"
                              color={isInstalled ? 'success' : 'default'}
                              startContent={isInstalled ? <Icon icon="lucide:check" width={14} /> : null}
                            >
                              {connector}
                            </Chip>
                          );
                        })}
                      </div>
                      
                      {selectedTemplate.requiredConnectors.some(
                        connector => !['OpenAI', 'Slack', 'AWS S3', 'GitHub'].includes(connector)
                      ) && (
                        <p className="text-small text-warning mt-2">
                          <Icon icon="lucide:alert-triangle" className="inline mr-1" width={14} />
                          Some required connectors are not installed.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Install & Customize
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Templates;
