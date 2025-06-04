import React, { Suspense } from 'react'; 
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HeroUIProvider, ToastProvider } from "@heroui/react"
import App from './App.tsx'
import './index.css'
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <HeroUIProvider>
          <ToastProvider />
          <App />
        </HeroUIProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)
