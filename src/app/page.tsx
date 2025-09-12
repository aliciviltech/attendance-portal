import FitButton from '@/components/buttons/FitButton'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-20 p-4'>
      {/* heading */}
      <h1 className='mt-20 text-center text-xl'>
        Welcome to <span className='text-[2rem] my-2 block text-primaryColor'> Bright Solution</span> Attendance and Payroll Portal
      </h1>

      {/* Roll based login */}
      <div className="buttons flex gap-2 flex-col items-center">
        <Link href={'/login'}><FitButton text='Login' className='w-[200px]' /></Link>
      </div>
    </div>
  )
}

export default Home