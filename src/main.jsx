import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PlantContextProvider from './Context/PlantContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlantContextProvider>
      <App />
    </PlantContextProvider>
  </StrictMode>,
)
