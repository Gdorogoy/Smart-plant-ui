import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Header from './components/Header/Header'
import Sidebar from './components/SideBar/Sidebar'
import { Box } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header></Header>
        <Dashboard></Dashboard>
      </Box>
    </Box>
  )
}

export default App

//TODO: 2.Refactor folders 3.Add api calls
//TODO: Backend fixes and refactors
