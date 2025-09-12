'use client'
import { CheckInButton } from '@/components/buttons/CheckinButton'
import { CheckOutButton } from '@/components/buttons/CheckoutButton'
import CheckButtons from '@/components/checkinCheckout/CheckButtons'
import EmployeeStats from '@/components/employeeStats/EmployeeStats'
import { StatsType } from '@/types/accountsTypes'
import { logout } from '@/utils/client'
import { ChevronDown, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'



export type UserInfo = {
  id: string,
  name: string,
  email: string,
  role: 'admin' | 'hr' | 'employee',
  managerName:string
  hourlyRate?:number
  overtimeRate?:number
  stats?: StatsType
}



const EmployeeDashboard = ({ params }: { params: { id: string } }) => {

  const router = useRouter()


  // fetch employee from local storage
  const [userInfo,setUserInfo]=useState<UserInfo | null>(null)
  useEffect(()=>{
    const userInfoString = localStorage.getItem('user') || null;
    const userInfoJson: UserInfo = userInfoString && JSON.parse(userInfoString);
    setUserInfo(userInfoJson)
  },[])

  // logout
  const handleLogout = ()=>{
    logout();
    router.push('/login')
  }


  // authenticate
  useEffect(()=>{
    const userInfoString = localStorage.getItem('user') || null;
    const userInfoJson: UserInfo = userInfoString && JSON.parse(userInfoString);
    if(!userInfoJson) router.push('/login')
  },[])



  return (
    <div className='p-4 w-full'>

      {/* header */}
      <header className='w-full mb-10 flex flex-col items-center gap-4 sm:flex-row justify-between'>
        <h1 className='text-h3 text-center'>Employee Dashboard</h1>
        <div className="user group relative h-fit w-fit flex items-center gap-4 bg-white p-4 rounded-full cursor-pointer">
          <div className="img"> <User /> </div>
          <p>{userInfo?.name || 'user Name'}</p>
          <span> <ChevronDown /> </span>
          <div className='h-fit w-full absolute top-full left-0 hidden group-hover:block' onClick={handleLogout}>
            <p className='text-center bg-white px-4 py-2 my-2 cursor-pointer hover:bg-primaryColor hover:text-white transition-all '>Logout</p>
          </div>
        </div>
      </header>

      {/* checkin checkout buttons */}
      <div className='flex gap-4 justify-center mb-10'>
        <CheckButtons userInfo={userInfo} />
      </div>

      {/* stats */}
      <EmployeeStats userInfo={userInfo} />
    </div>
  )
}

export default EmployeeDashboard