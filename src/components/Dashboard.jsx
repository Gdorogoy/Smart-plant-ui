// src/components/Dashboard.jsx - COMPLETE REPLACEMENT
import { Box } from '@mui/material'
import Header from './Header'
import MonthlyActivity from './MonthlyActivity'
import WeeklyStats from './WeeklyStats'
import StartSession from './StartSession'
import DailyStats from './DailyStats'
import colors from '../assets/Colors'

export default function Dashboard() {
  return (
    <Box 
      sx={{ 
        height: '100vh',
        width: '100%',
        maxWidth: '100%',
        bgcolor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        m: 0,
        p: 0
      }}
    >


      <Box 
        sx={{ 
          flex: 1,
          display: 'grid',
          gridTemplateRows: '40% 15% 1fr',
          gap: 2,
          p: 2,
          width: '100%'
        }}
      >
        {/* Row 1: Two columns */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: '40% 60%',
            gap: 2,
            pr:2,
            width: '100%'
          }}
        >
          <MonthlyActivity />
          <WeeklyStats />
        </Box>

        {/* Row 2: Start button */}
        <StartSession />

        {/* Row 3: Daily stats */}
        <DailyStats />
      </Box>
    </Box>
  )
}