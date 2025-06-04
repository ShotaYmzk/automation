import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tabs, Tab, Card, CardBody, Button, Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Run {
  id: string;
  workflow: string;
  status: 'Success' | 'Failed' | 'Running' | 'Canceled';
  startTime: Date;
  duration: string;
  tokens: number;
  cost: string;
}

const runs: Run[] = [
  {
    id: 'run-001',
    workflow: 'Customer Support Bot',
    status: 'Success',
    startTime: new Date('2023-07-15T10:30:00'),
    duration: '2m 34s',
    tokens: 1245,
    cost: '$0.42'
  },
  {
    id: 'run-002',
    workflow: 'Data Extraction Pipeline',
    status: 'Failed',
    startTime: new Date('2023-07-15T11:15:00'),
    duration: '1m 12s',
    tokens: 876,
    cost: '$0.18'
  },
  {
    id: 'run-003',
    workflow: 'Content Generator',
    status: 'Success',
    startTime: new Date('2023-07-15T12:05:00'),
    duration: '3m 05s',
    tokens: 2345,
    cost: '$0.56'
  },
  {
    id: 'run-004',
    workflow: 'Email Classifier',
    status: 'Success',
    startTime: new Date('2023-07-15T13:20:00'),
    duration: '0m 45s',
    tokens: 432,
    cost: '$0.08'
  },
  {
    id: 'run-005',
    workflow: 'Document Analyzer',
    status: 'Running',
    startTime: new Date('2023-07-15T14:10:00'),
    duration: '4m 22s',
    tokens: 3210,
    cost: '$0.61'
  },
  {
    id: 'run-006',
    workflow: 'Sales Lead Qualifier',
    status: 'Canceled',
    startTime: new Date('2023-07-15T15:05:00'),
    duration: '0m 32s',
    tokens: 245,
    cost: '$0.05'
  },
  {
    id: 'run-007',
    workflow: 'Customer Support Bot',
    status: 'Success',
    startTime: new Date('2023-07-15T15:45:00'),
    duration: '2m 12s',
    tokens: 1123,
    cost: '$0.38'
  },
  {
    id: 'run-008',
    workflow: 'Data Extraction Pipeline',
    status: 'Failed',
    startTime: new Date('2023-07-15T16:30:00'),
    duration: '1m 05s',
    tokens: 765,
    cost: '$0.15'
  }
];

const statusColorMap = {
  'Success': 'success',
  'Failed': 'danger',
  'Running': 'primary',
  'Canceled': 'warning'
};

