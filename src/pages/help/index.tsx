import React from 'react';
import { Card, CardBody, CardFooter, Input, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  articles: number;
}

const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of AI Workflow Studio',
    icon: 'lucide:rocket',
    articles: 12
  },
  {
    id: 'api',
    title: 'API Reference',
    description: 'Comprehensive API documentation',
    icon: 'lucide:code',
    articles: 24
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    description: 'Step-by-step guides for common tasks',
    icon: 'lucide:book-open',
    articles: 18
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Frequently asked questions',
    icon: 'lucide:help-circle',
    articles: 32
  },
  {
    id: 'connectors',
    title: 'Connectors',
    description: 'How to use and configure connectors',
    icon: 'lucide:plug',
    articles: 15
  },
  {
    id: 'workflows',
    title: 'Workflows',
    description: 'Building and optimizing workflows',
    icon: 'lucide:workflow',
    articles: 22
  },
  {
    id: 'agents',
    title: 'Agents & RAG',
    description: 'Creating AI agents with knowledge retrieval',
    icon: 'lucide:bot',
    articles: 9
  },
  {
    id: 'billing',
    title: 'Billing & Plans',
    description: 'Pricing, plans, and billing information',
    icon: 'lucide:credit-card',
    articles: 7
  }
];

const popularArticles = [
  'Getting started with AI Workflow Studio',
  'How to create your first workflow',
  'Connecting to external APIs',
  'Understanding token usage and costs',
  'Best practices for prompt engineering'
];

const Help: React.FC = () => {
  const [search, setSearch] = React.useState('');
  
  return (
    <div className="space-y-8">
      {/* Hero section with search */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
        <p className="text-default-500 mb-6">Search our knowledge base or browse the documentation categories below</p>
        
        <div className="relative">
          <Input
            placeholder="Search for help articles..."
            value={search}
            onValueChange={setSearch}
            startContent={<Icon icon="lucide:search" width={16} />}
            size="lg"
            className="max-w-xl mx-auto"
          />
          
          {search && (
            <Card className="absolute mt-2 w-full max-w-xl left-1/2 transform -translate-x-1/2 z-10 shadow-md">
              <CardBody className="p-2">
                <ul className="divide-y divide-divider">
                  {popularArticles.filter(article => 
                    article.toLowerCase().includes(search.toLowerCase())
                  ).map((article, index) => (
                    <li key={index} className="py-2 px-3 hover:bg-default-100 rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:file-text" width={16} />
                        <span>{article}</span>
                      </div>
                    </li>
                  ))}
                  {popularArticles.filter(article => 
                    article.toLowerCase().includes(search.toLowerCase())
                  ).length === 0 && (
                    <li className="py-2 px-3">
                      <p className="text-default-500">No results found. Try a different search term.</p>
                    </li>
                  )}
                </ul>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
      
      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {helpCategories.map((category) => (
          <Card key={category.id} shadow="sm" isPressable>
            <CardBody className="gap-3">
              <div className="p-3 rounded-xl bg-primary-100 w-fit">
                <Icon icon={category.icon} className="text-primary" width={24} />
              </div>
              
              <div>
                <h3 className="font-semibold">{category.title}</h3>
                <p className="text-small text-default-500">{category.description}</p>
              </div>
              
              <div className="flex items-center gap-1 text-small text-default-400">
                <Icon icon="lucide:file-text" width={14} />
                <span>{category.articles} articles</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      
      {/* Popular articles */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Popular Articles</h2>
        <Card shadow="sm">
          <CardBody>
            <ul className="divide-y divide-divider">
              {popularArticles.map((article, index) => (
                <li key={index} className="py-3">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:file-text" width={16} className="text-primary" />
                    <a href="#" className="hover:text-primary transition-colors">{article}</a>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
      
      {/* Contact support */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Need more help?</h2>
            <p className="text-white/80">Our support team is available 24/7 to answer your questions</p>
          </div>
          <div className="flex gap-3">
            <Button
              color="default"
              variant="solid"
              startContent={<Icon icon="lucide:message-circle" width={16} />}
            >
              Live Chat
            </Button>
            <Button
              color="default"
              variant="bordered"
              startContent={<Icon icon="lucide:mail" width={16} />}
            >
              Email Support
            </Button>
          </div>
        </div>
      </div>
      
      {/* Video tutorials */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card shadow="sm">
            <img
              src="https://img.heroui.chat/image/ai?w=400&h=225&u=10"
              alt="Getting Started Tutorial"
              className="w-full h-48 object-cover"
            />
            <CardBody>
              <h3 className="font-semibold">Getting Started with AI Workflow Studio</h3>
              <p className="text-small text-default-500">Learn the basics in this 10-minute tutorial</p>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:play" width={16} />}
              >
                Watch Video
              </Button>
            </CardFooter>
          </Card>
          
          <Card shadow="sm">
            <img
              src="https://img.heroui.chat/image/ai?w=400&h=225&u=11"
              alt="Building Workflows Tutorial"
              className="w-full h-48 object-cover"
            />
            <CardBody>
              <h3 className="font-semibold">Building Your First Workflow</h3>
              <p className="text-small text-default-500">Step-by-step guide to creating workflows</p>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:play" width={16} />}
              >
                Watch Video
              </Button>
            </CardFooter>
          </Card>
          
          <Card shadow="sm">
            <img
              src="https://img.heroui.chat/image/ai?w=400&h=225&u=12"
              alt="Advanced Features Tutorial"
              className="w-full h-48 object-cover"
            />
            <CardBody>
              <h3 className="font-semibold">Advanced RAG Techniques</h3>
              <p className="text-small text-default-500">Learn how to optimize retrieval for your agents</p>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                color="primary"
                variant="flat"
                startContent={<Icon icon="lucide:play" width={16} />}
              >
                Watch Video
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
