import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import colors from '../../../assets/Colors'
import { LineChart } from '@mui/x-charts'
import { useState } from 'react';
import { useEffect } from 'react';

export default function QuickStats({ statistics, loading, setLoading, userProfile }) {

  const convertToMin = (time) => {
    return time / 1000 / 60;
  }

  const [dailyProggress, setDailyProggress] = useState(0);

  const [map, setMap] = useState({});
  const [weeklyData, setWeeklyData] = useState(null);
  const [weekDates, setWeekDates] = useState([]);
  const [totalWeekActivity, setTotalWeekActivity] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(0);


  useEffect(() => {
    const fetchData = async () => {

      if (!statistics || !userProfile) return;

      setLoading(true);
      const { dailyWeeklyActivity } = statistics;
      const { todayActivity } = statistics;
      const { goal } = userProfile

      setDailyProggress(todayActivity);
      setWeeklyData(dailyWeeklyActivity);
      setDailyGoal(convertToMin(goal));

      const newMap = {};
      Object.entries(dailyWeeklyActivity).map(([key, value]) => {
        newMap[key] = value / 60;
        setTotalWeekActivity(prev => prev + (value / 60));
      })

      setMap(newMap);
      weekLables();
      setLoading(false);
    }
    fetchData();


  }, [statistics, userProfile]);

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


  const progressPercent = (convertToMin(dailyProggress) / convertToMin(dailyGoal)) * 100

  return (
    <Box sx={{
      bgcolor: colors.accent,
      borderRadius: 3,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      height: '100%',
      minWidth: 0
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
            {formatTooltip(dailyProggress)}
          </Typography>
          <Typography>
            / {formatTooltip(dailyGoal)}
          </Typography>



        </Box>
        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          height={150}
          margin={{ top: 5, right: 5, bottom: 20, left: 25 }}
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
          {formatTooltip(totalWeekActivity)}
        </Box>
        <Box sx={{
          flex: 1,
          width: '100%',
          minHeight: 0,
          minWidth: 0,
          mt: 1,
          position: 'relative'
        }}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          {
            (weeklyData && weekDates.length > 0) && <LineChart
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
                // pr: 8,
                '& .MuiChartsAxis-line': { stroke: colors.accent },
                '& .MuiChartsAxis-tick': { stroke: colors.accent },
                '& .MuiChartsAxis-tickLabel': { fill: colors.foreground },
              }}
            />}
          </Box>
        </Box>
      </Box>



    </Box>

  )
}