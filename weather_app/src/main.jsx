import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BgContextProvider from './context/BgContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BgContextProvider>
      <App />
    </BgContextProvider>
  </StrictMode>,
)
