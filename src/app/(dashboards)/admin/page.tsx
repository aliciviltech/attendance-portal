'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { UserInfo } from '../employee/page'
import { logout } from '@/utils/client'
import { ChevronDown, User } from 'lucide-react'

const AdminDashboard = () => {
  
     const router = useRouter()
    
    
      // fetch employee from local storage
      const [userInfo,setUserInfo]=useState<UserInfo | null>(null)
      useEffect(()=>{
        const userInfoString = localStorage.getItem('user') || null;
        const userInfoJson: UserInfo = userInfoString && JSON.parse(userInfoString);
        setUserInfo(userInfoJson)
        if(!userInfoJson) router.push('/login')
      },[])
    
      // logout
      const handleLogout = ()=>{
        logout();
        router.push('/login')
      }
  
  
    return (
      <div>
          {/* header */}
        <header className='w-full px-4 pb-2 shadow-sm mb-10 flex flex-col items-center gap-4 sm:flex-row justify-between'>
          <h1 className='text-h4 text-center'>Admin Dashboard</h1>
          <div className="user group relative h-fit w-fit flex items-center gap-4 bg-primaryBg p-4 rounded-full cursor-pointer">
            <div className="img"> <User /> </div>
            <p>{userInfo?.name || 'user Name'}</p>
            <span> <ChevronDown /> </span>
            <div className='h-fit w-full absolute top-full left-0 hidden group-hover:block' onClick={handleLogout}>
              <p className='text-center bg-white shadow-sm px-4 py-2 my-2 rounded-full cursor-pointer hover:bg-primaryColor hover:text-white transition-all '>Logout</p>
            </div>
          </div>
        </header>
        
      </div>
    )
}

export default AdminDashboard