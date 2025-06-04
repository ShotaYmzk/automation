import React from 'react';
import { Card, CardBody, CardFooter, Button, Input, Chip, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Connector {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  logo: string;
  isInstalled: boolean;
}

const connectors: Connector[] = [
  {
    id: '1',
    name: 'OpenAI',
    description: 'Connect to OpenAI models including GPT-4 and DALL-E',
    category: 'AI',
    tags: ['LLM', 'Image Generation'],
    logo: 'logos:openai-icon',
    isInstalled: true
  },
  {
    id: '2',
    name: 'MongoDB',
    description: 'Connect to MongoDB databases for document storage',
    category: 'Database',
    tags: ['NoSQL', 'Database'],
    logo: 'logos:mongodb-icon',
    isInstalled: false
  },
  {
    id: '3',
    name: 'Slack',
    description: 'Send and receive messages from Slack channels',
    category: 'Communication',
    tags: ['Messaging', 'Notifications'],
    logo: 'logos:slack-icon',
    isInstalled: true
  },
  {
    id: '4',
    name: 'Google Drive',
    description: 'Access and manage files in Google Drive',
    category: 'Storage',
    tags: ['File Storage', 'Cloud'],
    logo: 'logos:google-drive',
    isInstalled: false
  },
  {
    id: '5',
    name: 'PostgreSQL',
    description: 'Connect to PostgreSQL databases',
    category: 'Database',
    tags: ['SQL', 'Database'],
    logo: 'logos:postgresql',
    isInstalled: false
  },
  {
    id: '6',
    name: 'Stripe',
    description: 'Process payments and manage subscriptions',
    category: 'Payment',
    tags: ['Payment', 'Finance'],
    logo: 'logos:stripe',
    isInstalled: false
  },
  {
    id: '7',
    name: 'HubSpot',
    description: 'Manage customer relationships and marketing',
    category: 'CRM',
    tags: ['Marketing', 'CRM'],
    logo: 'logos:hubspot',
    isInstalled: false
  },
  {
    id: '8',
    name: 'AWS S3',
    description: 'Store and retrieve files from Amazon S3',
    category: 'Storage',
    tags: ['File Storage', 'Cloud'],
    logo: 'logos:aws-s3',
    isInstalled: true
  },
  {
    id: '9',
    name: 'Anthropic',
    description: 'Connect to Claude models for text generation',
    category: 'AI',
    tags: ['LLM', 'Text Generation'],
    logo: 'logos:anthropic',
    isInstalled: false
  },
  {
    id: '10',
    name: 'Salesforce',
    description: 'Integrate with Salesforce CRM',
    category: 'CRM',
    tags: ['CRM', 'Sales'],
    logo: 'logos:salesforce',
    isInstalled: false
  },
  {
    id: '11',
    name: 'Twilio',
    description: 'Send SMS and make phone calls',
    category: 'Communication',
    tags: ['SMS', 'Voice'],
    logo: 'logos:twilio-icon',
    isInstalled: false
  },
  {
    id: '12',
    name: 'GitHub',
    description: 'Integrate with GitHub repositories',
    category: 'Development',
    tags: ['Code', 'Version Control'],
    logo: 'logos:github-icon',
    isInstalled: true
  }
];

const categories = ['All', 'AI', 'Database', 'Communication', 'Storage', 'Payment', 'CRM', 'Development'];
const tags = ['LLM', 'Database', 'SQL', 'NoSQL', 'Messaging', 'File Storage', 'Cloud', 'Payment', 'CRM', 'Code'];

const Connectors: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState('name');
  
  const filteredConnectors = React.useMemo(() => {
    return connectors.filter(connector => {
      // Filter by search
      if (search && !connector.name.toLowerCase().includes(search.toLowerCase()) && 
          !connector.description.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (selectedCategory !== 'All' && connector.category !== selectedCategory) {
        return false;
      }
      
      // Filter by tags
      if (selectedTags.length > 0 && !connector.tags.some(tag => selectedTags.includes(tag))) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }, [search, selectedCategory, selectedTags, sortBy]);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Connectors Library</h1>
          <p className="text-default-500">Connect your workflows to external services and data sources</p>
        </div>
        <Button color="primary" startContent={<Icon icon="lucide:plus" width={16} />}>
          Create Custom Connector
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search connectors..."
          value={search}
          onValueChange={setSearch}
          startContent={<Icon icon="lucide:search" width={16} />}
          className="md:max-w-xs"
        />
        
        <Select
          placeholder="Category"
          selectedKeys={[selectedCategory]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setSelectedCategory(selected);
          }}
          className="md:max-w-xs"
        >
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
        
        <Select
          placeholder="Sort by"
          selectedKeys={[sortBy]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setSortBy(selected);
          }}
          className="md:max-w-xs"
        >
          <SelectItem key="name" value="name">Name</SelectItem>
          <SelectItem key="category" value="category">Category</SelectItem>
        </Select>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            variant={selectedTags.includes(tag) ? 'flat' : 'bordered'}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            onClose={selectedTags.includes(tag) ? () => toggleTag(tag) : undefined}
            onClick={() => toggleTag(tag)}
            className="cursor-pointer"
          >
            {tag}
          </Chip>
        ))}
      </div>
      
      {/* Connectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredConnectors.map((connector) => (
          <Card key={connector.id} shadow="sm" className="border border-divider">
            <CardBody className="gap-3">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-default-100 rounded-lg">
                  <Icon icon={connector.logo} width={32} height={32} />
                </div>
                <Chip size="sm" variant="flat" color="default">
                  {connector.category}
                </Chip>
              </div>
              
              <div>
                <h3 className="font-semibold text-medium">{connector.name}</h3>
                <p className="text-small text-default-500">{connector.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {connector.tags.map((tag) => (
                  <Chip key={tag} size="sm" variant="flat" color="default">
                    {tag}
                  </Chip>
                ))}
              </div>
            </CardBody>
            
            <CardFooter>
              {connector.isInstalled ? (
                <Button
                  fullWidth
                  variant="flat"
                  color="success"
                  startContent={<Icon icon="lucide:check" width={16} />}
                >
                  Installed
                </Button>
              ) : (
                <Button
                  fullWidth
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="lucide:plus" width={16} />}
                >
                  Add Connector
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Connectors;
