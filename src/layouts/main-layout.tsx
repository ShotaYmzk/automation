import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import Sidebar from '../components/sidebar';
import { useTranslation } from 'react-i18next'; // i18nextフックをインポート

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation(); // t関数とi18nインスタンスを取得
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return t('pageTitles.dashboard');
    if (path.includes('/builder')) return t('pageTitles.builder');
    if (path.includes('/connectors')) return t('pageTitles.connectors');
    if (path.includes('/templates')) return t('pageTitles.templates');
    if (path.includes('/agents')) return t('pageTitles.agents');
    if (path.includes('/runs-logs')) return t('pageTitles.runsLogs');
    if (path.includes('/cost-analytics')) return t('pageTitles.costAnalytics');
    if (path.includes('/settings')) return t('pageTitles.settings');
    if (path.includes('/help')) return t('pageTitles.help');
    return t('pageTitles.default');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar 
          className="border-b border-divider" 
          maxWidth="full"
          height="4rem"
        >
          <NavbarContent className="sm:flex gap-4" justify="start">
            <NavbarBrand>
              <Button
                isIconOnly
                variant="light"
                aria-label={t('navbar.toggleSidebar')}
                onPress={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <Icon icon="lucide:menu" width={20} />
              </Button>
              <p className="font-bold text-inherit hidden sm:block ml-2">{t('navbar.aiWorkflowStudio')}</p>
            </NavbarBrand>
          </NavbarContent>
          
          <NavbarContent justify="center">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </NavbarContent>
          
          <NavbarContent justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  aria-label={t('navbar.language')}
                  className="mr-2"
                >
                  <Icon icon="lucide:languages" width={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label={t('navbar.language')} onAction={(key) => changeLanguage(key as string)}>
                <DropdownItem key="en">{t('navbar.english')}</DropdownItem>
                <DropdownItem key="ja">{t('navbar.japanese')}</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button
              isIconOnly
              variant="light"
              aria-label={t('navbar.notifications')}
              className="mr-2"
            >
              <Icon icon="lucide:bell" width={20} />
            </Button>
            
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label={t('navbar.userActions')}>
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">{t('navbar.signedInAs')}</p>
                  <p className="font-semibold">alex@company.com</p>
                </DropdownItem>
                <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" width={16} />}>
                  {t('navbar.mySettings')}
                </DropdownItem>
                <DropdownItem key="team" startContent={<Icon icon="lucide:users" width={16} />}>
                  {t('navbar.teamManagement')}
                </DropdownItem>
                <DropdownItem key="analytics" startContent={<Icon icon="lucide:bar-chart" width={16} />}>
                  {t('navbar.analytics')}
                </DropdownItem>
                <DropdownItem key="help" startContent={<Icon icon="lucide:help-circle" width={16} />}>
                  {t('navbar.helpAndFeedback')}
                </DropdownItem>
                <DropdownItem key="logout" color="danger" startContent={<Icon icon="lucide:log-out" width={16} />}>
                  {t('navbar.logOut')}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;