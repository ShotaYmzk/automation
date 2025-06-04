import React from 'react';
import { Card, CardBody, CardFooter, Button, Input, Chip, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

// コネクタデータのインターフェース
interface ConnectorInfo {
  id: string;
  nameKey: string;
  descriptionKey: string;
  categoryKey: string;
  tagKeys: string[];
  logo: string;
  isInstalled: boolean;
}

// カテゴリとタグの型定義
interface CategoryInfo {
  key: string;
  labelKey: string;
}

interface TagInfo {
  key: string;
  labelKey: string;
}


const Connectors: React.FC = () => {
  const { t, i18n } = useTranslation();

  // 翻訳関数を引数に取り、翻訳されたコネクタデータを返す関数
  const getConnectorsData = React.useCallback((): ConnectorInfo[] => [
    {
      id: '1',
      nameKey: 'connectorsPage.connectorNames.openAI',
      descriptionKey: 'connectorsPage.connectorDescriptions.openAI',
      categoryKey: 'connectorsPage.aiCategory',
      tagKeys: ['connectorsPage.llmTag', 'connectorsPage.imageGenerationTag'],
      logo: 'logos:openai-icon',
      isInstalled: true
    },
    {
      id: '2',
      nameKey: 'connectorsPage.connectorNames.mongoDB',
      descriptionKey: 'connectorsPage.connectorDescriptions.mongoDB',
      categoryKey: 'connectorsPage.databaseCategory',
      tagKeys: ['connectorsPage.noSqlTag', 'connectorsPage.databaseCategory'],
      logo: 'logos:mongodb-icon',
      isInstalled: false
    },
    {
      id: '3',
      nameKey: 'connectorsPage.connectorNames.slack',
      descriptionKey: 'connectorsPage.connectorDescriptions.slack',
      categoryKey: 'connectorsPage.communicationCategory',
      tagKeys: ['connectorsPage.messagingTag', 'connectorsPage.notificationsTag'],
      logo: 'logos:slack-icon',
      isInstalled: true
    },
    {
      id: '4',
      nameKey: 'connectorsPage.connectorNames.googleDrive',
      descriptionKey: 'connectorsPage.connectorDescriptions.googleDrive',
      categoryKey: 'connectorsPage.storageCategory',
      tagKeys: ['connectorsPage.fileStorageTag', 'connectorsPage.cloudTag'],
      logo: 'logos:google-drive',
      isInstalled: false
    },
    {
      id: '5',
      nameKey: 'connectorsPage.connectorNames.postgreSQL',
      descriptionKey: 'connectorsPage.connectorDescriptions.postgreSQL',
      categoryKey: 'connectorsPage.databaseCategory',
      tagKeys: ['connectorsPage.sqlTag', 'connectorsPage.databaseCategory'],
      logo: 'logos:postgresql',
      isInstalled: false
    },
    {
      id: '6',
      nameKey: 'connectorsPage.connectorNames.stripe',
      descriptionKey: 'connectorsPage.connectorDescriptions.stripe',
      categoryKey: 'connectorsPage.paymentCategory',
      tagKeys: ['connectorsPage.paymentCategory', 'connectorsPage.financeTag'],
      logo: 'logos:stripe',
      isInstalled: false
    },
    {
      id: '7',
      nameKey: 'connectorsPage.connectorNames.hubSpot',
      descriptionKey: 'connectorsPage.connectorDescriptions.hubSpot',
      categoryKey: 'connectorsPage.crmCategory',
      tagKeys: ['connectorsPage.marketingTag', 'connectorsPage.crmCategory'],
      logo: 'logos:hubspot',
      isInstalled: false
    },
    {
      id: '8',
      nameKey: 'connectorsPage.connectorNames.awsS3',
      descriptionKey: 'connectorsPage.connectorDescriptions.awsS3',
      categoryKey: 'connectorsPage.storageCategory',
      tagKeys: ['connectorsPage.fileStorageTag', 'connectorsPage.cloudTag'],
      logo: 'logos:aws-s3',
      isInstalled: true
    },
    {
      id: '9',
      nameKey: 'connectorsPage.connectorNames.anthropic',
      descriptionKey: 'connectorsPage.connectorDescriptions.anthropic',
      categoryKey: 'connectorsPage.aiCategory',
      tagKeys: ['connectorsPage.llmTag', 'connectorsPage.textGenerationTag'],
      logo: 'logos:anthropic',
      isInstalled: false
    },
    {
      id: '10',
      nameKey: 'connectorsPage.connectorNames.salesforce',
      descriptionKey: 'connectorsPage.connectorDescriptions.salesforce',
      categoryKey: 'connectorsPage.crmCategory',
      tagKeys: ['connectorsPage.crmCategory', 'connectorsPage.salesTag'],
      logo: 'logos:salesforce',
      isInstalled: false
    },
    {
      id: '11',
      nameKey: 'connectorsPage.connectorNames.twilio',
      descriptionKey: 'connectorsPage.connectorDescriptions.twilio',
      categoryKey: 'connectorsPage.communicationCategory',
      tagKeys: ['connectorsPage.smsTag', 'connectorsPage.voiceTag'],
      logo: 'logos:twilio-icon',
      isInstalled: false
    },
    {
      id: '12',
      nameKey: 'connectorsPage.connectorNames.gitHub',
      descriptionKey: 'connectorsPage.connectorDescriptions.gitHub',
      categoryKey: 'connectorsPage.developmentCategory',
      tagKeys: ['connectorsPage.codeTag', 'connectorsPage.versionControlTag'],
      logo: 'logos:github-icon',
      isInstalled: true
    }
  ], [t]); // t を依存配列に追加

  const connectors = getConnectorsData(); // コンポーネント内で呼び出し

  const categories: CategoryInfo[] = [
    { key: 'All', labelKey: 'connectorsPage.allCategories' },
    { key: 'AI', labelKey: 'connectorsPage.aiCategory' },
    { key: 'Database', labelKey: 'connectorsPage.databaseCategory' },
    { key: 'Communication', labelKey: 'connectorsPage.communicationCategory' },
    { key: 'Storage', labelKey: 'connectorsPage.storageCategory' },
    { key: 'Payment', labelKey: 'connectorsPage.paymentCategory' },
    { key: 'CRM', labelKey: 'connectorsPage.crmCategory' },
    { key: 'Development', labelKey: 'connectorsPage.developmentCategory' }
  ];
  
  const tagsForFilter: TagInfo[] = [ // 変数名を変更して衝突を回避
    { key: 'LLM', labelKey: 'connectorsPage.llmTag' },
    { key: 'Database', labelKey: 'connectorsPage.databaseCategory' },
    { key: 'SQL', labelKey: 'connectorsPage.sqlTag' },
    { key: 'NoSQL', labelKey: 'connectorsPage.noSqlTag' },
    { key: 'Messaging', labelKey: 'connectorsPage.messagingTag' },
    { key: 'File Storage', labelKey: 'connectorsPage.fileStorageTag' },
    { key: 'Cloud', labelKey: 'connectorsPage.cloudTag' },
    { key: 'Payment', labelKey: 'connectorsPage.paymentCategory' },
    { key: 'CRM', labelKey: 'connectorsPage.crmCategory' },
    { key: 'Code', labelKey: 'connectorsPage.codeTag' }
  ];

  const [search, setSearch] = React.useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = React.useState('All'); // キーを保持
  const [selectedTagLabels, setSelectedTagLabels] = React.useState<string[]>([]); // ラベルを保持
  const [sortBy, setSortBy] = React.useState('name');
  
  const filteredConnectors = React.useMemo(() => {
    return connectors.filter(connector => {
      const name = t(connector.nameKey);
      const description = t(connector.descriptionKey);
      const category = t(connector.categoryKey);

      if (search && !name.toLowerCase().includes(search.toLowerCase()) && 
          !description.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      
      const currentSelectedCategoryLabel = t(categories.find(c => c.key === selectedCategoryKey)?.labelKey || '');
      if (selectedCategoryKey !== 'All' && category !== currentSelectedCategoryLabel) {
        return false;
      }
      
      if (selectedTagLabels.length > 0 && !connector.tagKeys.some(tagKey => selectedTagLabels.includes(t(tagKey)))) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      const nameA = t(a.nameKey);
      const nameB = t(b.nameKey);
      const categoryA = t(a.categoryKey);
      const categoryB = t(b.categoryKey);

      if (sortBy === 'name') {
        return nameA.localeCompare(nameB, i18n.language);
      } else if (sortBy === 'category') {
        return categoryA.localeCompare(categoryB, i18n.language);
      }
      return 0;
    });
  }, [search, selectedCategoryKey, selectedTagLabels, sortBy, t, connectors, i18n.language, categories]);
  
  const toggleTag = (tagLabel: string) => {
    if (selectedTagLabels.includes(tagLabel)) {
      setSelectedTagLabels(selectedTagLabels.filter(t => t !== tagLabel));
    } else {
      setSelectedTagLabels([...selectedTagLabels, tagLabel]);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t('connectorsPage.title')}</h1>
          <p className="text-default-500">{t('connectorsPage.subtitle')}</p>
        </div>
        <Button color="primary" startContent={<Icon icon="lucide:plus" width={16} />}>{t('connectorsPage.createCustomConnector')}</Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder={t('connectorsPage.searchPlaceholder')}
          value={search}
          onValueChange={setSearch}
          startContent={<Icon icon="lucide:search" width={16} />}
          className="md:max-w-xs"
          aria-label={t('connectorsPage.searchPlaceholder')}
        />
        
        <Select
          placeholder={t('connectorsPage.category')}
          selectedKeys={[selectedCategoryKey]} // キーを使用
          onSelectionChange={(keys) => {
            // keys は Set<React.Key> 型なので、適切に処理する
            const selected = Array.from(keys as Set<string>)[0]; // stringにキャスト
            setSelectedCategoryKey(selected || 'All'); // nullチェック
          }}
          className="md:max-w-xs"
          aria-label={t('connectorsPage.category')}
        >
          {categories.map((categoryObj) => ( // categoryObj を使用
            <SelectItem key={categoryObj.key}>
              {t(categoryObj.labelKey)}
            </SelectItem>
          ))}
        </Select>
        
        <Select
          placeholder={t('connectorsPage.sortBy')}
          selectedKeys={[sortBy]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys as Set<string>)[0];
            setSortBy(selected || 'name');
          }}
          className="md:max-w-xs"
          aria-label={t('connectorsPage.sortBy')}
        >
          <SelectItem key="name">{t('connectorsPage.sortByName')}</SelectItem>
          <SelectItem key="category">{t('connectorsPage.sortByCategory')}</SelectItem>
        </Select>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tagsForFilter.map((tagInfo) => { // tagInfo を使用
          const tagLabel = t(tagInfo.labelKey);
          return (
            <Chip
              key={tagInfo.key} // key を使用
              variant={selectedTagLabels.includes(tagLabel) ? 'flat' : 'bordered'}
              color={selectedTagLabels.includes(tagLabel) ? 'primary' : 'default'}
              onClose={selectedTagLabels.includes(tagLabel) ? () => toggleTag(tagLabel) : undefined}
              onClick={() => toggleTag(tagLabel)}
              className="cursor-pointer"
            >
              {tagLabel}
            </Chip>
          );
        })}
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
                  {t(connector.categoryKey)}
                </Chip>
              </div>
              
              <div>
                <h3 className="font-semibold text-medium">{t(connector.nameKey)}</h3>
                <p className="text-small text-default-500">{t(connector.descriptionKey)}</p>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {connector.tagKeys.map((tagKey) => (
                  <Chip key={tagKey} size="sm" variant="flat" color="default">
                    {t(tagKey)}
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
                  {t('connectorsPage.installed')}
                </Button>
              ) : (
                <Button
                  fullWidth
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="lucide:plus" width={16} />}
                >
                  {t('connectorsPage.addConnector')}
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