// src/components/Header.jsx
import { Box, IconButton, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import colors from '../../assets/Colors'
import { useState } from 'react';
import Sidebar from '../SideBar/Sidebar';
import StartSession from './StartSession';

export default function Header() {

  const [openSidebar, setOpenSidebar] = useState(false);

  const userName = "Alex" // Get from user context
  const todayProgress = 45 // minutes
  const todayGoal = 60

  const handleStartSession = () => {
    console.log('Start session clicked')
    // Navigate to session page or open modal
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: 2,
      borderBottom: `1px solid ${colors.muted}`
    }}>
      {/* Left: Menu + Greeting */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => setOpenSidebar(prev => !prev)}
          disableRipple
          sx={{
            bgcolor: colors.accent,
            color: colors.foreground,
            borderRadius: 2,
            p: 1.5,
            '&:hover': {
              bgcolor: colors.muted,
            }
          }}
        >
          <MenuIcon sx={{ fontSize: 28 }} />
        </IconButton>

        <Box>
          <Box sx={{
            color: colors.foreground,
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Welcome back, {userName}!
          </Box>
          <Box sx={{
            color: colors.muted,
            fontSize: '0.9rem'
          }}>
            Today: {todayProgress}m / {todayGoal}m
          </Box>
        </Box>
      </Box>

      {/* Right: Start Session Button */}
      <StartSession />
      {/* <Button
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
      </Button> */}

      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
    </Box>
  )
}