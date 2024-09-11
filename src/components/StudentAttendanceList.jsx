import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'studentId', headerName: 'Student ID', width: 150 },
    { field: 'name', headerName: 'Student Name', width: 200 },
]

function StudentAttendanceList(props) {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectionModelChange = (selectionModel) => {
        // Create an array of selected student IDs with their attendance status
        const updatedSelectedRows = props.students.map(row => ({
            student: row._id,
            status: selectionModel.includes(row._id) ? 'present' : 'absent'
        }));
        setSelectedRows(updatedSelectedRows);
    };

    return (
        <div>
            <DataGrid
                autoHeight
                columns={columns}
                rows={props.students}
                slots={{
                    toolbar: GridToolbar
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                        disableFilter: true
                    }
                }}
                checkboxSelection
                disableColumnMenu
                disableDensitySelector
                disableColumnSelector
                disableColumnFilter
                onRowSelectionModelChange={handleSelectionModelChange}
                getRowId={(row) => row._id} // Change 'id' to '_id'
            />

            {/* Render selected rows and their status */}
            <div>

                <button onClick={()=>props.handleClick(selectedRows)}>Submit</button>
            </div>
        </div>
    );
}

export default StudentAttendanceList;
