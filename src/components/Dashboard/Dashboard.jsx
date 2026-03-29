import { Box } from '@mui/material'
import QuickStats from './QucikStats/QuickStats'
import MonthlyActivity from './MonthlyActivity'
import WeeklyStats from './WeeklyStatistics'
import { useContext } from 'react'
import { PlantContext } from '../../Context/PlantContext'
import Plant from '../Plants/Plant'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Dashboard() {

  const { statistics, setLoading, loading, refetchData, userProfile, plants } = useContext(PlantContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile) navigate('/login');

  }, [userProfile])

  return (
    <Box sx={{
      height: '100%',
      width: '100%',
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
        <Plant plants={plants} setLoading={setLoading} loading={loading} userProfile={userProfile} lastActivePlantId={userProfile?.lastActivePlantId} />
        <QuickStats statistics={statistics} setLoading={setLoading} loading={loading} userProfile={userProfile} />
        <MonthlyActivity statistics={statistics} setLoading={setLoading} loading={loading} />



      </Box>

      {/* Bottom:Weekly Stats */}
      <Box sx={{
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <WeeklyStats statistics={statistics} setLoading={setLoading} loading={loading}></WeeklyStats>
      </Box>


    </Box>
  )
}