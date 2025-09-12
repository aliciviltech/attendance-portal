"use client";

import { UserInfo } from "@/app/(dashboards)/employee/page";
import { useEffect, useState } from "react";

interface DailyEntry {
  date: string;
  day: string;
  status: "present" | "absent" | "leave";
  startTime?: string;
  endTime?: string;
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
}

interface EmployeeInfo {
  employeeName: string;
  managerName: string;
  hourlyRate: number;
  overtimeRate: number;
  month: string; // YYYY-MM
}

export default function Timesheet({userInfo}:{userInfo:UserInfo |null}){

  const [year, setYear] = useState<number>(2025);
  const [month, setMonth] = useState<number>(9); // September

  // ---- Example Data ----
  const employee: EmployeeInfo = {
    employeeName: "Ali Khan",
    managerName: "Shahid Khan",
    hourlyRate: 100,
    overtimeRate: 150,
    month: `${year}-${month.toString().padStart(2, "0")}`,
  };

  // Generate days of month 
  const daysInMonth = new Date(year, month, 0).getDate();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const timesheet: DailyEntry[] = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month - 1, i + 1);
    return {
      date: date.toLocaleDateString("en-CA"),
      day: weekdays[date.getDay()],
      status: "present",
      startTime: "09:00",
      endTime: "17:00",
      regularHours: 8,
      overtimeHours: i % 5 === 0 ? 2 : 0, // add overtime on every 5th day
      totalHours: 8 + (i % 5 === 0 ? 2 : 0),
    };
  });

  // Totals
  const totals = timesheet.reduce(
    (acc, d) => {
      acc.regularHours += d.regularHours;
      acc.overtimeHours += d.overtimeHours;
      acc.totalHours += d.totalHours;
      return acc;
    },
    { regularHours: 0, overtimeHours: 0, totalHours: 0 }
  );


  return (
    <div className="p-6 space-y-8">
      {/* Month Selector */}
      <div className="flex gap-4 items-center">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded-lg px-3 py-2"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-lg px-3 py-2"
        >
          {Array.from({ length: new Date().getFullYear() - 2023 }, (_, i) => (
            <option key={i} value={2024 + i}>
              {2024 + i}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Info Table */}
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <tbody>
          {Object.entries(employee).map(([key, value]) => (
            <tr key={key} className="border-b">
              <td className="font-semibold bg-gray-100 px-4 py-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </td>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Timesheet Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Day</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Regular Hours</th>
              <th className="px-4 py-2 text-left">Overtime Hours</th>
              <th className="px-4 py-2 text-left">Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {userInfo?.stats?.daily.map((d) => (
              <tr key={d.date} className="border-b">
                <td className="px-4 py-2">{d.date}</td>
                <td className="px-4 py-2">{d.day}</td>
                <td className="px-4 py-2 capitalize">{d.status}</td>
                <td className="px-4 py-2">{d.startTime}</td>
                <td className="px-4 py-2">{d.endTime}</td>
                <td className="px-4 py-2">{d.regularHours}</td>
                <td className="px-4 py-2">{d.overtimeHours}</td>
                <td className="px-4 py-2">{d.hoursWorked}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 font-semibold">
            <tr>
              <td colSpan={5} className="px-4 py-2 text-right">
                Totals:
              </td>
              <td className="px-4 py-2">{totals.regularHours}</td>
              <td className="px-4 py-2">{totals.overtimeHours}</td>
              <td className="px-4 py-2">{totals.totalHours}</td>
            </tr>
            <tr>
              <td colSpan={5} className="px-4 py-2 text-right">
                Total Amount:
              </td>
              <td className="px-4 py-2">
                {totals.regularHours * employee.hourlyRate}
              </td>
              <td className="px-4 py-2">
                {totals.overtimeHours * employee.overtimeRate}
              </td>
              <td className="px-4 py-2">
                {totals.regularHours * employee.hourlyRate +
                  totals.overtimeHours * employee.overtimeRate}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
