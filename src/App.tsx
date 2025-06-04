import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';

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

function App() {
  return (
    <Switch>
      <Route path="/onboarding">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Onboarding />
        </motion.div>
      </Route>
      
      <Route path="/">
        <MainLayout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Dashboard />
              </motion.div>
            </Route>
            <Route path="/builder">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Builder />
              </motion.div>
            </Route>
            <Route path="/connectors">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Connectors />
              </motion.div>
            </Route>
            <Route path="/templates">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Templates />
              </motion.div>
            </Route>
            <Route path="/agents">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Agents />
              </motion.div>
            </Route>
            <Route path="/runs-logs">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <RunsLogs />
              </motion.div>
            </Route>
            <Route path="/cost-analytics">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <CostAnalytics />
              </motion.div>
            </Route>
            <Route path="/settings">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Settings />
              </motion.div>
            </Route>
            <Route path="/help">
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Help />
              </motion.div>
            </Route>
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
}

export default App;
