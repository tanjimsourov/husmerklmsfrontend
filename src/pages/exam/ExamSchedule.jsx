import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Header } from '../../components'

function ExamSchedule() {
  return (
    <div>
      <Card>
            <CardContent>
                <Header title="Exam Schedule" noBtn={true} />
                <form>
                    <div className="row">
                        <div className="form-field col-xs-12 col-sm-6 col-md-4">
                            <FormControl fullWidth>
                                <InputLabel id="exam-select-label">Exam</InputLabel>
                                <Select
                                    labelId="exam-select-label"
                                    id="exam-select"
                                    value={10}
                                    label="exam"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-field col-xs-12 col-sm-6 col-md-4">
                            <FormControl fullWidth>
                                <InputLabel id="class-select-label">Class</InputLabel>
                                <Select
                                    labelId="class-select-label"
                                    id="class-select"
                                    value={10}
                                    label="class"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-field col-xs-12 col-sm-6 col-md-4">
                            <FormControl fullWidth>
                                <InputLabel id="subject-select-label">Section</InputLabel>
                                <Select
                                    labelId="subject-select-label"
                                    id="subject-select"
                                    value={10}
                                    label="subject"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </form>
            </CardContent>
      </Card>
    </div>
  )
}

export default ExamSchedule
