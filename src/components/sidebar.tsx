import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // i18nextフックをインポート

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  path: string;
  translationKey: string; // labelの代わりにtranslationKeyを使用
  icon: string;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { t } = useTranslation(); // t関数を取得
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: '/dashboard', translationKey: 'sidebar.dashboard', icon: 'lucide:layout-dashboard' },
    { path: '/builder', translationKey: 'sidebar.builder', icon: 'lucide:workflow' },
    { path: '/connectors', translationKey: 'sidebar.connectors', icon: 'lucide:plug' },
    { path: '/templates', translationKey: 'sidebar.templates', icon: 'lucide:template' },
    { path: '/agents', translationKey: 'sidebar.agents', icon: 'lucide:bot' },
    { path: '/runs-logs', translationKey: 'sidebar.runsLogs', icon: 'lucide:list-checks' },
    { path: '/cost-analytics', translationKey: 'sidebar.costAnalytics', icon: 'lucide:bar-chart-2' },
    { path: '/settings', translationKey: 'sidebar.settings', icon: 'lucide:settings' },
    { path: '/help', translationKey: 'sidebar.help', icon: 'lucide:help-circle' },
  ];
  
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
            {/* <span className="ml-2 font-semibold text-lg">Workflow AI</span> */}
            <span className="ml-2 font-semibold text-lg">{t('sidebar.aiWorkflowStudio')}</span>
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
            const label = t(item.translationKey); // 翻訳キーからラベルを取得
            
            return (
              <li key={item.path}>
                {collapsed ? (
                  <Tooltip content={label} placement="right">
                    <Button
                      as={Link}
                      to={item.path}
                      variant={isActive ? 'flat' : 'light'}
                      color={isActive ? 'primary' : 'default'}
                      className="w-full justify-center"
                      isIconOnly
                      aria-label={label}
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
                    {label}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-divider">
        {collapsed ? (
          <Tooltip content={t('sidebar.expandSidebar')} placement="right">
            <Button
              isIconOnly
              variant="light"
              aria-label={t('sidebar.expandSidebar')}
              onPress={onToggleCollapse}
              className="w-full"
            >
              <Icon icon="lucide:chevron-right" width={20} />
            </Button>
          </Tooltip>
        ) : (
          <Button
            variant="light"
            aria-label={t('sidebar.collapseSidebar')}
            onPress={onToggleCollapse}
            className="w-full justify-start"
            startContent={<Icon icon="lucide:chevron-left" width={20} />}
          >
            {t('sidebar.collapse')}
          </Button>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;