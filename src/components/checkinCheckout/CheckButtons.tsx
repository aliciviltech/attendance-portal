"use client";

import { useEffect, useState } from "react";
import { UserInfo } from "@/app/(dashboards)/employee/page";

interface CheckButtonsProps {
  userInfo: UserInfo | null;
}

export default function CheckButtons({ userInfo }: CheckButtonsProps) {
  const [isCheckinActive, setIsCheckinActive] = useState(true); // initially Checkin enabled
  const [checkinTime, setCheckinTime] = useState(userInfo?.stats?.checkinTime || 0);
  const [checkoutTime, setCheckoutTime] = useState(userInfo?.stats?.checkoutTime || 0);

  const [checkinRunning, setCheckinRunning] = useState(false);
  const [checkoutRunning, setCheckoutRunning] = useState(false);

  // Checkin Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkinRunning) {
      interval = setInterval(() => {
        setCheckinTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [checkinRunning]);

  // Checkout Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkoutRunning) {
      interval = setInterval(() => {
        setCheckoutTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [checkoutRunning]);

  // Format time to hh:mm:ss
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleCheckin = () => {
    setCheckinRunning(true);
    setCheckoutRunning(false);
    setIsCheckinActive(false);
    console.log(userInfo)

    // save to userInfo object
    if(userInfo?.stats){
        userInfo.stats.checkinTime = checkinTime;
        userInfo.stats.checkoutTime = checkoutTime;
    }
  };

  const handleCheckout = () => {
    setCheckoutRunning(true);
    setCheckinRunning(false);
    setIsCheckinActive(true);

    // save to userInfo object
    if(userInfo?.stats){
        userInfo.stats.checkinTime = checkinTime;
        userInfo.stats.checkoutTime = checkoutTime;
    }
  };

  return (
    <div className="flex gap-6">
      {/* Checkin Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleCheckin}
          disabled={!isCheckinActive}
          className={`px-6 py-2 rounded-xl shadow-md font-medium text-white transition duration-200 ${
            isCheckinActive
              ? "bg-blue-500 hover:bg-blue-600 active:scale-95"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Check In
        </button>
        <span className="mt-2 text-gray-700 font-mono">{formatTime(checkinTime)}</span>
      </div>

      {/* Checkout Button */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleCheckout}
          disabled={isCheckinActive}
          className={`px-6 py-2 rounded-xl shadow-md font-medium text-white transition duration-200 ${
            !isCheckinActive
              ? "bg-red-500 hover:bg-red-600 active:scale-95"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Check Out
        </button>
        <span className="mt-2 text-gray-700 font-mono">{formatTime(checkoutTime)}</span>
      </div>
    </div>
  );
}
