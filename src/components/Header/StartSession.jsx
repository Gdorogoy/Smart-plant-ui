// src/components/StartSession.jsx
import { Box } from '@mui/material'

export default function StartSession() {
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
        cursor: 'pointer',
        height: '100%',
        '&:hover': {
          bgcolor: '#084a36'
        }
      }}
    >
      start session
    </Box>
  )
}