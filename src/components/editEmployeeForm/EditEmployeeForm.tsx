'use client'

import React from 'react'

import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    id: string
    name: string
    email: string
    role: 'admin' | 'hr' | 'employee',
    designation: string
    department?: string
    team?: string
    managerName?: string
    hourlyRate?: number
    overtimeRate?: number
}


export default function EditEmployeeForm() {

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <div className='w-screen h-screen fixed inset-0 flex items-center justify-center bg-black/50'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[95%] w-[500px] p-4 rounded-lg bg-white flex flex-col gap-2'>
                <input {...register("id", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='id'/>
                <input {...register("name", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Name'/>
                <input {...register("email", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Email'/>
                {/* <input {...register("role", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Role'/> */}
                <select defaultValue={''} {...register("role", {required:true})} className='w-full rounded-lg border border-lightBorder p-2'>
                    <option value="" disabled>--Select Role--</option>
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="employee">Employee</option>
                </select>
                <input {...register("designation", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Designation'/>
                <input {...register("department", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Department'/>
                <input {...register("team", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Team'/>
                <input {...register("managerName", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Manager Name'/>
                <input {...register("hourlyRate", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Hourly Rate'/>
                <input {...register("overtimeRate", {required:true})} className='w-full rounded-lg border border-lightBorder p-2' placeholder='Overtime Rate'/>
                <input type="submit" className='w-full bg-primaryColor text-white rounded-lg p-2' />
            </form>
        </div>
    )
}

