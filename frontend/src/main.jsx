import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { InstitutionProvider } from './context/InstitutionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <InstitutionProvider>
        <App />
      </InstitutionProvider>
    </AuthProvider>
  </StrictMode>,
)
