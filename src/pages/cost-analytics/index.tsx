import React from 'react';
import { Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';

// Sample data for charts
const dailyTokenData = [
  { date: '07/01', tokens: 125000, cost: 2.50 },
  { date: '07/02', tokens: 98000, cost: 1.96 },
  { date: '07/03', tokens: 142000, cost: 2.84 },
  { date: '07/04', tokens: 87000, cost: 1.74 },
  { date: '07/05', tokens: 163000, cost: 3.26 },
  { date: '07/06', tokens: 145000, cost: 2.90 },
  { date: '07/07', tokens: 178000, cost: 3.56 },
  { date: '07/08', tokens: 132000, cost: 2.64 },
  { date: '07/09', tokens: 156000, cost: 3.12 },
  { date: '07/10', tokens: 168000, cost: 3.36 },
  { date: '07/11', tokens: 124000, cost: 2.48 },
  { date: '07/12', tokens: 189000, cost: 3.78 },
  { date: '07/13', tokens: 143000, cost: 2.86 },
  { date: '07/14', tokens: 167000, cost: 3.34 },
  { date: '07/15', tokens: 152000, cost: 3.04 }
];

const modelCostData = [
  { name: 'GPT-4', value: 42.5, color: '#2563EB' },
  { name: 'GPT-3.5', value: 18.3, color: '#60A5FA' },
  { name: 'Claude', value: 15.6, color: '#93C5FD' },
  { name: 'Mistral', value: 10.2, color: '#BFDBFE' }
];

const workflowCostData = [
  { id: 1, workflow: 'Customer Support Bot', runs: 245, tokens: 1245000, cost: '$24.90' },
  { id: 2, workflow: 'Data Extraction Pipeline', runs: 187, tokens: 876000, cost: '$17.52' },
  { id: 3, workflow: 'Content Generator', runs: 156, tokens: 2345000, cost: '$46.90' },
  { id: 4, workflow: 'Email Classifier', runs: 432, tokens: 432000, cost: '$8.64' },
  { id: 5, workflow: 'Document Analyzer', runs: 98, tokens: 1210000, cost: '$24.20' }
];

const CostAnalytics: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dateRange, setDateRange] = React.useState('last15');
  const { t } = useTranslation();
  
  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    // In a real app, this would fetch new data based on the selected range
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cost Analytics</h1>
          <p className="text-default-500">Monitor and optimize your token usage and costs</p>
        </div>
        <div className="flex gap-2">
          <Select
            selectedKeys={[dateRange]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              handleDateRangeChange(selected);
            }}
            className="w-40"
            aria-label={t('common.select') + ' ' + t('costAnalyticsPage.dateRange.today')}
          >
            <SelectItem key="today">{t('costAnalyticsPage.dateRange.today')}</SelectItem>
            <SelectItem key="last7">{t('costAnalyticsPage.dateRange.last7Days')}</SelectItem>
            <SelectItem key="last15">{t('costAnalyticsPage.dateRange.last15Days')}</SelectItem>
            <SelectItem key="last30">{t('costAnalyticsPage.dateRange.last30Days')}</SelectItem>
            <SelectItem key="custom">{t('costAnalyticsPage.dateRange.customRange')}</SelectItem>
          </Select>
          
          <Button
            color="primary"
            variant="flat"
            onPress={onOpen}
            startContent={<Icon icon="lucide:bell" width={16} />}
          >
            Set Alert
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card shadow="sm">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-100">
              <Icon icon="lucide:dollar-sign" className="text-primary" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Total Cost (15 days)</p>
              <p className="text-2xl font-semibold">$86.50</p>
            </div>
          </CardBody>
        </Card>
        
        <Card shadow="sm">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-success-100">
              <Icon icon="lucide:message-square" className="text-success" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Total Tokens</p>
              <p className="text-2xl font-semibold">2.17M</p>
            </div>
          </CardBody>
        </Card>
        
        <Card shadow="sm">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-warning-100">
              <Icon icon="lucide:trending-up" className="text-warning" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Daily Average</p>
              <p className="text-2xl font-semibold">$5.77</p>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Daily Token Usage Chart */}
      <Card shadow="sm">
        <CardHeader className="pb-0 pt-4 px-6 flex items-center justify-between">
          <h4 className="font-semibold text-large">Daily Token Usage</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyTokenData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()} tokens`, 'Usage']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar dataKey="tokens" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
      
      {/* Cost by Model and Workflow Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card shadow="sm">
          <CardHeader className="pb-0 pt-4 px-6">
            <h4 className="font-semibold text-large">Cost by Model</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modelCostData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {modelCostData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        
        <Card shadow="sm">
          <CardHeader className="pb-0 pt-4 px-6">
            <h4 className="font-semibold text-large">Cost by Workflow</h4>
          </CardHeader>
          <CardBody>
            <Table removeWrapper aria-label="Cost by workflow table">
              <TableHeader>
                <TableColumn>WORKFLOW</TableColumn>
                <TableColumn>RUNS</TableColumn>
                <TableColumn>TOKENS</TableColumn>
                <TableColumn>COST</TableColumn>
              </TableHeader>
              <TableBody>
                {workflowCostData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.workflow}</TableCell>
                    <TableCell>{item.runs}</TableCell>
                    <TableCell>{(item.tokens / 1000).toFixed(1)}K</TableCell>
                    <TableCell>{item.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
      
      {/* Alert Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Set Cost Alert</ModalHeader>
              <ModalBody>
                <Select
                  label={t('costAnalyticsPage.alertType')}
                  placeholder={t('costAnalyticsPage.selectAlertType')}
                  defaultSelectedKeys={["daily"]}
                  aria-label={t('costAnalyticsPage.alertType')}
                >
                  <SelectItem key="daily">{t('costAnalyticsPage.dailyCostLimit')}</SelectItem>
                  <SelectItem key="weekly">{t('costAnalyticsPage.weeklyCostLimit')}</SelectItem>
                  <SelectItem key="monthly">{t('costAnalyticsPage.monthlyCostLimit')}</SelectItem>
                  <SelectItem key="workflow">{t('costAnalyticsPage.perWorkflowLimit')}</SelectItem>
                </Select>
                
                <Input
                  type="number"
                  label="Cost Threshold ($)"
                  placeholder="Enter amount"
                  defaultValue="50"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />
                
                <Select
                  label={t('costAnalyticsPage.notificationMethod')}
                  placeholder={t('costAnalyticsPage.selectNotificationMethod')}
                  defaultSelectedKeys={["email"]}
                  aria-label={t('costAnalyticsPage.notificationMethod')}
                >
                  <SelectItem key="email">{t('costAnalyticsPage.email')}</SelectItem>
                  <SelectItem key="slack">{t('costAnalyticsPage.slack')}</SelectItem>
                  <SelectItem key="webhook">{t('costAnalyticsPage.webhook')}</SelectItem>
                </Select>
                
                <Input
                  label="Email Address"
                  placeholder="Enter email address"
                  defaultValue="admin@company.com"
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save Alert
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CostAnalytics;
