"use client";

import { useEffect, useState } from "react";
import StatBox from "../statBox/StatBox";
import { UserInfo } from "@/app/(dashboards)/employee/page";
import { CalendarCheck2, CalendarX, ClipboardList, Timer } from "lucide-react";


export default function EmployeeStats({ userInfo }: { userInfo: UserInfo | null }) {

  const [mode, setMode] = useState<"daily" | "monthly">("daily");
  const [selectedDate, setSelectedDate] = useState(
    userInfo?.stats?.daily[0]?.date || ""
  );

  useEffect(() => {
    setSelectedDate(userInfo?.stats?.daily[0]?.date || '')
  }, [userInfo])

  // month/year state for monthly view
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1 // 1–12
  );
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // ----- DAILY DATA -----
  const dailyStat = userInfo?.stats?.daily.find((d) => d.date === selectedDate);

  // ----- MONTHLY CALCULATION -----
  const monthlyStats = userInfo?.stats?.daily.reduce(
    (acc, d) => {
      const date = new Date(d.date);
      const month = date.getMonth() + 1; // 1–12
      const year = date.getFullYear();

      if (month === selectedMonth && year === selectedYear) {
        if (d.status === "present") acc.daysPresent += 1;
        if (d.status === "absent") acc.daysAbsent += 1;
        acc.hoursWorked += d.hoursWorked;
        acc.tasksCompleted += d.tasksCompleted;
      }
      return acc;
    },
    { daysPresent: 0, daysAbsent: 0, hoursWorked: 0, tasksCompleted: 0 }
  );

  // months list
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // years list from 2024 → current year
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  );

  return (
    <div className="flex flex-col items-center gap-6">

      {/* header */}
      <header className="w-full flex justify-between items-center px-4">

        <p>Insights</p>

        {/* Mode Switch */}
        <div className="flex gap-4">
          <button
            onClick={() => setMode("daily")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${mode === "daily" ? "bg-primaryColor text-white" : "bg-gray-200"
              }`}
          >
            Daily
          </button>
          <button
            onClick={() => setMode("monthly")}
            className={`px-4 py-2 rounded-lg cursor-pointer ${mode === "monthly" ? "bg-primaryColor text-white" : "bg-gray-200"
              }`}
          >
            Monthly
          </button>
        </div>


      </header>



      {/* Daily Mode */}
      {mode === "daily" && (
        <>
          {/* Date Selector */}
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-lg shadow-sm"
          >
            {userInfo?.stats?.daily.map((d) => (
              <option key={d.date} value={d.date}>
                {d.date}
              </option>
            ))}
          </select>

          {/* Daily Stats */}
          {dailyStat ? (
            <div className="flex flex-col sm:flex-row gap-6 flex-wrap justify-center px-2">
              <StatBox className={`${dailyStat.status === 'present'? 'bg-green-300' : 'bg-red-300'}`} label="Status" value={dailyStat.status}  icon={ dailyStat.status === 'present'? <CalendarCheck2 size={16}/> : <CalendarX size={16}/>} />
              <StatBox className="bg-primaryColor/40" label="Hours Worked" value={dailyStat.hoursWorked} icon={<Timer size={16}/>} />
              <StatBox className="bg-orange-400/40" label="Tasks Completed" value={dailyStat.tasksCompleted} icon={<ClipboardList size={16}/>} />
            </div>
          ) : (
            <p>No data available for this date.</p>
          )}
        </>
      )}

      {/* Monthly Mode */}
      {mode === "monthly" && (
        <>
          {/* Month & Year Selectors */}
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="px-4 py-2 rounded-lg shadow-sm"
            >
              {months.map((m, idx) => (
                <option key={m} value={idx + 1}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="px-4 py-2 rounded-lg shadow-sm"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Monthly Stats */}
          <div className="flex gap-6 flex-wrap justify-center px-2">
            <StatBox className='bg-green-300' label="Days Present" value={monthlyStats?.daysPresent || 0} icon={<CalendarCheck2 size={16}/>} />
            <StatBox className='bg-red-300' label="Days Absent" value={monthlyStats?.daysAbsent || 0} icon={<CalendarX size={16}/>} />
            <StatBox className="bg-primaryColor/40" label="Hours Worked" value={monthlyStats?.hoursWorked || 0} icon={<Timer size={16}/>} />
            <StatBox className="bg-orange-400/40" label="Tasks Completed" value={monthlyStats?.tasksCompleted || 0} icon={<ClipboardList size={16}/>} />
          </div>
        </>
      )}
    </div>
  );
}
