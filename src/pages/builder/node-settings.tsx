import React from 'react';
import { Tabs, Tab, Input, Textarea, Select, SelectItem, Slider, Checkbox, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Node } from 'reactflow';

interface NodeSettingsProps {
  selectedNode: Node | null;
}

const NodeSettings: React.FC<NodeSettingsProps> = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 text-default-500">
        <Icon icon="lucide:settings-2" width={32} className="mb-2" />
        <p>Select a node to configure its settings</p>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-y-auto flex-1">
      <div className="mb-4">
        <Input
          label="Node Name"
          placeholder="Enter node name"
          defaultValue={selectedNode.data.label}
          className="mb-2"
        />
        <Textarea
          label="Description"
          placeholder="Enter node description"
          className="mb-2"
        />
      </div>
      
      <Tabs aria-label="Node settings tabs">
        <Tab key="input" title={
          <div className="flex items-center gap-1">
            <Icon icon="lucide:arrow-down-to-line" width={16} />
            <span>Input</span>
          </div>
        }>
          <div className="p-2 space-y-4">
            <Select
              label="Input Type"
              placeholder="Select input type"
              defaultSelectedKeys={["text"]}
            >
              <SelectItem key="text" value="text">Text</SelectItem>
              <SelectItem key="json" value="json">JSON</SelectItem>
              <SelectItem key="file" value="file">File</SelectItem>
            </Select>
            
            <Checkbox defaultSelected>Required</Checkbox>
            
            <Input
              label="Default Value"
              placeholder="Enter default value"
            />
          </div>
        </Tab>
        
        <Tab key="output" title={
          <div className="flex items-center gap-1">
            <Icon icon="lucide:arrow-up-from-line" width={16} />
            <span>Output</span>
          </div>
        }>
          <div className="p-2 space-y-4">
            <Select
              label="Output Format"
              placeholder="Select output format"
              defaultSelectedKeys={["json"]}
            >
              <SelectItem key="text" value="text">Text</SelectItem>
              <SelectItem key="json" value="json">JSON</SelectItem>
              <SelectItem key="file" value="file">File</SelectItem>
            </Select>
            
            <Textarea
              label="Schema"
              placeholder="JSON schema (optional)"
              rows={4}
            />
          </div>
        </Tab>
        
        <Tab key="llm" title={
          <div className="flex items-center gap-1">
            <Icon icon="lucide:settings" width={16} />
            <span>LLM Params</span>
          </div>
        }>
          <div className="p-2 space-y-4">
            <Select
              label="Model"
              placeholder="Select LLM model"
              defaultSelectedKeys={["gpt4"]}
            >
              <SelectItem key="gpt4" value="gpt4">GPT-4</SelectItem>
              <SelectItem key="gpt35" value="gpt35">GPT-3.5 Turbo</SelectItem>
              <SelectItem key="claude" value="claude">Claude 3</SelectItem>
              <SelectItem key="mistral" value="mistral">Mistral Large</SelectItem>
            </Select>
            
            <div>
              <p className="text-small text-default-500 mb-1">Temperature</p>
              <Slider 
                label="Temperature" 
                step={0.1}
                maxValue={1} 
                minValue={0} 
                defaultValue={0.7}
                className="max-w-md"
              />
            </div>
            
            <div>
              <p className="text-small text-default-500 mb-1">Max Tokens</p>
              <Slider 
                label="Max Tokens" 
                step={100}
                maxValue={4000} 
                minValue={100} 
                defaultValue={1000}
                className="max-w-md"
              />
            </div>
            
            <Textarea
              label="System Prompt"
              placeholder="Enter system prompt"
              rows={4}
            />
          </div>
        </Tab>
      </Tabs>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="flat" color="danger">
          Delete Node
        </Button>
        <Button color="primary">
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default NodeSettings;
