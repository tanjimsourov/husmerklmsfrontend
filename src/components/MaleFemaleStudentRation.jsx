import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';

const MaleFemaleStudentRatio = () => {
  const data = [
    { id: 0, value: 60, label: 'Male', color: '#4e79a7' },
    { id: 1, value: 40, label: 'Female', color: '#f28e2b' },
  ];

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 500,
        margin: 'auto',
        mt: 4,
        px: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        borderRadius: '20px',
        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
        overflowX: 'hidden',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.25rem', color: '#333' }}
        >
          Male vs Female Students
        </Typography>

        <Box
          sx={{
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <PieChart
            series={[
              {
                data: data,
                innerRadius: 40,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
              },
            ]}
            width={300} // reduced width to fit smaller screens
            height={250}
          />
        </Box>

        <Box display="flex" justifyContent="center" gap={4} mt={2} flexWrap="wrap">
          {data.map((item) => (
            <Box key={item.id} display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: item.color,
                }}
              />
              <Typography variant="body2" sx={{ color: '#555' }}>
                {item.label}: {item.value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MaleFemaleStudentRatio;
