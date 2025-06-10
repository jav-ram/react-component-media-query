import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Documentation from './docs'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Documentation />
  </StrictMode>,
)