const RunsLogs: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedRun, setSelectedRun] = React.useState<Run | null>(null);
  const [selectedTab, setSelectedTab] = React.useState('all');
  
  const filteredRuns = React.useMemo(() => {
    if (selectedTab === 'all') return runs;
    return runs.filter(run => run.status.toLowerCase() === selectedTab);
  }, [selectedTab]);
  
  const handleRowClick = (run: Run) => {
    setSelectedRun(run);
    onOpen();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Runs & Logs</h1>
          <p className="text-default-500">Monitor and debug your workflow executions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="flat"
            startContent={<Icon icon="lucide:filter" width={16} />}
          >
            Filter
          </Button>
          <Button
            variant="flat"
            startContent={<Icon icon="lucide:download" width={16} />}
          >
            Export
          </Button>
        </div>
      </div>
      
      <Card shadow="sm">
        <CardBody className="p-0">
          <Tabs 
            aria-label="Run status tabs" 
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab as any}
            className="w-full"
          >
            <Tab key="all" title="All" />
            <Tab key="success" title="Success" />
            <Tab key="failed" title="Failed" />
            <Tab key="running" title="Running" />
          </Tabs>
          
          <Table 
            removeWrapper 
            aria-label="Runs and logs table"
            selectionMode="single"
            onRowAction={(key) => {
              const run = runs.find(r => r.id === key);
              if (run) handleRowClick(run);
            }}
          >
            <TableHeader>
              <TableColumn>WORKFLOW</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>START TIME</TableColumn>
              <TableColumn>DURATION</TableColumn>
              <TableColumn>TOKENS</TableColumn>
              <TableColumn>COST</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredRuns.map((run) => (
                <TableRow key={run.id}>
                  <TableCell>{run.workflow}</TableCell>
                  <TableCell>
                    <Chip
                      color={statusColorMap[run.status] as any}
                      variant="flat"
                      size="sm"
                    >
                      {run.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{run.startTime.toLocaleString()}</TableCell>
                  <TableCell>{run.duration}</TableCell>
                  <TableCell>{run.tokens.toLocaleString()}</TableCell>
                  <TableCell>{run.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <h3>Run Details</h3>
                  <Chip
                    color={selectedRun ? statusColorMap[selectedRun.status] as any : 'default'}
                    variant="flat"
                  >
                    {selectedRun?.status}
                  </Chip>
                </div>
                <p className="text-small text-default-500">
                  {selectedRun?.workflow} • {selectedRun?.id}
                </p>
              </DrawerHeader>
              
              <DrawerBody>
                {selectedRun && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card shadow="sm">
                        <CardBody>
                          <div className="flex flex-col">
                            <p className="text-small text-default-500">Start Time</p>
                            <p>{selectedRun.startTime.toLocaleString()}</p>
                          </div>
                        </CardBody>
                      </Card>
                      
                      <Card shadow="sm">
                        <CardBody>
                          <div className="flex flex-col">
                            <p className="text-small text-default-500">Duration</p>
                            <p>{selectedRun.duration}</p>
                          </div>
                        </CardBody>
                      </Card>
                      
                      <Card shadow="sm">
                        <CardBody>
                          <div className="flex flex-col">
                            <p className="text-small text-default-500">Cost</p>
                            <p>{selectedRun.cost} ({selectedRun.tokens.toLocaleString()} tokens)</p>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                    
                    <Tabs aria-label="Run details tabs">
                      <Tab key="input" title="Input">
                        <Card>
                          <CardBody>
                            <pre className="bg-default-50 p-4 rounded-lg overflow-x-auto text-small">
                              {`{
  "query": "Can you help me find information about our Q2 sales report?",
  "context": {
    "user_id": "u-123456",
    "session_id": "sess-789012",
    "timestamp": "2023-07-15T10:30:00Z"
  },
  "parameters": {
    "max_tokens": 1000,
    "temperature": 0.7
  }
}`}
                            </pre>
                          </CardBody>
                        </Card>
                      </Tab>
                      
                      <Tab key="output" title="Output">
                        <Card>
                          <CardBody>
                            <pre className="bg-default-50 p-4 rounded-lg overflow-x-auto text-small">
                              {`{
  "response": "I found the Q2 sales report in your company knowledge base. The total revenue was $1.2M, which is 15% above target. Would you like me to summarize the key points?",
  "metadata": {
    "tokens_used": 1245,
    "processing_time": "1.34s",
    "sources": [
      "sales_reports/q2_2023.pdf",
      "company_kpi_dashboard.xlsx"
    ]
  }
}`}
                            </pre>
                          </CardBody>
                        </Card>
                      </Tab>
                      
                      <Tab key="trace" title="Execution Trace">
                        <Card>
                          <CardBody>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center">
                                  <Icon icon="lucide:check" className="text-success" width={16} />
                                </div>
                                <div>
                                  <p className="font-medium">Input Validation</p>
                                  <p className="text-small text-default-500">0.02s</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center">
                                  <Icon icon="lucide:check" className="text-success" width={16} />
                                </div>
                                <div>
                                  <p className="font-medium">Knowledge Retrieval</p>
                                  <p className="text-small text-default-500">0.45s</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center">
                                  <Icon icon="lucide:check" className="text-success" width={16} />
                                </div>
                                <div>
                                  <p className="font-medium">LLM Processing</p>
                                  <p className="text-small text-default-500">1.34s</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center">
                                  <Icon icon="lucide:check" className="text-success" width={16} />
                                </div>
                                <div>
                                  <p className="font-medium">Response Formatting</p>
                                  <p className="text-small text-default-500">0.08s</p>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Tab>
                      
                      {selectedRun.status === 'Failed' && (
                        <Tab key="error" title={
                          <div className="flex items-center gap-1 text-danger">
                            <Icon icon="lucide:alert-triangle" width={16} />
                            <span>Error</span>
                          </div>
                        }>
                          <Card>
                            <CardBody>
                              <div className="bg-danger-50 border border-danger-200 text-danger p-4 rounded-lg">
                                <p className="font-medium mb-2">Error: Rate limit exceeded</p>
                                <p className="text-small">The request was rejected because the API rate limit has been exceeded. Please reduce the frequency of requests or contact support to increase your rate limit.</p>
                              </div>
                              
                              <pre className="bg-default-50 p-4 mt-4 rounded-lg overflow-x-auto text-small">
                                {`Error: RateLimitError
  at processRequest (api.js:245:23)
  at async handleAPIRequest (controller.js:128:12)
  at async executeWorkflow (workflow.js:87:10)
  at async runPipeline (pipeline.js:54:8)`}
                              </pre>
                            </CardBody>
                          </Card>
                        </Tab>
                      )}
                    </Tabs>
                  </div>
                )}
              </DrawerBody>
              
              <DrawerFooter>
                <Button variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary">
                  Rerun Workflow
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RunsLogs;
