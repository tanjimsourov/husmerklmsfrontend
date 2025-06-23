import { useState, useEffect } from 'react';
import { 
  Backdrop,
  Card, 
  CardContent, 
  CircularProgress, 
  Alert,
  Typography,
  Paper,
  Fade,
  Grow,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  Box
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { Search, FilterList, Refresh } from '@mui/icons-material';
import useAuthStore from '../../store/authStore';
import BASE_URL from '../../API/base_url';
import axios from 'axios';

// Animation keyframes
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460)',
  backgroundSize: '400% 400%',
  animation: `${gradientAnimation} 15s ease infinite`,
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  overflow: 'hidden',
  height: 'calc(100vh - 48px)',
  display: 'flex',
  flexDirection: 'column',
}));

const AnimatedDataGrid = styled(DataGrid)(({ theme }) => ({
  animation: `${fadeIn} 0.8s ease-out`,
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    fontSize: '1rem',
  },
  '& .MuiDataGrid-cell': {
    color: 'rgba(255, 255, 255, 0.8)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  '& .MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05) !important',
    },
    '&.Mui-selected': {
      backgroundColor: 'rgba(0, 150, 255, 0.15) !important',
    },
  },
  '& .MuiTablePagination-root': {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  flex: 1,
}));

function Teachers() {
  const { school_id, token } = useAuthStore();
  const [teacherData, setTeacherData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [subjects, setSubjects] = useState([]);

  const fetchTeacherData = async () => {
    if (!school_id || !token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `${BASE_URL}/api/get-teacher-detail/${school_id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setTeacherData(response.data);
      setFilteredData(response.data);
      
      // Extract unique subjects from the response
      const uniqueSubjects = [...new Set(
        response.data
          .map(teacher => teacher.subject)
          .filter(subject => subject) // Filter out empty/null subjects
      )];
      setSubjects(uniqueSubjects);
      
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch teacher data');
      console.error('Error fetching teacher data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, [school_id, token]);

  useEffect(() => {
    let result = teacherData;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => 
        item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply subject filter
    if (subjectFilter !== 'all') {
      result = result.filter(item => 
        item.subject && item.subject.toLowerCase() === subjectFilter.toLowerCase()
      );
    }
    
    setFilteredData(result);
  }, [searchTerm, subjectFilter, teacherData]);

  const columns = [
    { 
      field: 'fullname', 
      headerName: 'Name', 
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1" fontWeight="500">
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'address', 
      headerName: 'Address', 
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
          {params.value}
        </Typography>
      )
    },
    { 
      field: 'designation', 
      headerName: 'Designation', 
      flex: 1,
      renderCell: (params) => (
        <Paper 
          elevation={0} 
          sx={{
            padding: '4px 12px',
            borderRadius: '12px',
            background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
            color: 'white',
            fontWeight: '500',
          }}
        >
          {params.value}
        </Paper>
      )
    },
    { 
      field: 'subject', 
      headerName: 'Subject', 
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
          {params.value || 'N/A'}
        </Typography>
      )
    },
    { 
      field: 'created_at', 
      headerName: 'Joined Date', 
      flex: 1,
      valueGetter: (params) => new Date(params.row.created_at).toLocaleDateString(),
      renderCell: (params) => (
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
          {params.value}
        </Typography>
      )
    }
  ];

  return (
    <Fade in timeout={800}>
      <div style={{ padding: '24px', height: '100vh', overflow: 'hidden' }}>
        <GradientCard>
          <CardContent sx={{ padding: '24px !important', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3
            }}>
              <div>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: '600',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Teaching Staff
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      mt: 0.5 
                    }}
                  >
                    Manage and view all teacher information
                  </Typography>
                </Typography>
              </div>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search teachers..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                    }
                  }}
                />
                
                <Select
                  size="small"
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  IconComponent={FilterList}
                  sx={{
                    color: 'white',
                    minWidth: '120px',
                    '& .MuiSelect-icon': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                >
                  <MenuItem value="all">All Subjects</MenuItem>
                  {subjects.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
                
                <IconButton 
                  onClick={fetchTeacherData}
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    }
                  }}
                >
                  <Refresh />
                </IconButton>
              </Box>
            </Box>

            {error && (
              <Grow in>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    background: 'rgba(239, 83, 80, 0.1)',
                    border: '1px solid rgba(239, 83, 80, 0.3)',
                    color: 'white'
                  }}
                >
                  {error}
                </Alert>
              </Grow>
            )}

            <Box sx={{ flex: 1, position: 'relative' }}>
              <Backdrop open={isLoading} sx={{ 
                position: 'absolute', 
                zIndex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '8px'
              }}>
                <CircularProgress sx={{ color: '#2575fc' }} size={60} thickness={4} />
              </Backdrop>
              
              <AnimatedDataGrid 
                rows={filteredData}
                columns={columns}
                getRowId={(row) => row.id}
                loading={isLoading}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                sx={{
                  '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  },
                }}
              />
            </Box>

            {!isLoading && filteredData.length === 0 && !error && (
              <Grow in>
                <Alert 
                  severity="info"
                  sx={{
                    mt: 3,
                    background: 'rgba(66, 165, 245, 0.1)',
                    border: '1px solid rgba(66, 165, 245, 0.3)',
                    color: 'white'
                  }}
                >
                  {searchTerm || subjectFilter !== 'all' 
                    ? 'No matching teachers found' 
                    : 'No teacher records found'}
                </Alert>
              </Grow>
            )}
          </CardContent>
        </GradientCard>
      </div>
    </Fade>
  );
}

export default Teachers;