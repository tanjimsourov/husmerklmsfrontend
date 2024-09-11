import React, {useRef} from 'react'
import { useReactToPrint } from 'react-to-print';
import Button from '@mui/material/Button';

function Print({children}) {

    const componentRef = useRef(null)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

  return (
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <header style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="contained" onClick={handlePrint} sx={{marginLeft: 'auto'}}>Print</Button>
        </header>
        <div ref={componentRef} style={{padding: '20px'}}>{children}</div>
    </div>
  )
}

export default Print