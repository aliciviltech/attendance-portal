import FitButton from '@/components/buttons/FitButton'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 p-4'>
      {/* heading */}
      <h1 className='mt-20 text-center text-xl'>
        Welcome to Attendance and Payroll Portal
      </h1>

      {/* Roll based login */}
      <div className="buttons flex gap-2 flex-col items-center">
        <Link href={'/login'}><FitButton text='Go as Admin' className='w-[200px]' /></Link>
        <Link href={'/'}><FitButton text='Go as HR' className='w-[200px]' /></Link>
        <Link href={'/'}><FitButton text='Go as Employee' className='w-[200px]' /></Link>
      </div>
    </div>
  )
}

export default Home