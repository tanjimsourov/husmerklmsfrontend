import React from 'react';
import List from '@mui/material/List';
import NavLists from '../data/NavLists';
import NavItems from './layout/NavItems';
import NavItem from './layout/NavItem'
import Logo from '../assets/imgs/logo.png'
import { Link } from 'react-router-dom';

function Sidebar() {  

  return (
    <div>
      <div className="brand">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
      </div> 
      <List component="nav">

        {
          NavLists.map((navList, idx)=>{
            
            return(
              (navList.children && navList.children.length > 0) ? <NavItems key={navList.displayTitle} title={navList.displayTitle} icon={navList.icon} children={navList.children} role={navList.role} /> : <NavItem key={idx} title={navList.displayTitle} role={navList.role} icon={navList.icon} />
            )
          })
        }
        
      </List>
    </div>
  );
}

export default Sidebar;
