import React from 'react'
import TextField from '@mui/material/TextField'

function StudentParentTab({data, isChecked}) {
  return (
    <div className="form">

        <div className="form-group row">
            <div className="form-field col-xs-12 col-sm-4 col-md-3">

                <TextField
                    required
                    id="father_name"
                    label="Father's Name"
                    defaultValue={data.fatherName}
                    InputProps={{
                        readOnly: true
                    }}
                />
            
            </div>
            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                
                <TextField
                    required
                    id="m_name"
                    label="Mother's Name"
                    defaultValue={data.motherName}
                    InputProps={{
                        readOnly: true
                    }}
                />

            </div>

            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                
                <TextField
                    required
                    id="f_profession"
                    label="Father's Profession"
                    defaultValue={data.fatherProfession}
                    InputProps={{
                        readOnly: true
                    }}
                />

            </div>

            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                
                <TextField
                    required
                    id="m_profession"
                    label="Mother's Profession"
                    defaultValue={data.motherProfession}
                    InputProps={{
                        readOnly: true
                    }}
                />

            </div>

        </div>
        {/* form-group */}
        <div className="form-group row">
            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                
                <TextField
                    required
                    id="f_mob_no"
                    label="Father Mobile No"
                    defaultValue={data.fatherPhone}
                    InputProps={{
                        readOnly: true
                    }}
                />

            </div>
            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                
                <TextField
                    required
                    id="f_nid"
                    label="Father NID"
                    defaultValue={data.fatherNID}
                    InputProps={{
                        readOnly: true
                    }}
                />

            </div>
            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                
                <TextField
                    id="m_mob_no"
                    label="Mother Mobile No"
                    defaultValue={data.motherPhone}
                    InputProps={{
                        readOnly: true
                    }}
                />

            </div>
            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                
                <TextField
                    id="m_NID"
                    label="Mother NID"
                    defaultValue={data.motherNID}
                    InputProps={{
                        readOnly: true
                    }}
                />

            </div>
            
        </div>
        {/* form_group */}

    </div>
  )
}

export default StudentParentTab