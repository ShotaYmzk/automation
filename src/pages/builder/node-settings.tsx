import React from 'react';
import { Tabs, Tab, Input, Textarea, Select, SelectItem, Slider, Checkbox, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Node } from 'reactflow';
import { useTranslation } from 'react-i18next';

interface NodeSettingsProps {
  selectedNode: Node | null;
}

const NodeSettings: React.FC<NodeSettingsProps> = ({ selectedNode }) => {
  const { t } = useTranslation();

  if (!selectedNode) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 text-default-500">
        <Icon icon="lucide:settings-2" width={32} className="mb-2" />
        <p>{t('builder.selectNodeToConfigure')}</p>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-y-auto flex-1"> {/* flex-1 を追加 */}
      <div className="mb-4">
        <Input
          label={t('builder.nodeName')}
          placeholder={t('builder.enterNodeName')}
          defaultValue={selectedNode.data.label}
          className="mb-2"
        />
        <Textarea
          label={t('builder.description')}
          placeholder={t('builder.enterNodeDescription')}
          className="mb-2"
        />
      </div>
      
      <Tabs aria-label={t('builder.nodeSettings') + " tabs"}>
        <Tab key="input" title={
          <div className="flex items-center gap-1">
            <Icon icon="lucide:arrow-down-to-line" width={16} />
            <span>{t('builder.input')}</span>
          </div>
        }>
          <div className="p-2 space-y-4">
            <Select
              label={t('builder.inputType')}
              placeholder={t('builder.selectInputType')}
              defaultSelectedKeys={["text"]}
            >
              <SelectItem key="text" value="text">{t('builder.text')}</SelectItem>
              <SelectItem key="json" value="json">{t('builder.json')}</SelectItem>
              <SelectItem key="file" value="file">{t('builder.file')}</SelectItem>
            </Select>
            
            <Checkbox defaultSelected>{t('builder.required')}</Checkbox>
            
            <Input
              label={t('builder.defaultValue')}
              placeholder={t('builder.enterDefaultValue')}
            />
          </div>
        </Tab>
        
        <Tab key="output" title={
          <div className="flex items-center gap-1">
            <Icon icon="lucide:arrow-up-from-line" width={16} />
            <span>{t('builder.output')}</span>
          </div>
        }>
          <div className="p-2 space-y-4">
            <Select
              label={t('builder.outputFormat')}
              placeholder={t('builder.selectOutputFormat')}
              defaultSelectedKeys={["json"]}
            >
              <SelectItem key="text" value="text">{t('builder.text')}</SelectItem>
              <SelectItem key="json" value="json">{t('builder.json')}</SelectItem>
              <SelectItem key="file" value="file">{t('builder.file')}</SelectItem>
            </Select>
            
            <Textarea
              label={t('builder.schema')}
              placeholder={t('builder.jsonSchemaOptional')}
              rows={4}
            />
          </div>
        </Tab>
        
        <Tab key="llm" title={
          <div className="flex items-center gap-1">
            <Icon icon="lucide:settings" width={16} />
            <span>{t('builder.llmParams')}</span>
          </div>
        }>
          <div className="p-2 space-y-4">
            <Select
              label={t('builder.model')}
              placeholder={t('builder.selectLLMModel')}
              defaultSelectedKeys={["gpt4"]}
            >
              <SelectItem key="gpt4" value="gpt4">GPT-4</SelectItem>
              <SelectItem key="gpt35" value="gpt35">GPT-3.5 Turbo</SelectItem>
              <SelectItem key="claude" value="claude">Claude 3</SelectItem>
              <SelectItem key="mistral" value="mistral">Mistral Large</SelectItem>
            </Select>
            
            <div>
              <p className="text-small text-default-500 mb-1">{t('builder.temperature')}</p>
              <Slider 
                label={t('builder.temperature')} 
                step={0.1}
                maxValue={1} 
                minValue={0} 
                defaultValue={0.7}
                className="max-w-md"
              />
            </div>
            
            <div>
              <p className="text-small text-default-500 mb-1">{t('builder.maxTokens')}</p>
              <Slider 
                label={t('builder.maxTokens')} 
                step={100}
                maxValue={4000} 
                minValue={100} 
                defaultValue={1000}
                className="max-w-md"
              />
            </div>
            
            <Textarea
              label={t('builder.systemPrompt')}
              placeholder={t('builder.enterSystemPrompt')}
              rows={4}
            />
          </div>
        </Tab>
      </Tabs>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="flat" color="danger">
          {t('builder.deleteNode')}
        </Button>
        <Button color="primary">
          {t('builder.applyChanges')}
        </Button>
      </div>
    </div>
  );
};

export default NodeSettings;