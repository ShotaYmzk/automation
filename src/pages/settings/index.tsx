import React from 'react';
import { Card, CardBody, Tabs, Tab, Input, Button, Switch, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left sidebar */}
      <Card className="w-full lg:w-64 h-fit">
        <CardBody className="p-0">
          <div className="flex flex-col">
            <div className="p-4 border-b border-divider">
              <h3 className="font-semibold">Settings</h3>
            </div>
            <div className="p-2">
              <Button
                variant="flat"
                color="primary"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:building" width={16} />}
              >
                Organization
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:users" width={16} />}
              >
                Members
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:key" width={16} />}
              >
                API Keys
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:lock" width={16} />}
              >
                Authentication
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:credit-card" width={16} />}
              >
                Plan & Billing
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:bell" width={16} />}
              >
                Notifications
              </Button>
              <Button
                variant="light"
                className="justify-start w-full"
                startContent={<Icon icon="lucide:shield" width={16} />}
              >
                Security
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Main content */}
      <div className="flex-1">
        <Card shadow="sm">
          <CardBody>
            <Tabs aria-label="Organization settings tabs">
              <Tab
                key="general"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:settings" width={16} />
                    <span>General</span>
                  </div>
                }
              >
                <div className="space-y-6 py-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Organization Settings</h3>
                    
                    <div className="space-y-4">
                      <Input
                        label="Organization Name"
                        placeholder="Enter organization name"
                        defaultValue="Acme Inc."
                      />
                      
                      <Select
                        label="Industry"
                        placeholder="Select industry"
                        defaultSelectedKeys={["technology"]}
                      >
                        <SelectItem key="technology" value="technology">Technology</SelectItem>
                        <SelectItem key="finance" value="finance">Finance</SelectItem>
                        <SelectItem key="healthcare" value="healthcare">Healthcare</SelectItem>
                        <SelectItem key="education" value="education">Education</SelectItem>
                        <SelectItem key="retail" value="retail">Retail</SelectItem>
                        <SelectItem key="manufacturing" value="manufacturing">Manufacturing</SelectItem>
                      </Select>
                      
                      <Select
                        label="Timezone"
                        placeholder="Select timezone"
                        defaultSelectedKeys={["utc-8"]}
                      >
                        <SelectItem key="utc-12" value="utc-12">UTC-12:00</SelectItem>
                        <SelectItem key="utc-11" value="utc-11">UTC-11:00</SelectItem>
                        <SelectItem key="utc-10" value="utc-10">UTC-10:00</SelectItem>
                        <SelectItem key="utc-9" value="utc-9">UTC-09:00</SelectItem>
                        <SelectItem key="utc-8" value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                        <SelectItem key="utc-7" value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                        <SelectItem key="utc-6" value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                        <SelectItem key="utc-5" value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                      </Select>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Usage Analytics</p>
                          <p className="text-small text-default-500">Share anonymous usage data to help us improve</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-small text-default-500">Receive email notifications for important events</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="flat">
                      Cancel
                    </Button>
                    <Button color="primary">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Tab>
              
              <Tab
                key="members"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:users" width={16} />
                    <span>Members</span>
                  </div>
                }
              >
                <div className="space-y-6 py-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Team Members</h3>
                    <Button
                      color="primary"
                      startContent={<Icon icon="lucide:user-plus" width={16} />}
                    >
                      Invite Member
                    </Button>
                  </div>
                  
                  <Table removeWrapper aria-label="Team members table">
                    <TableHeader>
                      <TableColumn>USER</TableColumn>
                      <TableColumn>ROLE</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" size="sm" />
                            <div>
                              <p>Alex Johnson</p>
                              <p className="text-small text-default-500">alex@company.com</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip color="primary" variant="flat" size="sm">Admin</Chip>
                        </TableCell>
                        <TableCell>
                          <Chip color="success" variant="flat" size="sm">Active</Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:edit" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm">
                              <Icon icon="lucide:trash" width={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow key="2">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=2" size="sm" />
                            <div>
                              <p>Sarah Miller</p>
                              <p className="text-small text-default-500">sarah@company.com</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip color="secondary" variant="flat" size="sm">Developer</Chip>
                        </TableCell>
                        <TableCell>
                          <Chip color="success" variant="flat" size="sm">Active</Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:edit" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm">
                              <Icon icon="lucide:trash" width={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow key="3">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=3" size="sm" />
                            <div>
                              <p>Michael Chen</p>
                              <p className="text-small text-default-500">michael@company.com</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip color="secondary" variant="flat" size="sm">Developer</Chip>
                        </TableCell>
                        <TableCell>
                          <Chip color="warning" variant="flat" size="sm">Pending</Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:edit" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm">
                              <Icon icon="lucide:trash" width={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Tab>
              
              <Tab
                key="api-keys"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:key" width={16} />
                    <span>API Keys</span>
                  </div>
                }
              >
                <div className="space-y-6 py-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">API Keys</h3>
                    <Button
                      color="primary"
                      startContent={<Icon icon="lucide:plus" width={16} />}
                    >
                      Create New Key
                    </Button>
                  </div>
                  
                  <Table removeWrapper aria-label="API keys table">
                    <TableHeader>
                      <TableColumn>NAME</TableColumn>
                      <TableColumn>TYPE</TableColumn>
                      <TableColumn>CREATED</TableColumn>
                      <TableColumn>LAST USED</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>
                          <div>
                            <p>Production API Key</p>
                            <p className="text-small text-default-500">sk_prod_...8f3d</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip color="success" variant="flat" size="sm">Production</Chip>
                        </TableCell>
                        <TableCell>2023-06-15</TableCell>
                        <TableCell>2023-07-14</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:copy" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm">
                              <Icon icon="lucide:trash" width={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow key="2">
                        <TableCell>
                          <div>
                            <p>Development API Key</p>
                            <p className="text-small text-default-500">sk_dev_...2a7c</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip color="warning" variant="flat" size="sm">Development</Chip>
                        </TableCell>
                        <TableCell>2023-06-20</TableCell>
                        <TableCell>2023-07-15</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:copy" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm">
                              <Icon icon="lucide:trash" width={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="bg-default-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">API Key Security</h4>
                    <p className="text-small text-default-600 mb-2">Keep your API keys secure:</p>
                    <ul className="list-disc list-inside text-small text-default-600 space-y-1">
                      <li>Do not share your API keys in publicly accessible areas.</li>
                      <li>Use environment variables to store API keys in your applications.</li>
                      <li>Rotate your API keys periodically for enhanced security.</li>
                      <li>Use separate keys for development and production environments.</li>
                    </ul>
                  </div>
                </div>
              </Tab>
              
              <Tab
                key="billing"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:credit-card" width={16} />
                    <span>Billing</span>
                  </div>
                }
              >
                <div className="space-y-6 py-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Plan & Billing</h3>
                    
                    <Card className="mb-6 border-primary bg-primary-50">
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-primary">Pro Plan</h4>
                            <p className="text-default-700">$49/month • Renews on August 15, 2023</p>
                          </div>
                          <Button color="primary" variant="flat">
                            Upgrade Plan
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Usage This Month</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card shadow="sm">
                            <CardBody>
                              <div className="flex flex-col">
                                <p className="text-small text-default-500">API Calls</p>
                                <p className="text-xl font-semibold">12,450 / 50,000</p>
                                <p className="text-small text-success">24.9% used</p>
                              </div>
                            </CardBody>
                          </Card>
                          
                          <Card shadow="sm">
                            <CardBody>
                              <div className="flex flex-col">
                                <p className="text-small text-default-500">Tokens</p>
                                <p className="text-xl font-semibold">2.17M / 5M</p>
                                <p className="text-small text-success">43.4% used</p>
                              </div>
                            </CardBody>
                          </Card>
                          
                          <Card shadow="sm">
                            <CardBody>
                              <div className="flex flex-col">
                                <p className="text-small text-default-500">Storage</p>
                                <p className="text-xl font-semibold">1.2GB / 10GB</p>
                                <p className="text-small text-success">12% used</p>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Payment Method</h4>
                        <Card shadow="sm">
                          <CardBody>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-default-100 rounded-md">
                                  <Icon icon="logos:visa" width={32} />
                                </div>
                                <div>
                                  <p>Visa ending in 4242</p>
                                  <p className="text-small text-default-500">Expires 12/2025</p>
                                </div>
                              </div>
                              <Button variant="light" size="sm">
                                Change
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Billing History</h4>
                        <Table removeWrapper aria-label="Billing history table">
                          <TableHeader>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>DESCRIPTION</TableColumn>
                            <TableColumn>AMOUNT</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                            <TableColumn>INVOICE</TableColumn>
                          </TableHeader>
                          <TableBody>
                            <TableRow key="1">
                              <TableCell>Jul 15, 2023</TableCell>
                              <TableCell>Pro Plan - Monthly</TableCell>
                              <TableCell>$49.00</TableCell>
                              <TableCell>
                                <Chip color="success" variant="flat" size="sm">Paid</Chip>
                              </TableCell>
                              <TableCell>
                                <Button variant="light" size="sm" startContent={<Icon icon="lucide:download" width={14} />}>
                                  PDF
                                </Button>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow key="2">
                              <TableCell>Jun 15, 2023</TableCell>
                              <TableCell>Pro Plan - Monthly</TableCell>
                              <TableCell>$49.00</TableCell>
                              <TableCell>
                                <Chip color="success" variant="flat" size="sm">Paid</Chip>
                              </TableCell>
                              <TableCell>
                                <Button variant="light" size="sm" startContent={<Icon icon="lucide:download" width={14} />}>
                                  PDF
                                </Button>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow key="3">
                              <TableCell>May 15, 2023</TableCell>
                              <TableCell>Pro Plan - Monthly</TableCell>
                              <TableCell>$49.00</TableCell>
                              <TableCell>
                                <Chip color="success" variant="flat" size="sm">Paid</Chip>
                              </TableCell>
                              <TableCell>
                                <Button variant="light" size="sm" startContent={<Icon icon="lucide:download" width={14} />}>
                                  PDF
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
