import React from 'react';
import { Accordion, AccordionItem, Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

interface NodeCategory {
  key: string;
  translationKeyTitle: string;
  icon: string;
  nodes: {
    id: string;
    translationKeyName: string;
    icon: string;
  }[];
}

const NodePalette: React.FC = () => {
  const { t } = useTranslation();

  const nodeCategories: NodeCategory[] = [
    {
      key: 'llm',
      translationKeyTitle: 'builder.palette.llm',
      icon: 'lucide:message-square',
      nodes: [
        { id: 'llm-1', translationKeyName: 'builder.palette.textGeneration', icon: 'lucide:type' },
        { id: 'llm-2', translationKeyName: 'builder.palette.chat', icon: 'lucide:message-circle' },
        { id: 'llm-3', translationKeyName: 'builder.palette.summarize', icon: 'lucide:file-text' },
      ],
    },
    {
      key: 'data',
      translationKeyTitle: 'builder.palette.dataProcessing',
      icon: 'lucide:database',
      nodes: [
        { id: 'data-1', translationKeyName: 'builder.palette.csvParser', icon: 'lucide:file-spreadsheet' },
        { id: 'data-2', translationKeyName: 'builder.palette.jsonTransform', icon: 'lucide:braces' },
        { id: 'data-3', translationKeyName: 'builder.palette.filter', icon: 'lucide:filter' },
      ],
    },
    {
      key: 'connectors',
      translationKeyTitle: 'builder.palette.connectors',
      icon: 'lucide:plug',
      nodes: [
        { id: 'conn-1', translationKeyName: 'builder.palette.restApi', icon: 'lucide:globe' },
        { id: 'conn-2', translationKeyName: 'builder.palette.database', icon: 'lucide:database' },
        { id: 'conn-3', translationKeyName: 'builder.palette.storage', icon: 'lucide:hard-drive' },
      ],
    },
    {
      key: 'logic',
      translationKeyTitle: 'builder.palette.logic',
      icon: 'lucide:git-branch',
      nodes: [
        { id: 'logic-1', translationKeyName: 'builder.palette.ifElse', icon: 'lucide:git-fork' },
        { id: 'logic-2', translationKeyName: 'builder.palette.switch', icon: 'lucide:route' },
        { id: 'logic-3', translationKeyName: 'builder.palette.loop', icon: 'lucide:repeat' },
      ],
    },
  ];


  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    // このdivがflexコンテナ内で伸縮し、コンテンツが多い場合はスクロールします
    <div className="overflow-y-auto flex-1"> 
      <Accordion selectionMode="multiple" defaultExpandedKeys={["llm", "data"]}>
        {nodeCategories.map((category) => (
          <AccordionItem
            key={category.key}
            aria-label={t(category.translationKeyTitle)}
            title={
              <div className="flex items-center gap-2">
                <Icon icon={category.icon} width={16} />
                <span>{t(category.translationKeyTitle)}</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 gap-2 p-2">
              {category.nodes.map((node) => (
                <Card
                  key={node.id}
                  isPressable
                  className="nodrag" // このクラス名はreactflowのデフォルトスタイルでドラッグを無効にするかもしれません
                  onDragStart={(event) => onDragStart(event, node.id)}
                  draggable
                >
                  <CardBody className="py-2 px-3 flex flex-row items-center gap-2">
                    <Icon icon={node.icon} width={16} />
                    <span className="text-small">{t(node.translationKeyName)}</span>
                  </CardBody>
                </Card>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default NodePalette;