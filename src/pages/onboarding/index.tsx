import React from 'react';
import { Card, CardBody, CardFooter, Button, Input, Select, SelectItem, Checkbox } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Connector {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  difficulty: string;
}

const connectors: Connector[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Connect to OpenAI models including GPT-4 and DALL-E',
    logo: 'logos:openai-icon',
    category: 'AI'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'Connect to MongoDB databases for document storage',
    logo: 'logos:mongodb-icon',
    category: 'Database'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send and receive messages from Slack channels',
    logo: 'logos:slack-icon',
    category: 'Communication'
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Access and manage files in Google Drive',
    logo: 'logos:google-drive',
    category: 'Storage'
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    description: 'Connect to PostgreSQL databases',
    logo: 'logos:postgresql',
    category: 'Database'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Process payments and manage subscriptions',
    logo: 'logos:stripe',
    category: 'Payment'
  }
];

const templates: Template[] = [
  {
    id: 'customer-support',
    name: 'Customer Support Bot',
    description: 'Automate customer support with an AI chatbot that can answer FAQs and escalate complex issues.',
    image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=1',
    difficulty: 'Beginner'
  },
  {
    id: 'data-extraction',
    name: 'Data Extraction Pipeline',
    description: 'Extract structured data from documents, emails, and web pages using AI.',
    image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=2',
    difficulty: 'Intermediate'
  },
  {
    id: 'content-generator',
    name: 'Content Generator',
    description: 'Generate blog posts, social media content, and marketing copy based on your brand guidelines.',
    image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=3',
    difficulty: 'Beginner'
  }
];

