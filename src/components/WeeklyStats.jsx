// src/components/WeeklyStats.jsx
import { Box } from '@mui/material'

export default function WeeklyStats() {
  return (
    <Box 
      sx={{ 
        bgcolor: '#0a5f46',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2.5rem',
        height: '100%'
      }}
    >
      weekly stats per plant
    </Box>
  )
}