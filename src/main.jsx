import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import CounterContextProvider from './Context/CounterContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <HeroUIProvider>
    <CounterContextProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <App />
        </QueryClientProvider>
      </AuthContextProvider>
    </CounterContextProvider>
  </HeroUIProvider>
)
