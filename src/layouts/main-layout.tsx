import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import Sidebar from '../components/sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/builder')) return 'Workflow Builder';
    if (path.includes('/connectors')) return 'Connectors Library';
    if (path.includes('/templates')) return 'Templates Marketplace';
    if (path.includes('/agents')) return 'Agents / RAG Builder';
    if (path.includes('/runs-logs')) return 'Runs & Logs';
    if (path.includes('/cost-analytics')) return 'Cost Analytics';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/help')) return 'Help & Documentation';
    return 'AI Workflow Studio';
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
                aria-label="Toggle sidebar"
                onPress={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <Icon icon="lucide:menu" width={20} />
              </Button>
              <p className="font-bold text-inherit hidden sm:block ml-2">AI Workflow Studio</p>
            </NavbarBrand>
          </NavbarContent>
          
          <NavbarContent justify="center">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </NavbarContent>
          
          <NavbarContent justify="end">
            <Button
              isIconOnly
              variant="light"
              aria-label="Notifications"
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
              <DropdownMenu aria-label="User Actions">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">alex@company.com</p>
                </DropdownItem>
                <DropdownItem key="settings" startContent={<Icon icon="lucide:settings" width={16} />}>
                  My Settings
                </DropdownItem>
                <DropdownItem key="team" startContent={<Icon icon="lucide:users" width={16} />}>
                  Team Management
                </DropdownItem>
                <DropdownItem key="analytics" startContent={<Icon icon="lucide:bar-chart" width={16} />}>
                  Analytics
                </DropdownItem>
                <DropdownItem key="help" startContent={<Icon icon="lucide:help-circle" width={16} />}>
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger" startContent={<Icon icon="lucide:log-out" width={16} />}>
                  Log Out
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
