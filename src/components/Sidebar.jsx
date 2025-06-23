import React from 'react';
import List from '@mui/material/List';
import NavLists from '../data/NavLists';
import NavItems from './layout/NavItems';
import NavItem from './layout/NavItem';
import Logo from '../assets/imgs/logo.png';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Typography, Box, keyframes } from '@mui/material';
import styled from '@emotion/styled';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled component for the school name container
const SchoolNameContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: '12px 16px',
  margin: '16px 12px',
  borderRadius: '8px',
  background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
  backgroundSize: '400% 400%',
  animation: `${gradient} 15s ease infinite`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)'
  },
  animation: `${fadeIn} 0.5s ease-out`,
}));

// Styled component for the school name text
const SchoolNameText = styled(Typography)(({ theme }) => ({
  fontWeight: '700',
  color: 'white',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
  fontSize: '1rem',
  whiteSpace: 'normal', // Changed from nowrap to normal
  wordBreak: 'break-word', // Ensure long words break
  lineHeight: '1.4',
}));

function Sidebar() {
  const { school, isAuthenticated } = useAuthStore();
  
  return (
    <div>
      <div className="brand">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img 
            src={Logo} 
            alt="Logo" 
            style={{ 
              display: 'block', 
              margin: '0 auto',
              maxWidth: '80%',
              padding: '16px 0'
            }} 
          />
        </Link>
      </div>
      
      {isAuthenticated && school && (
        <SchoolNameContainer>
          <SchoolNameText>
            {school}
          </SchoolNameText>
        </SchoolNameContainer>
      )}

      <List component="nav">
        {NavLists.map((navList, idx) => (
          (navList.children && navList.children.length > 0) 
            ? <NavItems 
                key={navList.displayTitle} 
                title={navList.displayTitle} 
                icon={navList.icon} 
                children={navList.children} 
                role={navList.role} 
              /> 
            : <NavItem 
                key={idx} 
                title={navList.displayTitle} 
                role={navList.role} 
                icon={navList.icon} 
              />
        ))}
      </List>
    </div>
  );
}

export default Sidebar;