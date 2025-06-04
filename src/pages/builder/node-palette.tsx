import React from 'react';
import { Accordion, AccordionItem, Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

interface NodeCategory {
  key: string;
  title: string;
  icon: string;
  nodes: {
    id: string;
    name: string;
    icon: string;
  }[];
}

const nodeCategories: NodeCategory[] = [
  {
    key: 'llm',
    title: 'LLM',
    icon: 'lucide:message-square',
    nodes: [
      { id: 'llm-1', name: 'Text Generation', icon: 'lucide:type' },
      { id: 'llm-2', name: 'Chat', icon: 'lucide:message-circle' },
      { id: 'llm-3', name: 'Summarize', icon: 'lucide:file-text' },
    ],
  },
  {
    key: 'data',
    title: 'Data Processing',
    icon: 'lucide:database',
    nodes: [
      { id: 'data-1', name: 'CSV Parser', icon: 'lucide:file-spreadsheet' },
      { id: 'data-2', name: 'JSON Transform', icon: 'lucide:braces' },
      { id: 'data-3', name: 'Filter', icon: 'lucide:filter' },
    ],
  },
  {
    key: 'connectors',
    title: 'Connectors',
    icon: 'lucide:plug',
    nodes: [
      { id: 'conn-1', name: 'REST API', icon: 'lucide:globe' },
      { id: 'conn-2', name: 'Database', icon: 'lucide:database' },
      { id: 'conn-3', name: 'Storage', icon: 'lucide:hard-drive' },
    ],
  },
  {
    key: 'logic',
    title: 'Logic',
    icon: 'lucide:git-branch',
    nodes: [
      { id: 'logic-1', name: 'If/Else', icon: 'lucide:git-fork' },
      { id: 'logic-2', name: 'Switch', icon: 'lucide:route' },
      { id: 'logic-3', name: 'Loop', icon: 'lucide:repeat' },
    ],
  },
];

const NodePalette: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="overflow-y-auto flex-1">
      <Accordion>
        {nodeCategories.map((category) => (
          <AccordionItem
            key={category.key}
            aria-label={category.title}
            title={
              <div className="flex items-center gap-2">
                <Icon icon={category.icon} width={16} />
                <span>{category.title}</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 gap-2 p-2">
              {category.nodes.map((node) => (
                <Card
                  key={node.id}
                  isPressable
                  className="nodrag"
                  onDragStart={(event) => onDragStart(event, node.id)}
                  draggable
                >
                  <CardBody className="py-2 px-3 flex flex-row items-center gap-2">
                    <Icon icon={node.icon} width={16} />
                    <span className="text-small">{node.name}</span>
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
