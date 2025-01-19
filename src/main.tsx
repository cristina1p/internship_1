import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/global.scss' // Import global styles here
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />,
  </StrictMode>,
)
