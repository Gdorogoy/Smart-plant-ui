import { Box } from '@mui/material'
import colors from '../assets/Colors'
import dayjs from 'dayjs'

export default function MonthlyActivity() {
  const getLast31Days = () => {
    const days = []
    for (let i = 30; i >= 0; i--) {
      days.push(dayjs().subtract(i, 'day'))
    }
    return days
  }

  const days = getLast31Days()
  
  const activeDays = [0, 2, 5, 8, 12, 15, 18, 22, 25, 28, 30]
  
  const getDayColor = (index) => {
    if (activeDays.includes(index)) {
      return colors.chart2
    }
    return colors.muted
  }

  return (
    <Box 
      sx={{ 
        height: '100%',
        width: '100%',
        bgcolor: colors.accent,
        borderRadius: 3,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        boxSizing: 'border-box'
      }}
    >
      {/* Title */}
      <Box sx={{ 
        color: colors.foreground, 
        fontSize: '1.2rem', 
        fontWeight: 'bold', 
        textAlign: 'center',
        mb: 1
      }}>
        Last 31 Days
      </Box>

      {/* Grid - 5 rows × 7 columns */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(5, 1fr)',
          gap: 1,
          flex: 1,
          width: '100%'
        }}
      >
        {days.map((day, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: getDayColor(index),
              borderRadius: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              '&:hover': {
                bgcolor: colors.chart3,
                transform: 'scale(1.05)',
              }
            }}
          >
            <Box sx={{ 
              color: colors.background,
              fontFamily:'-apple-system', 
              fontSize: '0.9rem', 
              fontWeight: 'bold',
              lineHeight: 1.1
            }}>
              {day.date()}
            </Box>
            <Box sx={{ 
              color: colors.background,
              fontFamily:'-apple-system', 
              fontSize: '0.75rem',
              fontWeight: 'bold',
              lineHeight: 1.1
            }}>
              {day.format('MMM')}
            </Box>
            <Box sx={{ 
              color: colors.background, 
              fontFamily:'-apple-system', 
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              30M
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}