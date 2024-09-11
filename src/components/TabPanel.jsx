import React from 'react'
import Box from '@mui/material/Box';

function TabPanel(props){
    const { children, value, index } = props;

    return(
      <div
        role = 'tabpanel'
        id = {`tabpanel-${index}`}
        hidden = { value !== index }
      >

        { value === index && (
          <Box sx={{ p:3 }}>
              {children}
          </Box>
        )}

      </div>
    )

}

export default TabPanel;