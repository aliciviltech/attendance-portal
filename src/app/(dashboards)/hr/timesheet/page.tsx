'use client'

import Timesheet from '@/components/timesheet/Timesheet'
import { AccountsData } from '@/utils/ExampleData/AccountsData';
import React, { useState } from 'react'

const TimesheetPage = () => {

    const allEmployees = AccountsData.filter((account) => account.role === 'employee').map(({ password, ...rest }) => rest);
    console.log(allEmployees)
    const [employee, setEmployee] = useState(allEmployees[0]);
    const handleEmployee = (id: string) => {
        const updatedEmployee = allEmployees.find(emp => emp.id === id)
        updatedEmployee && setEmployee(updatedEmployee)
    }

    console.log(employee)


    return (

            <div>
                <div className='flex gap-4 items-center justify-center'>
                    <p>Select Employee</p>
                    <select
                        value={employee.id}
                        onChange={(e) => { handleEmployee(e.target.value) }}
                        className="shadow-sm rounded-lg px-3 py-2"
                    >
                        {allEmployees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                      <h1 className='text-h4 shadow-sm py-1 px-2 mx-4 my-4'>  {`${employee.name}'s`} Timesheet:</h1>
                <Timesheet userInfo={employee} />
                </div>
            </div>
    )
}

export default TimesheetPage