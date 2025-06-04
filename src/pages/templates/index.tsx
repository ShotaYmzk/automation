import React from 'react';
import { Card, CardBody, CardFooter, Button, Input, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react'; // Badge は未使用なので削除
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next'; // インポート

interface Template {
  id: string;
  nameKey: string;
  descriptionKey: string;
  categoryKey: string;
  difficultyKey: string;
  rating: number;
  downloads: number;
  image: string;
  requiredConnectors: string[]; // コネクタ名はそのまま保持（翻訳キーではない）
}


const Templates: React.FC = () => {
  const { t } = useTranslation(); // t関数を取得
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null);
  const [search, setSearch] = React.useState('');

  // 翻訳キーを使用するようにtemplatesデータを更新
  const templates: Template[] = [
    {
      id: '1',
      nameKey: 'templatesPage.templateNames.customerSupport',
      descriptionKey: 'templatesPage.templateDescriptions.customerSupport',
      categoryKey: 'templatesPage.customerService',
      difficultyKey: 'templatesPage.difficulty.beginner',
      rating: 4.8,
      downloads: 1245,
      image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=1',
      requiredConnectors: ['OpenAI', 'Slack', 'HubSpot']
    },
    {
      id: '2',
      nameKey: 'templatesPage.templateNames.dataExtraction',
      descriptionKey: 'templatesPage.templateDescriptions.dataExtraction',
      categoryKey: 'templatesPage.dataProcessing',
      difficultyKey: 'templatesPage.difficulty.intermediate',
      rating: 4.5,
      downloads: 876,
      image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=2',
      requiredConnectors: ['OpenAI', 'MongoDB', 'AWS S3']
    },
    {
      id: '3',
      nameKey: 'templatesPage.templateNames.contentGenerator',
      descriptionKey: 'templatesPage.templateDescriptions.contentGenerator',
      categoryKey: 'templatesPage.marketing',
      difficultyKey: 'templatesPage.difficulty.beginner',
      rating: 4.6,
      downloads: 1532,
      image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=3',
      requiredConnectors: ['OpenAI', 'Google Drive']
    },
    {
      id: '4',
      nameKey: 'templatesPage.templateNames.salesLeadQualifier',
      descriptionKey: 'templatesPage.templateDescriptions.salesLeadQualifier',
      categoryKey: 'templatesPage.sales',
      difficultyKey: 'templatesPage.difficulty.intermediate',
      rating: 4.3,
      downloads: 654,
      image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=4',
      requiredConnectors: ['Salesforce', 'HubSpot']
    },
    {
      id: '5',
      nameKey: 'templatesPage.templateNames.documentSummarizer',
      descriptionKey: 'templatesPage.templateDescriptions.documentSummarizer',
      categoryKey: 'templatesPage.productivity',
      difficultyKey: 'templatesPage.difficulty.beginner',
      rating: 4.7,
      downloads: 987,
      image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=5',
      requiredConnectors: ['OpenAI', 'Google Drive']
    },
    {
      id: '6',
      nameKey: 'templatesPage.templateNames.codeReviewAssistant',
      descriptionKey: 'templatesPage.templateDescriptions.codeReviewAssistant',
      categoryKey: 'templatesPage.development',
      difficultyKey: 'templatesPage.difficulty.advanced',
      rating: 4.4,
      downloads: 432,
      image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=6',
      requiredConnectors: ['OpenAI', 'GitHub']
    }
  ];

  const difficultyColorMap: Record<string, "success" | "warning" | "danger" | "default"> = { // stringに変更
    [t('templatesPage.difficulty.beginner')]: 'success',
    [t('templatesPage.difficulty.intermediate')]: 'warning',
    [t('templatesPage.difficulty.advanced')]: 'danger'
  };

  const templateCategories = [
    {key: "all", labelKey: "templatesPage.allCategories"},
    {key: "customerService", labelKey: "templatesPage.customerService"},
    {key: "dataProcessing", labelKey: "templatesPage.dataProcessing"},
    {key: "marketing", labelKey: "templatesPage.marketing"},
    {key: "sales", labelKey: "templatesPage.sales"},
    {key: "productivity", labelKey: "templatesPage.productivity"}
  ];
  
  const filteredTemplates = React.useMemo(() => {
    if (!search) return templates;
    
    return templates.filter(template => 
      t(template.nameKey).toLowerCase().includes(search.toLowerCase()) ||
      t(template.descriptionKey).toLowerCase().includes(search.toLowerCase()) ||
      t(template.categoryKey).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, t, templates]); // templatesを追加
  
  const handleInstallClick = (template: Template) => {
    setSelectedTemplate(template);
    onOpen();
  };
  
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">{t('templatesPage.title')}</h1>
          <p className="text-lg mb-6">{t('templatesPage.subtitle')}</p>
          <div className="flex flex-wrap gap-4">
            <Button 
              color="default" 
              variant="solid"
              startContent={<Icon icon="lucide:search" width={16} />}
            >
              {t('templatesPage.browseTemplates')}
            </Button>
            <Button 
              color="default" 
              variant="bordered"
              startContent={<Icon icon="lucide:upload" width={16} />}
            >
              {t('templatesPage.submitYourTemplate')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          placeholder={t('templatesPage.searchPlaceholder')}
          value={search}
          onValueChange={setSearch}
          startContent={<Icon icon="lucide:search" width={16} />}
          className="md:max-w-xs"
          aria-label={t('templatesPage.searchPlaceholder')}
        />
        
        <div className="flex gap-2 flex-wrap">
          {templateCategories.map(cat => (
             <Chip key={cat.key} variant={cat.key === 'all' ? "flat" : "bordered"} color="default">{t(cat.labelKey)}</Chip>
          ))}
        </div>
      </div>
      
      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const difficultyLabel = t(template.difficultyKey);
          return (
            <Card key={template.id} shadow="sm" className="border border-divider">
              <img
                src={template.image}
                alt={t(template.nameKey)}
                className="w-full h-48 object-cover"
              />
              
              <CardBody className="gap-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-medium">{t(template.nameKey)}</h3>
                  <Chip 
                    size="sm" 
                    variant="flat" 
                    color={difficultyColorMap[difficultyLabel] || 'default'}
                  >
                    {difficultyLabel}
                  </Chip>
                </div>
                
                <p className="text-small text-default-500">{t(template.descriptionKey)}</p>
                
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
                  {t('templatesPage.useTemplate')}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      
      {/* Install Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{t('templatesPage.installTemplate')}</ModalHeader>
              <ModalBody>
                {selectedTemplate && (
                  <>
                    <h3 className="font-semibold">{t(selectedTemplate.nameKey)}</h3>
                    <p className="text-default-500">{t(selectedTemplate.descriptionKey)}</p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">{t('templatesPage.requiredConnectors')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.requiredConnectors.map((connector) => {
                          // 実際のインストール状況は外部から取得する必要がある
                          const isInstalled = ['OpenAI', 'Slack', 'AWS S3', 'GitHub'].includes(connector);
                          
                          return (
                            <Chip
                              key={connector}
                              variant="flat"
                              color={isInstalled ? 'success' : 'default'}
                              startContent={isInstalled ? <Icon icon="lucide:check" width={14} /> : null}
                            >
                              {connector} {/* コネクタ名はそのまま表示 */}
                            </Chip>
                          );
                        })}
                      </div>
                      
                      {selectedTemplate.requiredConnectors.some(
                        connector => !['OpenAI', 'Slack', 'AWS S3', 'GitHub'].includes(connector)
                      ) && (
                        <p className="text-small text-warning mt-2">
                          <Icon icon="lucide:alert-triangle" className="inline mr-1" width={14} />
                          {t('templatesPage.connectorsNotInstalled')}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  {t('common.cancel')}
                </Button>
                <Button color="primary" onPress={onClose}>
                  {t('templatesPage.installAndCustomize')}
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