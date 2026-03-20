// src/components/WeeklyChart.jsx
import { Box } from '@mui/material'
import colors from '../../assets/Colors'
import { LineChart } from '@mui/x-charts/LineChart'
import { useState } from 'react'
import { useEffect } from 'react';
import { PlantContext } from '../../Context/PlantContext'
import { useContext } from 'react'

export default function WeeklyStats({ statistics, setLoading, loading }) {
  const [weeklyData, setWeeklyData] = useState(null);
  const [map, setMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!statistics) return;
      const { weeklyDailyStatsPerPlant } = statistics
      setLoading(true);
      setWeeklyData(weeklyDailyStatsPerPlant);

      const newMap = {};
      weeklyDailyStatsPerPlant.forEach((item) => {
        let dayMinutes = Object.values(item.activeDays);
        let normalized = dayMinutes.map((min) => min / 60);
        newMap[item.plant] = normalized
      });

      setMap(newMap);
      setLoading(false);
    }
    fetchData();

  }, [statistics]);



  const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const formatTooltip = (minutes) => {
    const h = minutes / 60;
    const m = (h - Math.floor(h)) * 60;
    return m > 0 ? `${Math.floor(h)}h ${Math.floor(m)}m` : `${Math.floor(h)}h`
  }


  // Converting the minutes to hours to display the Y-axis
  const formatYAxis = (val) => {
    const h = val / 60;
    const m = (h - Math.floor(h)) * 60;

    return h >= 1 ? (m > 0 ? `${Math.floor(h)}.${m}m` : `${Math.floor(h)}h`) : `${m}m`;
  };

  const findMaxHour = () => {
    let max = 2;
    Object.values(map).forEach((item) => {
      item.forEach((len) => {
        if (len > max) max = len
      });
    });
    return max;
  }


  // Finding max value to set the Y-axis accordingly 
  // const allData = [...plantData, ...weekData]
  // const maxMinutes = Math.max(...allData)


  return (
    <Box
      sx={{
        bgcolor: colors.accent,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 2
      }}
    >
      <Box sx={{
        color: colors.foreground,
        fontSize: '1.2rem',
        fontWeight: 'bold',
        mb: 1
      }}>
        Weekly Progress
      </Box>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        {weeklyData && <LineChart
          series={weeklyData?.map((item, index) => (
            {
              data: map[item.plant],
              label: item.plant,
              color: colors[`chart${(index % 5) + 1}`],
              showMark: true,
              area: true,
              connectNulls: true,
              valueFormatter: formatTooltip,
              id: item.plant

            }
          ))}
          xAxis={[{
            scaleType: 'point',
            data: xLabels,
            tickLabelStyle: {
              fill: colors.foreground,
              fontSize: 12,
            }
          }]}
          yAxis={[{
            min: 0, // Start at 0
            max: findMaxHour(), //Max in minutes so the grapth would display normally
            tickLabelStyle: {
              fill: colors.foreground,
              fontSize: 12,
            },
            valueFormatter: formatYAxis,
            tickNumber: 4,
          }]}
          tooltip={{ trigger: 'axis' }}
          sx={{
            bgcolor: colors.muted,
            borderRadius: 5,
            '& .MuiChartsAxis-line': { stroke: colors.accent },
            '& .MuiChartsAxis-tick': { stroke: colors.accent },
            '& .MuiChartsLegend-series text': { fill: colors.foreground },
          }}
          margin={{ top: 10, right: 20, bottom: 30, left: 50 }}
        />}
      </Box>
    </Box>
  )
}