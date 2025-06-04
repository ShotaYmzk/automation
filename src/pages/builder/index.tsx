import React from 'react';
import { Card, CardBody, Button, Tabs, Tab, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, addEdge, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

// Node components
import NodePalette from './node-palette';
import NodeSettings from './node-settings';

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'LLM Node' },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output' },
    position: { x: 250, y: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

const Builder: React.FC = () => {
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
    setIsSettingsOpen(true);
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            color="primary"
            startContent={<Icon icon="lucide:play" width={18} />}
          >
            Run Workflow
          </Button>
          
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<Icon icon="lucide:save" width={18} />}
              >
                Save
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Save options">
              <DropdownItem key="save">Save</DropdownItem>
              <DropdownItem key="save-as">Save As...</DropdownItem>
              <DropdownItem key="save-version">Save New Version</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <Button
            variant="light"
            startContent={<Icon icon="lucide:undo" width={18} />}
            isIconOnly
          />
          
          <Button
            variant="light"
            startContent={<Icon icon="lucide:redo" width={18} />}
            isIconOnly
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-default-100 px-3 py-1 rounded-md text-small flex items-center gap-1">
            <Icon icon="lucide:git-branch" width={16} />
            <span>v1.2.0</span>
          </div>
          
          <Button
            variant="light"
            startContent={<Icon icon="lucide:settings" width={18} />}
            isIconOnly
          />
          
          <Button
            variant="light"
            startContent={<Icon icon="lucide:help-circle" width={18} />}
            isIconOnly
          />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex">
        {/* Left sidebar - Node palette */}
        <div className={`transition-all duration-150 ${isPaletteOpen ? 'w-64' : 'w-12'} border-r border-divider`}>
          {isPaletteOpen ? (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center p-3 border-b border-divider">
                <h3 className="font-medium">Node Palette</h3>
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
                  placeholder="Search nodes..."
                  startContent={<Icon icon="lucide:search" width={16} />}
                  size="sm"
                  className="mb-3"
                />
              </div>
              <NodePalette />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center">
              <Button
                isIconOnly
                variant="light"
                className="mt-3"
                onPress={() => setIsPaletteOpen(true)}
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
        <div className={`transition-all duration-150 ${isSettingsOpen ? 'w-80' : 'w-12'} border-l border-divider`}>
          {isSettingsOpen ? (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center p-3 border-b border-divider">
                <h3 className="font-medium">Node Settings</h3>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={() => setIsSettingsOpen(false)}
                >
                  <Icon icon="lucide:chevron-right" width={16} />
                </Button>
              </div>
              <NodeSettings selectedNode={selectedNode} />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center">
              <Button
                isIconOnly
                variant="light"
                className="mt-3"
                onPress={() => setIsSettingsOpen(true)}
              >
                <Icon icon="lucide:chevron-left" width={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Builder;
