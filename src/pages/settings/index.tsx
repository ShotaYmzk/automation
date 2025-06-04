import React from 'react';
import { Card, CardBody, Tabs, Tab, Input, Button, Switch, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next'; // インポート

const Settings: React.FC = () => {
  const { t } = useTranslation(); // t関数を取得

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left sidebar */}
      <Card className="w-full lg:w-64 h-fit">
        <CardBody className="p-0">
          <div className="flex flex-col">
            <div className="p-4 border-b border-divider">
              <h3 className="font-semibold">{t('settingsPage.title')}</h3>
            </div>
            <div className="p-2">
              <Button
                variant="flat"
                color="primary"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:building" width={16} />}
              >
                {t('settingsPage.organization')}
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:users" width={16} />}
              >
                {t('settingsPage.members')}
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:key" width={16} />}
              >
                {t('settingsPage.apiKeys')}
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:lock" width={16} />}
              >
                {t('settingsPage.authentication')}
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:credit-card" width={16} />}
              >
                {t('settingsPage.planBilling')}
              </Button>
              <Button
                variant="light"
                className="justify-start w-full mb-1"
                startContent={<Icon icon="lucide:bell" width={16} />}
              >
                {t('settingsPage.notifications')}
              </Button>
              <Button
                variant="light"
                className="justify-start w-full"
                startContent={<Icon icon="lucide:shield" width={16} />}
              >
                {t('settingsPage.security')}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Main content */}
      <div className="flex-1">
        <Card shadow="sm">
          <CardBody>
            <Tabs aria-label={t('settingsPage.organizationSettings') + " tabs"}>
              <Tab
                key="general"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:settings" width={16} />
                    <span>{t('settingsPage.generalTab')}</span>
                  </div>
                }
              >
                <div className="space-y-6 py-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t('settingsPage.organizationSettings')}</h3>
                    
                    <div className="space-y-4">
                      <Input
                        label={t('settingsPage.organizationName')}
                        placeholder={t('settingsPage.enterOrganizationName')}
                        defaultValue="Acme Inc." // デフォルト値は翻訳しないケースが多い
                      />
                      
                      <Select
                        label={t('settingsPage.industry')}
                        placeholder={t('settingsPage.selectIndustry')}
                        defaultSelectedKeys={["technology"]}
                        aria-label={t('settingsPage.industry')}
                      >
                        <SelectItem key="technology">{t('settingsPage.industries.technology')}</SelectItem>
                        <SelectItem key="finance">{t('settingsPage.industries.finance')}</SelectItem>
                        <SelectItem key="healthcare">{t('settingsPage.industries.healthcare')}</SelectItem>
                        <SelectItem key="education">{t('settingsPage.industries.education')}</SelectItem>
                        <SelectItem key="retail">{t('settingsPage.industries.retail')}</SelectItem>
                        <SelectItem key="manufacturing">{t('settingsPage.industries.manufacturing')}</SelectItem>
                      </Select>
                      
                      <Select
                        label={t('settingsPage.timezone')}
                        placeholder={t('settingsPage.selectTimezone')}
                        defaultSelectedKeys={["utc-8"]}
                        aria-label={t('settingsPage.timezone')}
                      >
                        <SelectItem key="utc-12">{t('settingsPage.timezones.utc-12')}</SelectItem>
                        <SelectItem key="utc-11">{t('settingsPage.timezones.utc-11')}</SelectItem>
                        <SelectItem key="utc-10">{t('settingsPage.timezones.utc-10')}</SelectItem>
                        <SelectItem key="utc-9">{t('settingsPage.timezones.utc-9')}</SelectItem>
                        <SelectItem key="utc-8">{t('settingsPage.timezones.utc-8')}</SelectItem>
                        <SelectItem key="utc-7">{t('settingsPage.timezones.utc-7')}</SelectItem>
                        <SelectItem key="utc-6">{t('settingsPage.timezones.utc-6')}</SelectItem>
                        <SelectItem key="utc-5">{t('settingsPage.timezones.utc-5')}</SelectItem>
                      </Select>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t('settingsPage.usageAnalytics')}</p>
                          <p className="text-small text-default-500">{t('settingsPage.usageAnalyticsDescription')}</p>
                        </div>
                        <Switch defaultSelected aria-label={t('settingsPage.usageAnalytics')} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{t('settingsPage.emailNotifications')}</p>
                          <p className="text-small text-default-500">{t('settingsPage.emailNotificationsDescription')}</p>
                        </div>
                        <Switch defaultSelected aria-label={t('settingsPage.emailNotifications')} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="flat">
                      {t('common.cancel')}
                    </Button>
                    <Button color="primary">
                      {t('common.save')} {t('common.changes')} {/* "Changes"をcommonに追加するか、ここで連結 */}
                    </Button>
                  </div>
                </div>
              </Tab>
              
              <Tab
                key="members"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:users" width={16} />
                    <span>{t('settingsPage.membersTab')}</span>
                  </div>
                }
              >
                <div className="space-y-6 py-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{t('settingsPage.teamMembers')}</h3>
                    <Button
                      color="primary"
                      startContent={<Icon icon="lucide:user-plus" width={16} />}
                    >
                      {t('settingsPage.inviteMember')}
                    </Button>
                  </div>
                  
                  <Table removeWrapper aria-label={t('settingsPage.teamMembers') + " table"}>
                    <TableHeader>
                      <TableColumn>{t('settingsPage.user')}</TableColumn>
                      <TableColumn>{t('settingsPage.role')}</TableColumn>
                      <TableColumn>{t('settingsPage.status')}</TableColumn>
                      <TableColumn>{t('common.actions')}</TableColumn>
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
                          <Chip color="primary" variant="flat" size="sm">{t('settingsPage.roles.admin')}</Chip>
                        </TableCell>
                        <TableCell>
                          <Chip color="success" variant="flat" size="sm">{t('settingsPage.memberStatus.active')}</Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button isIconOnly variant="light" size="sm" aria-label={t('common.edit')}>
                              <Icon icon="lucide:edit" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm" aria-label={t('common.delete')}>
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
                          <Chip color="secondary" variant="flat" size="sm">{t('settingsPage.roles.developer')}</Chip>
                        </TableCell>
                        <TableCell>
                          <Chip color="success" variant="flat" size="sm">{t('settingsPage.memberStatus.active')}</Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                             <Button isIconOnly variant="light" size="sm" aria-label={t('common.edit')}>
                              <Icon icon="lucide:edit" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm" aria-label={t('common.delete')}>
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
                          <Chip color="secondary" variant="flat" size="sm">{t('settingsPage.roles.developer')}</Chip>
                        </TableCell>
                        <TableCell>
                          <Chip color="warning" variant="flat" size="sm">{t('settingsPage.memberStatus.pending')}</Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                             <Button isIconOnly variant="light" size="sm" aria-label={t('common.edit')}>
                              <Icon icon="lucide:edit" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm" aria-label={t('common.delete')}>
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
                    <span>{t('settingsPage.apiKeysTab')}</span>
                  </div>
                }
              >
                <div className="space-y-6 py-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{t('settingsPage.apiKeys')}</h3>
                    <Button
                      color="primary"
                      startContent={<Icon icon="lucide:plus" width={16} />}
                    >
                      {t('settingsPage.createNewKey')}
                    </Button>
                  </div>
                  
                  <Table removeWrapper aria-label={t('settingsPage.apiKeys') + " table"}>
                    <TableHeader>
                      <TableColumn>{t('settingsPage.keyName')}</TableColumn>
                      <TableColumn>{t('settingsPage.keyType')}</TableColumn>
                      <TableColumn>{t('settingsPage.created')}</TableColumn>
                      <TableColumn>{t('settingsPage.lastUsed')}</TableColumn>
                      <TableColumn>{t('common.actions')}</TableColumn>
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
                          <Chip color="success" variant="flat" size="sm">{t('settingsPage.keyTypes.production')}</Chip>
                        </TableCell>
                        <TableCell>2023-06-15</TableCell>
                        <TableCell>2023-07-14</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button isIconOnly variant="light" size="sm" aria-label={t('common.copy')}> {/* common.copy を追加 */}
                              <Icon icon="lucide:copy" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm" aria-label={t('common.delete')}>
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
                          <Chip color="warning" variant="flat" size="sm">{t('settingsPage.keyTypes.development')}</Chip>
                        </TableCell>
                        <TableCell>2023-06-20</TableCell>
                        <TableCell>2023-07-15</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button isIconOnly variant="light" size="sm" aria-label={t('common.copy')}>
                              <Icon icon="lucide:copy" width={16} />
                            </Button>
                            <Button isIconOnly variant="light" color="danger" size="sm" aria-label={t('common.delete')}>
                              <Icon icon="lucide:trash" width={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="bg-default-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">{t('settingsPage.apiKeySecurity')}</h4>
                    <p className="text-small text-default-600 mb-2">{t('settingsPage.apiKeySecurityDescription')}</p>
                    <ul className="list-disc list-inside text-small text-default-600 space-y-1">
                      <li>{t('settingsPage.apiKeySecurityPoint1')}</li>
                      <li>{t('settingsPage.apiKeySecurityPoint2')}</li>
                      <li>{t('settingsPage.apiKeySecurityPoint3')}</li>
                      <li>{t('settingsPage.apiKeySecurityPoint4')}</li>
                    </ul>
                  </div>
                </div>
              </Tab>
              
              <Tab
                key="billing"
                title={
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:credit-card" width={16} />
                    <span>{t('settingsPage.billingTab')}</span>
                  </div>
                }
              >
                <div className="space-y-6 py-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{t('settingsPage.planAndBilling')}</h3>
                    
                    <Card className="mb-6 border-primary bg-primary-50">
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-primary">{t('settingsPage.currentPlan')}</h4>
                            <p className="text-default-700">{t('settingsPage.planDetails', { date: 'August 15, 2023' })}</p>
                          </div>
                          <Button color="primary" variant="flat">
                            {t('settingsPage.upgradePlan')}
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">{t('settingsPage.usageThisMonth')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card shadow="sm">
                            <CardBody>
                              <div className="flex flex-col">
                                <p className="text-small text-default-500">{t('settingsPage.apiCalls')}</p>
                                <p className="text-xl font-semibold">12,450 / 50,000</p>
                                <p className="text-small text-success">{t('settingsPage.used', { percentage: 24.9 })}</p>
                              </div>
                            </CardBody>
                          </Card>
                          
                          <Card shadow="sm">
                            <CardBody>
                              <div className="flex flex-col">
                                <p className="text-small text-default-500">{t('settingsPage.tokens')}</p>
                                <p className="text-xl font-semibold">2.17M / 5M</p>
                                <p className="text-small text-success">{t('settingsPage.used', { percentage: 43.4 })}</p>
                              </div>
                            </CardBody>
                          </Card>
                          
                          <Card shadow="sm">
                            <CardBody>
                              <div className="flex flex-col">
                                <p className="text-small text-default-500">{t('settingsPage.storage')}</p>
                                <p className="text-xl font-semibold">1.2GB / 10GB</p>
                                <p className="text-small text-success">{t('settingsPage.used', { percentage: 12 })}</p>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">{t('settingsPage.paymentMethod')}</h4>
                        <Card shadow="sm">
                          <CardBody>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-default-100 rounded-md">
                                  <Icon icon="logos:visa" width={32} />
                                </div>
                                <div>
                                  <p>{t('settingsPage.visaEndingIn', { last4: 4242 })}</p>
                                  <p className="text-small text-default-500">{t('settingsPage.expiresDate', { date: '12/2025' })}</p>
                                </div>
                              </div>
                              <Button variant="light" size="sm">
                                {t('settingsPage.changePaymentMethod')}
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">{t('settingsPage.billingHistory')}</h4>
                        <Table removeWrapper aria-label={t('settingsPage.billingHistory') + " table"}>
                          <TableHeader>
                            <TableColumn>{t('settingsPage.date')}</TableColumn>
                            <TableColumn>{t('settingsPage.description')}</TableColumn>
                            <TableColumn>{t('settingsPage.amount')}</TableColumn>
                            <TableColumn>{t('settingsPage.status')}</TableColumn>
                            <TableColumn>{t('settingsPage.downloadInvoice')}</TableColumn>
                          </TableHeader>
                          <TableBody>
                            <TableRow key="1">
                              <TableCell>Jul 15, 2023</TableCell>
                              <TableCell>Pro Plan - Monthly</TableCell>
                              <TableCell>$49.00</TableCell>
                              <TableCell>
                                <Chip color="success" variant="flat" size="sm">{t('settingsPage.invoiceStatus.paid')}</Chip>
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
                                <Chip color="success" variant="flat" size="sm">{t('settingsPage.invoiceStatus.paid')}</Chip>
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
                                <Chip color="success" variant="flat" size="sm">{t('settingsPage.invoiceStatus.paid')}</Chip>
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