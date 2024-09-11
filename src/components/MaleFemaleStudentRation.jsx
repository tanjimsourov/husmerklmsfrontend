import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import useApi from '../hooks/useApi';

const MaleFemaleStudentRation = () => {
    const {data, isLoading, error} = useApi('https://api.ibnhaysam.com/api/v1/students/getGenderRatio')

  return (
    <>
        {
            !isLoading && !error && data &&

            <PieChart
                series={[
                    {
                        data: data,
                    },
                ]}
                width={500}
                height={300}
            />

        }
    </>
  )
}

export default MaleFemaleStudentRation
