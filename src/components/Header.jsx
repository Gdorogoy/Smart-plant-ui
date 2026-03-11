// src/components/Header.jsx
import { Box, Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import colors from '../assets/Colors'

export default function Header() {
  return (
    <Box sx={{ p: 1, width:'100%'}}>
      <IconButton
        disableRipple
        sx={{
          color: colors.primary,
          '&:hover': {
            bgcolor: colors.muted,
          },
          '&:active': {
            bgcolor: colors.foreground,
          }
        }}
      >
        <MenuIcon sx={{ fontSize: 28 ,borderRadius:2}} />
      </IconButton>
    </Box>
  )
}