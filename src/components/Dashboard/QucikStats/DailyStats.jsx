// src/components/DailyStats.jsx
import { Box } from '@mui/material'

export default function DailyStats() {
  return (
    <Box 
      sx={{ 
        bgcolor: '#0a5f46',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3.5rem',
        height: '100%'
      }}
    >
      Daily stats
    </Box>
  )
}