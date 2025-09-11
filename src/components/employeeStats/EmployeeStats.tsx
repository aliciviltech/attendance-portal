"use client";

import { useState } from "react";
import StatBox from "../statBox/StatBox";
import { UserInfo } from "@/app/(dashboards)/employee/page";

export default function EmployeeStats({ userInfo }: { userInfo: UserInfo | null }) {
  const [mode, setMode] = useState<"daily" | "monthly">("daily");
  const [selectedDate, setSelectedDate] = useState(
    userInfo?.stats?.daily[0]?.date || ""
  );

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
      {/* Mode Switch */}
      <div className="flex gap-4">
        <button
          onClick={() => setMode("daily")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            mode === "daily" ? "bg-primaryColor text-white" : "bg-gray-200"
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setMode("monthly")}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            mode === "monthly" ? "bg-primaryColor text-white" : "bg-gray-200"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Daily Mode */}
      {mode === "daily" && (
        <>
          {/* Date Selector */}
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm"
          >
            {userInfo?.stats?.daily.map((d) => (
              <option key={d.date} value={d.date}>
                {d.date}
              </option>
            ))}
          </select>

          {/* Daily Stats */}
          {dailyStat ? (
            <div className="flex gap-6 flex-wrap justify-center">
              <StatBox label="Status" value={dailyStat.status} />
              <StatBox label="Hours Worked" value={dailyStat.hoursWorked} />
              <StatBox label="Tasks Completed" value={dailyStat.tasksCompleted} />
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
              className="px-4 py-2 border rounded-lg shadow-sm"
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
              className="px-4 py-2 border rounded-lg shadow-sm"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Monthly Stats */}
          <div className="flex gap-6 flex-wrap justify-center">
            <StatBox label="Days Present" value={monthlyStats?.daysPresent || 0} />
            <StatBox label="Days Absent" value={monthlyStats?.daysAbsent || 0} />
            <StatBox label="Hours Worked" value={monthlyStats?.hoursWorked || 0 } />
            <StatBox label="Tasks Completed" value={monthlyStats?.tasksCompleted || 0} />
          </div>
        </>
      )}
    </div>
  );
}
