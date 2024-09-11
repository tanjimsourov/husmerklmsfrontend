import { Card, CardContent, useScrollTrigger } from '@mui/material'
import React, { useState } from 'react'
import { Header } from '../../components'
import { useFormik } from 'formik'
import useApi from '../../hooks/useApi'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

function GetFeeDistribution() {

    const navigation = useNavigate()

    const handeYearChange = (year)=>{
        console.log(year)
        navigation(`${year}`)
    }

  return (
    <>
      <Card>
            <CardContent>
                <Header title="Get Fee Distribution" noBtn={true}/>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <p className="title">Pick a Year</p>
                        <div className='box-wrapper'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                    sx={{width: '100%'}}
                                    views={["year"]}
                                    onChange={newValue => handeYearChange(dayjs(newValue).year())}
                                    openTo="year"
                                />
                            </LocalizationProvider>
                        </div>

                    </div>
                    <div className="col-xs-12 col-sm-6"></div>
                </div>
            </CardContent>
      </Card>
    </>
  )
}

export default GetFeeDistribution
