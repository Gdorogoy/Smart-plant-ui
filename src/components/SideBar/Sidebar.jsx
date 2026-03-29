import React from 'react'
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GrassIcon from '@mui/icons-material/Grass'
import BarChartIcon from '@mui/icons-material/BarChart'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate, useLocation } from 'react-router-dom'
import colors from '../../assets/Colors'
import { useContext } from 'react'
import { PlantContext } from '../../Context/PlantContext'

const drawerWidth = 260

const Sidebar = ({ open, setOpen }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const { logout } = useContext(PlantContext)

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/home' },
        { text: 'My Plants', icon: <GrassIcon />, path: '/plants' },
        { text: 'Statistics', icon: <BarChartIcon />, path: '/stats' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ]

    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            variant="t"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: colors.background,
                    borderRight: `1px solid ${colors.muted}`,
                    color: colors.foreground,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    py: 3,
                },
            }}
        >
            <Box>
                {/* Logo Section */}
                <Box sx={{ px: 3, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                        width: 40,
                        height: 40,
                        bgcolor: colors.chart2,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <GrassIcon sx={{ color: colors.background }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                        SmartPlant
                    </Typography>
                </Box>

                <List sx={{ px: 2 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(item.path);
                                        setOpen(false);
                                    }}
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: isActive ? `${colors.chart2}20` : 'transparent',
                                        color: isActive ? colors.chart1 : colors.foreground,
                                        '&:hover': {
                                            bgcolor: `${colors.chart2}10`,
                                            color: colors.chart1,
                                            '& .MuiListItemIcon-root': {
                                                color: colors.chart1,
                                            }
                                        },
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <ListItemIcon sx={{
                                        color: isActive ? colors.chart1 : colors.muted,
                                        minWidth: 40,
                                        transition: 'color 0.2s ease',
                                    }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        slotProps={{
                                            fontWeight: isActive ? 'bold' : 'medium',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>

            {/* Logout / Bottom Section */}
            <Box sx={{ px: 2 }}>
                <Divider sx={{ bgcolor: colors.muted, mb: 2, opacity: 0.5 }} />
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            logout();
                            setOpen(false);
                        }}
                        sx={{
                            borderRadius: 2,
                            color: colors.muted,
                            '&:hover': {
                                bgcolor: `${colors.destructive}10`,
                                color: colors.destructive,
                                '& .MuiListItemIcon-root': {
                                    color: colors.destructive,
                                }
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <ListItemIcon sx={{ color: colors.muted, minWidth: 40 }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </Box>
        </Drawer>
    )
}

export default Sidebar