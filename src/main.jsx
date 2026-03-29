import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PlantContextProvider from './Context/PlantContext.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './components/Auth/Auth.jsx'
import Plants from './components/Plants/Plants.jsx'
import Settings from './components/Settings/Settings.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlantContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<App />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/plants' element={<Plants />} />
          <Route path='/stats' element={<App />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>

      </BrowserRouter>
    </PlantContextProvider>
  </StrictMode>,
)
