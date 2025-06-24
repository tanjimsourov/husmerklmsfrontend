import { Card, CardContent, Stack, Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { PiStudentBold } from 'react-icons/pi';
import useGetStudents from '../../hooks/useGetStudents';
import useApi from '../../hooks/useApi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdMoney, MdMoneyOff } from 'react-icons/md';
import MaleFemaleStudentRation from '../../components/MaleFemaleStudentRation';
import CustomBarChart from '../../components/CustomBarChart';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const chartVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "backOut"
    }
  }
};

const StatCard = ({ icon, title, value, isLoading, color }) => {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      padding: { xs: '0.25rem', sm: '0.5rem' },
      boxSizing: 'border-box'
    }}>
      <motion.div variants={cardVariants} style={{ height: '100%' }}>
        <Card sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
          }
        }}>
          <CardContent sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: { xs: '0.75rem', sm: '1rem' }
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1
            }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{
                  background: `rgba(25, 118, 210, 0.1)`,
                  borderRadius: '12px',
                  color: color,
                  fontSize: '1.5rem',
                  padding: '10px',
                  marginRight: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {icon}
              </motion.div>
              <Box sx={{ minWidth: 0 }}>
                <Box component="h3" sx={{
                  color: '#666',
                  marginBottom: '4px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {title}
                </Box>
                {isLoading ? (
                  <Skeleton variant="text" width={60} height={32} />
                ) : (
                  <motion.div
                    style={{
                      margin: 0,
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#333',
                      lineHeight: 1
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    key={value}
                  >
                    {value?.toLocaleString?.() || '0'}
                  </motion.div>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

function Dashboard() {
  const { students, isLoading, error } = useGetStudents();
  const { data, isLoading: isApiLoading, error: isApiError } = useApi('https://husmerklmsbackend.onrender.com/api/v1/teachers/get-teachers');
  const { data: totalExpense, isLoading: expenseLoading, error: expenseError } = useApi('https://husmerklmsbackend.onrender.com/api/v1/expense/monthly-total-expense');
  const { data: totalIncome, isLoading: incomeLoading, error: incomeError } = useApi('https://husmerklmsbackend.onrender.com/api/v1/studentFinancial/totalFeeCollectionCurrentMonth');
  const { token } = useAuthStore();
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      overflow: { xs: 'auto', sm: 'hidden' },
      padding: { xs: '0.25rem', sm: '1rem' },
      boxSizing: 'border-box'
    }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ 
          height: '100%',
          minHeight: { xs: 'min-content', sm: '100%' }
        }}
      >
        <Stack spacing={{ xs: 1, sm: 2 }} sx={{ 
          height: { sm: '100%' },
          minHeight: { xs: 'min-content', sm: 'auto' }
        }}>
          {/* Stats Cards */}
          <Box sx={{
            width: '100%',
            height: { xs: 'auto', sm: '22%' },
            minHeight: { xs: 'auto', sm: '22%' },
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: { xs: '0.5rem', sm: '1rem' }
          }}>
            <StatCard
              icon={<PiStudentBold />}
              title="Students"
              value={!isLoading && !error && students ? students.length : 0}
              isLoading={isLoading}
              color="#1976d2"
            />
            <StatCard
              icon={<FaChalkboardTeacher />}
              title="Teachers"
              value={!isApiLoading && !isApiError && data ? data.length : 0}
              isLoading={isApiLoading}
              color="#2e7d32"
            />
            <StatCard
              icon={<MdMoney />}
              title="Current Income"
              value={!incomeLoading ? totalIncome : 0}
              isLoading={incomeLoading}
              color="#9c27b0"
            />
            <StatCard
              icon={<MdMoneyOff />}
              title="Current Expense"
              value={!expenseLoading ? totalExpense : 0}
              isLoading={expenseLoading}
              color="#d32f2f"
            />
          </Box>

          {/* Charts Section */}
          <Box sx={{
            flex: { sm: 1 },
            width: '100%',
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)'
            },
            gap: { xs: '1rem', sm: '1rem' },
            minHeight: { xs: '600px', sm: 0 },
            mb: { xs: 2, sm: 0 }
          }}>
            {/* Male/Female Ratio Chart */}
            <motion.div
              variants={chartVariants}
              style={{
                height: { xs: '300px', sm: '100%' },
                minHeight: '300px',
                width: '100%'
              }}
            >
              <Card sx={{ 
                height: '100%',
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                <CardContent sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0,
                  padding: { xs: '8px', sm: '16px' },
                  '&:last-child': {
                    paddingBottom: { xs: '8px', sm: '16px' }
                  }
                }}>
                  <Box sx={{ 
                    flex: 1,
                    minHeight: '250px',
                    width: '100%',
                    position: 'relative'
                  }}>
                    <MaleFemaleStudentRation />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Custom Bar Chart */}
            <motion.div
              variants={chartVariants}
              style={{
                height: { xs: '300px', sm: '100%' },
                minHeight: '300px',
                width: '100%'
              }}
            >
              <Card sx={{ 
                height: '100%',
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                <CardContent sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0,
                  padding: { xs: '8px', sm: '16px' },
                  '&:last-child': {
                    paddingBottom: { xs: '8px', sm: '16px' }
                  }
                }}>
                  <Box sx={{ 
                    flex: 1,
                    minHeight: '250px',
                    width: '100%',
                    position: 'relative'
                  }}>
                    <CustomBarChart />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Box>
        </Stack>
      </motion.div>
    </Box>
  );
}

export default Dashboard;