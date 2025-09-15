'use client'

import React, { useState } from 'react'
import MyClock from '../clock/MyClock';
import Image from 'next/image';

export default function CheckinSection() {


    const [isCheckinActive, setIsCheckinActive] = useState(true); // initially Checkin enabled



    return (
        <div className='flex flex-wrap bg-white p-4 items-center shadow-sm border border-lightBlue rounded-[12px]'>

            {/* 11111111111111111111111 clock 111111111111111111111111*/}
            <div className='hidden xl:block'>
                <MyClock/>
            </div>

            {/* 1111111111111111111 checkin checkout 11111111111111111*/}
            <div className='flex flex-col bg-white gap-4'>

                {/* 222222222222222222 timer and image 222222222222222222 */}
                <div className='flex gap-4 flex-col-reverse items-center md:flex-row'>

                    {/* timer */}
                    <div className='flex flex-col gap-4 w-full md:w-fit'>
                        {/* working hours */}
                        <div className='w-full md:w-[250px] px-8 py-6 h-[100px] bg-white shadow-sm border border-lightBlue rounded-[12px] flex flex-col justify-between'>
                            <p className='text-p1'>Working hours</p>
                            <h1 className='text-h4'>0 Hr 00 Mins 00 Secs</h1>
                        </div>
                        {/* break hours */}
                        <div className='w-full md:w-[250px] px-8 py-6 w-[250px] h-[100px] bg-white shadow-sm border border-lightBlue rounded-[12px] flex flex-col justify-between'>
                            <p className='text-p1'>Break hours</p>
                            <h1 className='text-h4'>0 Hr 00 Mins 00 Secs</h1>
                        </div>
                    </div>

                    {/* image */}
                    <div className='bg-white w-[300px] p-4 text-center shadow-sm border border-lightBlue rounded-[12px] flex flex-col items-center justify-center'>
                        <Image src={'/images/checkin-section/checkin-section.jpg'} width={200} height={200} alt='img'/>
                        {
                            isCheckinActive?
                            <p className='text-p4'>Click check-in to start your productive time!</p>
                            :
                            <p className='text-p4'>You attendance has been recorded!</p>
                        }
                    </div>

                </div>

                {/* 2222222222222222222222222 buttons  2222222222222222222222 */}
                <div className=' bg-white p-2 shadow-sm border border-lightBlue rounded-[12px] flex gap-4 justify-center flex-col md:flex-row'>
                    <button
                        // onClick={handleCheckin}
                        // disabled={!isCheckinActive}
                        className={`px-6 py-2 w-full rounded-xl shadow-md font-medium text-white transition duration-200 ${isCheckinActive
                            ? "bg-green-400 hover:bg-green-600 active:scale-95"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Check In
                    </button>
                    <button
                        //   onClick={handleCheckout}
                        className={`px-6 py-2 w-full rounded-xl shadow-md font-medium text-white transition duration-200 ${!isCheckinActive
                                ? "bg-red-500 hover:bg-red-600 active:scale-95"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}