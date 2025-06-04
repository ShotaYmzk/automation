import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { path: '/builder', label: 'Builder', icon: 'lucide:workflow' },
  { path: '/connectors', label: 'Connectors', icon: 'lucide:plug' },
  { path: '/templates', label: 'Templates', icon: 'lucide:template' },
  { path: '/agents', label: 'Agents / RAG', icon: 'lucide:bot' },
  { path: '/runs-logs', label: 'Runs & Logs', icon: 'lucide:list-checks' },
  { path: '/cost-analytics', label: 'Cost Analytics', icon: 'lucide:bar-chart-2' },
  { path: '/settings', label: 'Settings', icon: 'lucide:settings' },
  { path: '/help', label: 'Help', icon: 'lucide:help-circle' },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const location = useLocation();
  
  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 72 },
  };
  
  return (
    <motion.aside
      className="bg-content1 border-r border-divider flex flex-col h-screen z-10"
      initial={collapsed ? 'collapsed' : 'expanded'}
      animate={collapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.15, ease: 'easeInOut' }}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-divider">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center"
          >
            <Icon icon="lucide:zap" className="text-primary" width={24} />
            <span className="ml-2 font-semibold text-lg">Workflow AI</span>
          </motion.div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <Icon icon="lucide:zap" className="text-primary" width={24} />
          </div>
        )}
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <li key={item.path}>
                {collapsed ? (
                  <Tooltip content={item.label} placement="right">
                    <Button
                      as={Link}
                      to={item.path}
                      variant={isActive ? 'flat' : 'light'}
                      color={isActive ? 'primary' : 'default'}
                      className="w-full justify-center"
                      isIconOnly
                    >
                      <Icon icon={item.icon} width={20} />
                    </Button>
                  </Tooltip>
                ) : (
                  <Button
                    as={Link}
                    to={item.path}
                    variant={isActive ? 'flat' : 'light'}
                    color={isActive ? 'primary' : 'default'}
                    className="w-full justify-start"
                    startContent={<Icon icon={item.icon} width={20} />}
                  >
                    {item.label}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-divider">
        {collapsed ? (
          <Tooltip content="Expand Sidebar" placement="right">
            <Button
              isIconOnly
              variant="light"
              aria-label="Expand sidebar"
              onPress={onToggleCollapse}
              className="w-full"
            >
              <Icon icon="lucide:chevron-right" width={20} />
            </Button>
          </Tooltip>
        ) : (
          <Button
            variant="light"
            aria-label="Collapse sidebar"
            onPress={onToggleCollapse}
            className="w-full justify-start"
            startContent={<Icon icon="lucide:chevron-left" width={20} />}
          >
            Collapse
          </Button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
