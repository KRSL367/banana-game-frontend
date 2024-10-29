import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './pages/Login'
import App from './App'
import RegisterPage from './pages/Register'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <LoginPage /> */}
    <RegisterPage />
  </StrictMode>,
)
