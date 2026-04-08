import { Box } from '@mui/material'
import React from 'react'
import QuickStats from '../Dashboard/QucikStats/QuickStats'
import { DayCalendar } from '@mui/x-date-pickers/internals'
import WeeklyStats from '../Dashboard/WeeklyStatistics'
import MonthlyActivity from '../Dashboard/MonthlyActivity'
import { useContext } from 'react'
import { PlantContext } from '../../Context/PlantContext'
import Header from '../Header/Header'

const Statistics = () => {
    const { statistics, setLoading, loading, refetchData, userProfile, plants } = useContext(PlantContext);

    return (
        <Box>
            <Header></Header>
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '30% 1fr' },
                    gridTemplateRows: { xs: 'auto auto auto', md: '1fr 1fr' },
                    gap: 3,
                    p: 3,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}
            >
                {/* Top Left: Quick Stats */}
                <Box sx={{ minHeight: 0, minWidth: 0, height: '100%' }}>
                    <QuickStats statistics={statistics} setLoading={setLoading} loading={loading} userProfile={userProfile} />
                </Box>

                {/* Right Side: Weekly Stats (Spans both rows on desktop) */}
                <Box sx={{
                    minHeight: 0,
                    minWidth: 0,
                    height: '100%',
                    gridRow: { md: 'span 2' }
                }}>
                    <WeeklyStats statistics={statistics} setLoading={setLoading} loading={loading}></WeeklyStats>
                </Box>

                {/* Bottom Left: Monthly Activity */}
                <Box sx={{ minHeight: 0, minWidth: 0, height: '100%' }}>
                    <MonthlyActivity statistics={statistics} setLoading={setLoading} loading={loading} />
                </Box>
            </Box>
        </Box>
    )
}

export default Statistics