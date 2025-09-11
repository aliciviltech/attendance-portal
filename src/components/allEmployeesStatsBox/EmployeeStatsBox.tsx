"use client";

import { useState } from "react";
import StatBox from "../statBox/StatBox";

type DailyStat = {
  date: string;
  status: "present" | "absent";
  hoursWorked: number;
  tasksCompleted: number;
};

type Employee = {
  id: string;
  name: string;
  email: string;
  role: string;
  stats: {
    daily: DailyStat[];
  };
};

const employees: Employee[] = [
  {
    id: "3",
    name: "Ali",
    email: "ali@gmail.com",
    role: "employee",
    stats: {
      daily: [
        { date: "2025-09-07", status: "present", hoursWorked: 8, tasksCompleted: 1 },
        { date: "2025-09-08", status: "present", hoursWorked: 7, tasksCompleted: 2 },
        { date: "2025-09-09", status: "absent", hoursWorked: 0, tasksCompleted: 0 },
      ],
    },
  },
  {
    id: "4",
    name: "Shahid",
    email: "shahid@gmail.com",
    role: "employee",
    stats: {
      daily: [
        { date: "2025-09-07", status: "present", hoursWorked: 8, tasksCompleted: 2 },
        { date: "2025-09-08", status: "absent", hoursWorked: 0, tasksCompleted: 0 },
        { date: "2025-09-09", status: "present", hoursWorked: 6, tasksCompleted: 3 },
      ],
    },
  },
];



export default function EmployeeStats() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(employees[0]);
  const [selectedDate, setSelectedDate] = useState("2025-09-07");
  const [selectedMonth, setSelectedMonth] = useState("2025-09");

  // --- Daily Stats ---
  const dailyStat = selectedEmployee.stats.daily.find((d) => d.date === selectedDate);

  // --- Monthly Stats (calculated from daily) ---
  const monthlyStats = selectedEmployee.stats.daily.filter((d) => d.date.startsWith(selectedMonth));

  const daysPresent = monthlyStats.filter((d) => d.status === "present").length;
  const daysAbsent = monthlyStats.filter((d) => d.status === "absent").length;
  const totalHours = monthlyStats.reduce((sum, d) => sum + d.hoursWorked, 0);
  const totalTasks = monthlyStats.reduce((sum, d) => sum + d.tasksCompleted, 0);

  return (
    <div className="flex flex-col gap-8 items-center">
      {/* Employee Selector */}
      <select
        value={selectedEmployee.id}
        onChange={(e) => {
          const emp = employees.find((emp) => emp.id === e.target.value)!;
          setSelectedEmployee(emp);
        }}
        className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
      >
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>

      {/* Daily Stats */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">Daily Stats</h2>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          {selectedEmployee.stats.daily.map((d) => (
            <option key={d.date} value={d.date}>
              {d.date}
            </option>
          ))}
        </select>
        <div className="flex gap-6">
          <StatBox label="Status" value={dailyStat?.status ?? "-"} />
          <StatBox label="Hours Worked" value={dailyStat?.hoursWorked ?? 0} />
          <StatBox label="Tasks Completed" value={dailyStat?.tasksCompleted ?? 0} />
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">Monthly Stats</h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          {[...new Set(selectedEmployee.stats.daily.map((d) => d.date.slice(0, 7)))].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <div className="flex gap-6">
          <StatBox label="Days Present" value={daysPresent} />
          <StatBox label="Days Absent" value={daysAbsent} />
          <StatBox label="Hours Worked" value={totalHours} />
          <StatBox label="Tasks Completed" value={totalTasks} />
        </div>
      </div>
    </div>
  );
}
