'use client'

import { EmployeeEditInputs } from '@/types/EmployeeEditForm'
import { Teams } from '@/utils/ExampleData/Teams'
import React, { useEffect } from 'react'

import { useForm, SubmitHandler } from "react-hook-form"


export default function EditEmployeeForm({isEditForm, editEmployee}:{isEditForm:boolean, editEmployee:EmployeeEditInputs|undefined}) {

    const {
        register,
        handleSubmit,
        reset
    } = useForm<EmployeeEditInputs>()
    const onSubmit: SubmitHandler<EmployeeEditInputs> = (data) => console.log(data)

    useEffect(()=>{
        isEditForm && reset(editEmployee)
    },[])

    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full p-4 rounded-lg bg-white flex flex-col gap-2'>
                <label className='employee-edit-form-label'>Employee ID</label>
                <input {...register("id", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='id'/>
                <label className='employee-edit-form-label'>Name</label>
                <input {...register("name", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Name'/>
                <label className='employee-edit-form-label'>Email</label>
                <input {...register("email", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Email'/>
                {/* <input {...register("role", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Role'/> */}
                <label className='employee-edit-form-label'>Select Role</label>
                <select defaultValue={''} {...register("role", {required:true})} className='w-full rounded-lg border border-lightBorder p-2'>
                    <option value="" disabled>--Select Role--</option>
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="employee">Employee</option>
                </select>
                <label className='employee-edit-form-label'>Designation</label>
                <input {...register("designation", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Designation'/>
                <label className='employee-edit-form-label'>Department</label>
                <input {...register("department", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Department'/>
                <label className='employee-edit-form-label'>Select Team</label>
                <select defaultValue={''} {...register("team", {required:true})} className='w-full rounded-lg border border-lightBorder p-2'>
                    <option value="" disabled>--Select Team--</option>
                    {
                        Teams.map((t)=>{
                            return(
                                <option key={t.teamId} value={`${t.teamTitle}`}>{t.teamTitle}</option>
                            )
                        })
                    }
                </select>
                <label className='employee-edit-form-label'>Manager Name</label>
                <input {...register("managerName", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Manager Name'/>
                <label className='employee-edit-form-label'>Hourly Rate {`($)`}</label>
                <input {...register("hourlyRate", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Hourly Rate'/>
                <label className='employee-edit-form-label'>Overtime Rate {`($)`}</label>
                <input {...register("overtimeRate", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Overtime Rate'/>
                {
                    isEditForm ?
                    <input type="submit" value={'Update'} className='w-full bg-primaryColor text-white rounded-lg p-2 cursor-pointer hover:bg-secondaryColor' />
                    :
                    <input type="submit" className='w-full bg-primaryColor text-white rounded-lg p-2 cursor-pointer hover:bg-secondaryColor' />
                }
            </form>
        </div>
    )
}

