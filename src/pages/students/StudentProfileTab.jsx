import React from 'react'
import { TextareaAutosize } from '@mui/material'
import Input from '../../components/Input'

function StudentProfileTab(props) {

    console.log(props)

  return (
    <div className="form">

        <div className="form-group row">
            
            <Input
                label="Name"
                value={props.data.name}
                readOnly={true}
            />
            <Input
                name="id"
                label="ID"
                value={props.data.studentId}
                readOnly={true}
            /> 

            <Input
                name="class"
                label="Class"
                value={props.data?.classLevel?.name}
                readOnly={true}
            />
                
            <Input
                name="section"
                label="Section"
                value={props.data?.section?.name}
                readOnly={true}
            />
            <Input
                name="date-of-birth"
                label="Date of Birth"
                value={props.data.dateOfBirth}
                readOnly={true}
            />
            <Input
                name="gender"
                label="Gender"
                value={props.data.gender}
                readOnly={true}
            />
            <Input
                name="blood-group"
                label="Blood Group"
                value={props.data.bloodGroup}
                readOnly={true}
            />

           <Input
                name="email"
                label="Email"
                value={props.data.email}
                readOnly={true}
            />

            <Input
                name="phone"
                label="Phone"
                value={props.data.phone}
                readOnly={true}
            />  

            <Input
                name="country"
                label="Country"
                value="Bangladesh"
                readOnly={true}
            />   

            <Input
                name="username"
                label="Username"
                value={props.data.userName}
                readOnly={true}
            />

            <Input 
                name="studentRoll"
                label="Student Roll"
                value={props.data.studentRoll}
                readOnly={true}
            />
   
            <Input
                name="password"
                label="Password"
                value={props.data.password}
                readOnly={true}
            />

            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                
                <TextareaAutosize 
                    placeholder='Address'
                    minRows={3}
                    name="address"
                    value={props.data.address}
                    InputProps={{
                        readOnly: true
                    }}
                />

            
            </div>
        </div>
        {/* Form */}
    </div>
  )
}

export default StudentProfileTab