const Onboarding: React.FC = () => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedConnectors, setSelectedConnectors] = React.useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);
  
  const [orgName, setOrgName] = React.useState('');
  const [industry, setIndustry] = React.useState<string>('');
  
  const { t } = useTranslation();
  
  const handleConnectorToggle = (connectorId: string) => {
    if (selectedConnectors.includes(connectorId)) {
      setSelectedConnectors(selectedConnectors.filter(id => id !== connectorId));
    } else {
      setSelectedConnectors([...selectedConnectors, connectorId]);
    }
  };
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  
  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      history.push('/dashboard');
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    history.push('/dashboard');
  };
  
  // Updated getStepStatus function to work with Stepper's API
  const getStepStatus = (step: number) => {
    if (step < currentStep) return "completed";
    if (step === currentStep) return "active";
    return "waiting";
  };
  
  return (
    <div className="min-h-screen bg-default-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl">
        <Card shadow="md" className="p-6">
          <CardBody className="gap-6">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Icon icon="lucide:zap" className="text-primary" width={32} />
              </div>
              <h1 className="text-2xl font-bold">Welcome to AI Workflow Studio</h1>
              <p className="text-default-500">Let's get you set up in just a few steps</p>
            </div>
            
            {/* Replace Stepper with custom step indicator */}
            <div className="flex justify-between items-center mb-6">
              {[0, 1, 2].map((step) => (
                <div key={step} className="flex flex-1 items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step < currentStep 
                        ? 'bg-primary text-white' 
                        : step === currentStep 
                          ? 'bg-primary-100 text-primary border border-primary' 
                          : 'bg-default-100 text-default-500'
                    }`}
                  >
                    {step < currentStep ? (
                      <Icon icon="lucide:check" width={16} />
                    ) : (
                      step + 1
                    )}
                  </div>
                  <div className={`flex-1 h-1 ${
                    step === 2 ? 'hidden' : step < currentStep ? 'bg-primary' : 'bg-default-200'
                  }`} />
                  <div className="flex flex-col ml-2">
                    <span className={`text-sm font-medium ${
                      step <= currentStep ? 'text-foreground' : 'text-default-500'
                    }`}>
                      {step === 0 ? 'Basic Info' : step === 1 ? 'Connectors' : 'Template'}
                    </span>
                    <span className="text-xs text-default-500">
                      {step === 0 ? 'Organization details' : step === 1 ? 'Select integrations' : 'Choose a starter template'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Step 1: Basic Information */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <Input
                    label="Organization Name"
                    placeholder="Enter your organization name"
                    value={orgName}
                    onValueChange={setOrgName}
                    isRequired
                  />
                  
                  <Select
                    label={t('onboardingPage.industry')}
                    placeholder={t('onboardingPage.selectIndustry')}
                    selectedKeys={industry ? [industry] : []}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as string;
                      setIndustry(selected);
                    }}
                    isRequired
                    aria-label={t('onboardingPage.industry')}
                  >
                    <SelectItem key="technology">{t('onboardingPage.industries.technology')}</SelectItem>
                    <SelectItem key="finance">{t('onboardingPage.industries.finance')}</SelectItem>
                    <SelectItem key="healthcare">{t('onboardingPage.industries.healthcare')}</SelectItem>
                    <SelectItem key="education">{t('onboardingPage.industries.education')}</SelectItem>
                    <SelectItem key="retail">{t('onboardingPage.industries.retail')}</SelectItem>
                    <SelectItem key="manufacturing">{t('onboardingPage.industries.manufacturing')}</SelectItem>
                  </Select>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <Checkbox id="terms" defaultSelected />
                    <label htmlFor="terms" className="text-small">
                      I agree to the <a href="#" className="text-primary">Terms of Service</a> and <a href="#" className="text-primary">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Select Connectors */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <p className="text-default-500 mb-4">Select the connectors you want to use with your workflows:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {connectors.map((connector) => (
                    <Card
                      key={connector.id}
                      isPressable
                      shadow="sm"
                      className={`border ${
                        selectedConnectors.includes(connector.id)
                          ? 'border-primary'
                          : 'border-divider'
                      }`}
                      onPress={() => handleConnectorToggle(connector.id)}
                    >
                      <CardBody className="gap-3">
                        <div className="flex justify-between items-start">
                          <div className="p-2 bg-default-100 rounded-lg">
                            <Icon icon={connector.logo} width={24} height={24} />
                          </div>
                          <Checkbox
                            isSelected={selectedConnectors.includes(connector.id)}
                            onChange={() => handleConnectorToggle(connector.id)}
                            color="primary"
                          />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold">{connector.name}</h3>
                          <p className="text-small text-default-500">{connector.description}</p>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Choose Template */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <p className="text-default-500 mb-4">Choose a template to get started quickly:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      isPressable
                      shadow="sm"
                      className={`border ${
                        selectedTemplate === template.id
                          ? 'border-primary'
                          : 'border-divider'
                      }`}
                      onPress={() => handleTemplateSelect(template.id)}
                    >
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-36 object-cover"
                      />
                      
                      <CardBody className="gap-2">
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-small text-default-500">{template.description}</p>
                      </CardBody>
                      
                      <CardFooter>
                        <Button
                          fullWidth
                          color={selectedTemplate === template.id ? 'primary' : 'default'}
                          variant={selectedTemplate === template.id ? 'solid' : 'flat'}
                          onPress={() => handleTemplateSelect(template.id)}
                        >
                          {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </CardBody>
          
          <CardFooter className="flex justify-between pt-6">
            <div>
              {currentStep > 0 && (
                <Button
                  variant="flat"
                  onPress={handleBack}
                  startContent={<Icon icon="lucide:arrow-left" width={16} />}
                >
                  Back
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="light" onPress={handleSkip}>
                Skip for now
              </Button>
              
              <Button
                color="primary"
                onPress={handleNext}
                endContent={currentStep < 2 ? <Icon icon="lucide:arrow-right" width={16} /> : undefined}
                isDisabled={
                  (currentStep === 0 && (!orgName || !industry)) ||
                  (currentStep === 2 && !selectedTemplate)
                }
              >
                {currentStep < 2 ? 'Continue' : 'Finish Setup'}
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-4">
          <p className="text-small text-default-500">
            Need help? <a href="#" className="text-primary">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;