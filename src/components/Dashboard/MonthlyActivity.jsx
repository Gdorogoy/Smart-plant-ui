import { Box, Typography } from '@mui/material'
import colors from '../../assets/Colors'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useEffect } from 'react'
import DayComponent from './Calendar/DayComponent'
import { DaysOfWeeks } from './Calendar/DaysDisplay'
import { getUserStatistics } from '../../Api/statistics.api'

export default function MonthlyActivity() {
  const [monthlyActivity, setMonthlyActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserStatistics('0ecf972b-16be-4d0a-8312-b36609283816', 'none');
      setMonthlyActivity(res.monthlyActivity);
    }
    fetchData();

  }, []);


  const getLast31Days = () => {
    const days = []
    for (let i = 31; i >= 0; i--) {
      days.push(dayjs().subtract(i, 'day'))
    }
    return days
  }



  const activeDays = new Set(
    monthlyActivity
      .filter((date) => (date.active === true))
      .map(date => date.date)
  );



  const days = getLast31Days();

  const isDayActive = (day) => {
    const key = day.format('YYYY-MM-DD');
    return activeDays.has(key);
  }

  const getDayColor = (day) => {
    return isDayActive(day) ? colors.chart2 : colors.muted;
  }
  const getTextColor = (day) => {
    return isDayActive(day) ? colors.background : colors.foreground;
  }

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const firstDay = days[0]
  const dayOfWeek = firstDay.day()
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: colors.accent,
        borderRadius: 4,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        scale: 1
      }}
    >
      {/* Header*/}
      <Typography variant='h6' sx={{
        fontWeight: 'bold',
        color: colors.foreground
      }}>
        Monthly activity
      </Typography>

      {/* Weekday Labels */}
      <DaysOfWeeks
        weekdays={weekdays}
        firstDay={firstDay}
        dayOfWeek={dayOfWeek}
        offset={offset}
      />

      {/* Calendar Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, auto)',
          justifyContent: 'center',
          gap: 1.5,
          scale: 0.95,
        }}
      >

        {Array.from({ length: offset }).map((_, i) => (
          <DayComponent
            key={`empty-${i}`}
            empty={true}
          />
        ))}

        {days.map((day, index) => (
          <DayComponent
            day={day}
            index={index}
            getDayColor={() => getDayColor(day)}
            getTextColor={() => getTextColor(day)}
            activeDays={activeDays}
            key={day}

          />
        ))}

      </Box>
    </Box>
  )
}