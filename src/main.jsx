import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import CounterContextProvider from './Context/CounterContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <HeroUIProvider>
    <CounterContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </CounterContextProvider>
  </HeroUIProvider>
)
