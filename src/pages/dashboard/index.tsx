import React from 'react';
import { Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

// Sample data for charts
const weeklyRunsData = [
  { day: 'Mon', runs: 120 },
  { day: 'Tue', runs: 180 },
  { day: 'Wed', runs: 150 },
  { day: 'Thu', runs: 210 },
  { day: 'Fri', runs: 190 },
  { day: 'Sat', runs: 80 },
  { day: 'Sun', runs: 60 }
];

const costByModelData = [
  { name: 'GPT-4', value: 320, color: '#2563EB' },
  { name: 'GPT-3.5', value: 180, color: '#60A5FA' },
  { name: 'Claude', value: 150, color: '#93C5FD' },
  { name: 'Mistral', value: 100, color: '#BFDBFE' }
];

// Sample data for recent activity
const recentActivityData = [
  { id: 1, workflow: 'Customer Support Bot', status: 'Success', duration: '2m 34s', cost: '$0.42' },
  { id: 2, workflow: 'Data Extraction Pipeline', status: 'Error', duration: '1m 12s', cost: '$0.18' },
  { id: 3, workflow: 'Content Summarizer', status: 'Success', duration: '3m 05s', cost: '$0.56' },
  { id: 4, workflow: 'Email Classifier', status: 'Success', duration: '0m 45s', cost: '$0.08' },
  { id: 5, workflow: 'Document Analyzer', status: 'Running', duration: '4m 22s', cost: '$0.61' }
];

const statusColorMap = {
  Success: "success",
  Error: "danger",
  Running: "primary",
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card shadow="sm">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-100">
              <Icon icon="lucide:workflow" className="text-primary" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Total Workflows</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </CardBody>
        </Card>
        
        <Card shadow="sm">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-success-100">
              <Icon icon="lucide:play" className="text-success" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Runs Today</p>
              <p className="text-2xl font-semibold">187</p>
            </div>
          </CardBody>
        </Card>
        
        <Card shadow="sm">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-danger-100">
              <Icon icon="lucide:alert-triangle" className="text-danger" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Error Rate</p>
              <p className="text-2xl font-semibold">2.4%</p>
            </div>
          </CardBody>
        </Card>
        
        <Card shadow="sm">
          <CardBody className="flex flex-row items-center gap-4">
            <div className="p-3 rounded-xl bg-warning-100">
              <Icon icon="lucide:dollar-sign" className="text-warning" width={24} />
            </div>
            <div>
              <p className="text-small text-default-500">Token Cost</p>
              <p className="text-2xl font-semibold">$12.86</p>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card shadow="sm">
          <CardHeader className="pb-0 pt-4 px-6 flex items-center justify-between">
            <h4 className="font-semibold text-large">Weekly Runs</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyRunsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="runs" 
                  stroke="#2563EB" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
        
        <Card shadow="sm">
          <CardHeader className="pb-0 pt-4 px-6 flex items-center justify-between">
            <h4 className="font-semibold text-large">Cost by Model</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-4">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costByModelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {costByModelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => Number(value).toFixed(2)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
      
      {/* Recent Activity Table */}
      <Card shadow="sm">
        <CardHeader className="pb-0 pt-4 px-6 flex items-center justify-between">
          <h4 className="font-semibold text-large">Recent Activity</h4>
        </CardHeader>
        <CardBody>
          <Table removeWrapper aria-label="Recent activity table">
            <TableHeader>
              <TableColumn>WORKFLOW</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>DURATION</TableColumn>
              <TableColumn>COST</TableColumn>
            </TableHeader>
            <TableBody>
              {recentActivityData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.workflow}</TableCell>
                  <TableCell>
                    <Chip
                      color={statusColorMap[item.status as keyof typeof statusColorMap] as 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'}
                      variant="flat"
                      size="sm"
                    >
                      {item.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
