import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const CustomBarChart = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        px: 2,
      }}
    >
      <Card
        sx={{
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}
          >
            Student Group Performance
          </Typography>

          <Box
            sx={{
              width: '100%',
              overflowX: 'auto',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <BarChart
              xAxis={[
                {
                  scaleType: 'band',
                  data: ['Group A', 'Group B', 'Group C'],
                },
              ]}
              series={[
                { data: [4, 3, 5], label: 'Math', color: '#4e79a7' },
                { data: [1, 6, 3], label: 'Science', color: '#f28e2b' },
                { data: [2, 5, 6], label: 'English', color: '#e15759' },
              ]}
              width={500} // Reduced width to fit smaller screens
              height={300}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomBarChart;
