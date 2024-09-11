import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Styles from './DataTable.module.css';
import { Link } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

const DataTable = (props) => {

    const [open, setOpen] = useState(false);
    const [studentId, setStudentId] = useState('')

    const handleClickOpen = (id) => {
        setOpen(true);
        setStudentId(id)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = ()=>{
        setOpen(false);
    }

    const actionsColumn = {
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (params) => {
            return <div className={Styles.actions}>
                <Link to={`${params.row._id}`}>
                    <GrView />
                </Link>
                <div style={{marginLeft: '10px', cursor: 'pointer'}}>
                    { props.delete !== false && <MdDelete onClick={()=> handleClickOpen(params.row._id)}/>}
                </div>
                
            </div>;
        },
        sortable: false
    };

    console.log(props.delete)

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete the ENTRY?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This process can't be undone later!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    
                    {
                        studentId && 
                            <Button>
                                <Link to={`delete/${studentId}`}>
                                    Confirm
                                </Link>
                            </Button>
                        
                    
                    }

                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    className={Styles['data-table']}
                    rows={props.rows}
                    columns={[...props.columns, !props.noAction ?actionsColumn: '']}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    slots={{
                        toolbar: GridToolbar
                    }}
                    slotProps={{
                        toolbar: {
                            csvOptions: { fileName: props.fileName },
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        }
                    }}
                    pageSizeOptions={[10]}
                    
                    disableRowSelectionOnClick
                    disableColumnMenu
                    getRowId={(row) => row._id} // Use _id as the unique identifier
                />
            </Box>

        </>
    );
}

export default DataTable