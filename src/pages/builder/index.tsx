import React from 'react';
import { Card, CardBody, Button, Tabs, Tab, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, addEdge, useNodesState, useEdgesState, ReactFlowProvider } from 'reactflow'; // ReactFlowProvider をインポート
import 'reactflow/dist/style.css';
import { useTranslation } from 'react-i18next';

// Node components
import NodePalette from './node-palette';
import NodeSettings from './node-settings';

// Initial nodes and edges
const Builder: React.FC = () => {
  const { t } = useTranslation();

  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: t('builder.initialNodes.input') },
      position: { x: 250, y: 5 },
    },
    {
      id: '2',
      data: { label: t('builder.initialNodes.llmNode') },
      position: { x: 250, y: 100 },
    },
    {
      id: '3',
      type: 'output',
      data: { label: t('builder.initialNodes.output') },
      position: { x: 250, y: 200 },
    },
  ];
  
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = React.useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(true);

  const onConnect = React.useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = React.useCallback((_: any, node: Node) => {
    setSelectedNode(node);
    setIsSettingsOpen(true); // Nodeをクリックしたら設定パネルを開く
  }, []);
  
  // ReactFlowProviderでラップすることで、内部コンポーネントがReactFlowのコンテキストにアクセスできるようにします
  return (
    <ReactFlowProvider> 
      <div className="h-full flex flex-col">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button
              color="primary"
              startContent={<Icon icon="lucide:play" width={18} />}
            >
              {t('builder.runWorkflow')}
            </Button>
            
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<Icon icon="lucide:save" width={18} />}
                >
                  {t('common.save')}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label={t('common.save') + " options"}>
                <DropdownItem key="save">{t('common.save')}</DropdownItem>
                <DropdownItem key="save-as">{t('builder.saveAs')}</DropdownItem>
                <DropdownItem key="save-version">{t('builder.saveNewVersion')}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            <Tooltip content={t('builder.undo')}>
              <Button
                variant="light"
                startContent={<Icon icon="lucide:undo" width={18} />}
                isIconOnly
                aria-label={t('builder.undo')}
              />
            </Tooltip>
            
            <Tooltip content={t('builder.redo')}>
              <Button
                variant="light"
                startContent={<Icon icon="lucide:redo" width={18} />}
                isIconOnly
                aria-label={t('builder.redo')}
              />
            </Tooltip>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-default-100 px-3 py-1 rounded-md text-small flex items-center gap-1">
              <Icon icon="lucide:git-branch" width={16} />
              <span>v1.2.0</span>
            </div>
            
            <Tooltip content={t('builder.workflowSettings')}>
              <Button
                variant="light"
                startContent={<Icon icon="lucide:settings" width={18} />}
                isIconOnly
                aria-label={t('builder.workflowSettings')}
              />
            </Tooltip>
            
            <Tooltip content={t('common.help')}>
              <Button
                variant="light"
                startContent={<Icon icon="lucide:help-circle" width={18} />}
                isIconOnly
                aria-label={t('common.help')}
              />
            </Tooltip>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex min-h-0"> {/* min-h-0 を追加してflexアイテムの縮小を許可 */}
          {/* Left sidebar - Node palette */}
          {/* h-full を削除し、親のflex-1 flex min-h-0 に高さを依存させる */}
          <div className={`transition-all duration-150 ${isPaletteOpen ? 'w-64' : 'w-12'} border-r border-divider flex flex-col`}> 
            {isPaletteOpen ? (
              <div className="h-full flex flex-col"> {/* このdivがPalette全体の高さを管理 */}
                <div className="flex justify-between items-center p-3 border-b border-divider">
                  <h3 className="font-medium">{t('builder.nodePalette')}</h3>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => setIsPaletteOpen(false)}
                  >
                    <Icon icon="lucide:chevron-left" width={16} />
                  </Button>
                </div>
                <div className="p-3">
                  <Input
                    placeholder={t('builder.searchNodes')}
                    startContent={<Icon icon="lucide:search" width={16} />}
                    size="sm"
                    className="mb-3"
                  />
                </div>
                <NodePalette /> {/* NodePalette自体がflex-1を持つ */}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center py-3"> {/* py-3 を追加 */}
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => setIsPaletteOpen(true)}
                  aria-label={t('sidebar.expandSidebar')}
                >
                  <Icon icon="lucide:chevron-right" width={16} />
                </Button>
              </div>
            )}
          </div>
          
          {/* Main canvas */}
          <div className="flex-1 bg-default-50">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
            >
              <Controls />
              <MiniMap />
              <Background gap={12} size={1} />
            </ReactFlow>
          </div>
          
          {/* Right sidebar - Node settings */}
          {/* h-full を削除し、親のflex-1 flex min-h-0 に高さを依存させる */}
          <div className={`transition-all duration-150 ${isSettingsOpen ? 'w-80' : 'w-12'} border-l border-divider flex flex-col`}>
            {isSettingsOpen ? (
              <div className="h-full flex flex-col"> {/* このdivがSettings全体の高さを管理 */}
                <div className="flex justify-between items-center p-3 border-b border-divider">
                  <h3 className="font-medium">{t('builder.nodeSettings')}</h3>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={() => setIsSettingsOpen(false)}
                  >
                    <Icon icon="lucide:chevron-right" width={16} />
                  </Button>
                </div>
                <NodeSettings selectedNode={selectedNode} /> {/* NodeSettings自体がflex-1を持つ */}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center py-3"> {/* py-3 を追加 */}
                <Button
                  isIconOnly
                  variant="light"
                  onPress={() => setIsSettingsOpen(true)}
                  aria-label={t('sidebar.expandSidebar')} 
                >
                  <Icon icon="lucide:chevron-left" width={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default Builder;