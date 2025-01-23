import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/global.scss' // Import global styles here
import { App } from './App'
import './i18n' // Initialize i18n

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
