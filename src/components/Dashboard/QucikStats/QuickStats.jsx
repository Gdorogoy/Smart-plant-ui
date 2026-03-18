import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import colors from '../../../assets/Colors'
import { LineChart } from '@mui/x-charts'
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserStatistics } from '../../../Api/statistics.api';

export default function QuickStats() {


  const [weeklyData, setWeeklyData] = useState(null);
  const [map, setMap] = useState({});
  const [weekDates, setWeekDates] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserStatistics('0ecf972b-16be-4d0a-8312-b36609283816', 'none', 'none');

      const stats = res.dailyWeeklyActivity;
      setWeeklyData(stats);

      const newMap = {};
      Object.entries(stats).map(([key, value]) => {
        newMap[key] = value / 60;
      })

      setMap(newMap);
      weekLables();
    }
    fetchData();


  }, []);

  const stats = {
    today: 45,
    todayGoal: 60,
    week: 330,
    streak: 7,
    activePlant: {
      name: 'Rose 🌹',
      level: 12,
      xp: 2450,
      nextLevelXp: 3000
    }
  }

  const formatTooltip = (minutes) => {
    const h = minutes / 60;
    const m = (h - Math.floor(h)) * 60;
    return m > 0 ? `${Math.floor(h)}h ${Math.floor(m)}m` : `${Math.floor(h)}h`
  }

  const weekLables = () => {
    let dates = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(`${date.getDate()}/${date.getMonth() + 1}`);
    }
    setWeekDates(dates);
  }


  const formatYAxis = (val) => {
    const h = val / 60;
    const m = (h - Math.floor(h)) * 60;

    return h >= 1 ? (m > 0 ? `${Math.floor(h)}.${m}m` : `${Math.floor(h)}h`) : `${m}m`;
  };




  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const progressPercent = (stats.today / stats.todayGoal) * 100

  return (
    <Box sx={{
      bgcolor: colors.accent,
      borderRadius: 3,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      height: '100%'
    }}>
      {/* Today's Progress */}


      <Box>
        <Box sx={{
          color: colors.foreground,
          fontSize: '0.9rem',
          mb: 0.5
        }}>
          Today's Goal
        </Box>
        <Box>
          <Typography sx={{
            color: colors.chart2,
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            {formatTime(stats.today)}
          </Typography>
          <Typography>
            / {formatTime(stats.todayGoal)}
          </Typography>



        </Box>
        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 8,
            borderRadius: 3,
            mt: 1,
            bgcolor: colors.muted,
            '& .MuiLinearProgress-bar': {
              bgcolor: colors.chart2,
              borderRadius: 3,
            }
          }}
        />
      </Box>

      {/* This Week */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        py: 1,
        borderTop: `1px solid ${colors.muted}`,
        borderBottom: `1px solid ${colors.muted}`,
        flex: 1,
        minHeight: 0
      }}>
        <Box sx={{ color: colors.foreground, fontSize: '1.2rem', fontWeight: 'bold' }}>
          This Week Activity
        </Box>
        <Box sx={{
          color: colors.chart1,
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          {formatTime(stats.week)}
        </Box>
        <Box sx={{
          flex: 1,
          width: '100%',
          minHeight: 0,
          mt: 1
        }}>
          {(weeklyData && weekDates.length > 0) && <LineChart
            xAxis={
              [{
                data: weekDates,
                scaleType: 'point',
                tickLabelStyle: {
                  fill: colors.foreground,
                  fontSize: 9,
                  fontWeight: 'bold'
                }
              }]
            }
            series={[
              {
                data: Object.values(map),
                showMark: true,
                area: true,
                connectNulls: true,
                valueFormatter: formatTooltip,
                id: 'Total',
                color: colors.chart2

              }
            ]}
            yAxis={[{
              valueFormatter: formatYAxis,
              ticNumber: 4,
              tickLabelStyle: {
                fill: colors.foreground,
                fontSize: 12
              }
            }]}
            margin={{ top: 10, right: 10, bottom: 20, left: 30 }}
            sx={{
              bgcolor: colors.muted,
              borderRadius: 5,
              pr: 8,
              '& .MuiChartsAxis-line': { stroke: colors.accent },
              '& .MuiChartsAxis-tick': { stroke: colors.accent },
              '& .MuiChartsAxis-tickLabel': { fill: colors.foreground },
            }}
          />}
        </Box>
      </Box>



    </Box>

  )
}