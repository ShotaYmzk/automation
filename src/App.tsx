import React, { Suspense } from 'react'; // Suspense をインポート
import { Switch, Route, Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // useTranslation をインポート

// Layouts
import MainLayout from './layouts/main-layout';

// Pages
import Dashboard from './pages/dashboard';
import Builder from './pages/builder';
import Connectors from './pages/connectors';
import Templates from './pages/templates';
import Agents from './pages/agents';
import RunsLogs from './pages/runs-logs';
import CostAnalytics from './pages/cost-analytics';
import Settings from './pages/settings';
import Help from './pages/help';
import Onboarding from './pages/onboarding';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.15,
};

// ラッパーコンポーネントを作成して Suspense を適用
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

function App() {
  const { t } = useTranslation(); // fallback UI用に t を取得

  return (
    // Suspense は main.tsx に移動しました。App全体で言語ファイルがロードされるのを待つため。
    // ここでの Suspense はルーティングごとのコンポーネント遅延ロード用（もしあれば）
    <Switch>
      <Route path="/onboarding">
        <AnimatedPage><Onboarding /></AnimatedPage>
      </Route>
      
      <Route path="/">
        <MainLayout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard">
              <AnimatedPage><Dashboard /></AnimatedPage>
            </Route>
            <Route path="/builder">
              <AnimatedPage><Builder /></AnimatedPage>
            </Route>
            <Route path="/connectors">
              <AnimatedPage><Connectors /></AnimatedPage>
            </Route>
            <Route path="/templates">
              <AnimatedPage><Templates /></AnimatedPage>
            </Route>
            <Route path="/agents">
              <AnimatedPage><Agents /></AnimatedPage>
            </Route>
            <Route path="/runs-logs">
              <AnimatedPage><RunsLogs /></AnimatedPage>
            </Route>
            <Route path="/cost-analytics">
              <AnimatedPage><CostAnalytics /></AnimatedPage>
            </Route>
            <Route path="/settings">
              <AnimatedPage><Settings /></AnimatedPage>
            </Route>
            <Route path="/help">
              <AnimatedPage><Help /></AnimatedPage>
            </Route>
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
}

export default App;