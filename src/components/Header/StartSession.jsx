// src/components/StartSession.jsx
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import Session from '../Session/Session'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import colors from '../../assets/Colors'


export default function StartSession() {

  const [open, setOpen] = useState(false)

  const handleStartSession = () => {
    setOpen(true)
  }

  return (
    <>
      <Button
        onClick={handleStartSession}
        startIcon={<PlayArrowIcon />}
        sx={{
          bgcolor: colors.chart2,
          color: colors.background,
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 'bold',
          borderRadius: 3,
          textTransform: 'none',
          '&:hover': {
            bgcolor: colors.chart3,
            transform: 'scale(1.02)',
          },
          transition: 'all 0.2s'
        }}
      >
        Start Session
      </Button>

      <Session open={open} onClose={() => setOpen(false)} />
    </>

  )
}