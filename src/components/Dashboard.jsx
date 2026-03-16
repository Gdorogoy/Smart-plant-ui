// src/components/Dashboard.jsx
import { Box } from '@mui/material'
import colors from '../assets/Colors'
import WeeklyStats from './WeeklyStats'
import MonthlyActivity from './Calendar/MonthlyActivity'
import QuickStats from './QuickStat/QuickStats'
import Plant from './QuickStat/Plant'

export default function Dashboard() {
  return (
    <Box sx={{
      height: '100vh',
      width: '100vw',
      display: 'grid',
      gridTemplateRows: '50% 50%',
      gap: 2,
      p: 2,
      overflow: 'hidden',
    }}>

      {/* Top Row: Quick Stats(& Plant) + Monthly Activity*/}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '25% 50% 25%',
        gap: 2,
        minHeight: 0,
        pr: 4
      }}>
        <Plant />
        <QuickStats />
        <MonthlyActivity />



      </Box>

      {/* Bottom:Weekly Stats */}
      <Box sx={{
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <WeeklyStats />
      </Box>


    </Box>
  )
}