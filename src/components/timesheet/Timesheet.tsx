"use client";

import { UserInfo } from "@/app/(dashboards)/employee/page";
import { DailyStat } from "@/types/accountsTypes";
import { useEffect, useState } from "react";



export default function Timesheet({ userInfo }: { userInfo: UserInfo | null }) {

    const [userMonthlyInfo, setUserMonthlyInfo] = useState<DailyStat[] | null>([])
    const [year, setYear] = useState<number>(2025);
    const [month, setMonth] = useState<number>(9); // September

    useEffect(() => {
        const filterInfo = userInfo?.stats?.daily.filter((info) => (new Date(info.date).getMonth()+1 === month && new Date(info.date).getFullYear()===year)) || []
        setUserMonthlyInfo(filterInfo)
    },[month, year, userInfo])





    // Totals
    const totals = userMonthlyInfo?.reduce(
        (acc, d) => {
            acc.regularHours += d.regularHours;
            acc.overtimeHours += d.overtimeHours;
            acc.totalHours += d.hoursWorked;
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
            <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <tbody>
                    <tr className="border-b">
                        <td className="font-semibold px-4 py-2 capitalize">Employee Name</td>
                        <td className="px-4 py-2">{userInfo?.name}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="font-semibold px-4 py-2 capitalize">Manager Name</td>
                        <td className="px-4 py-2">{userInfo?.managerName}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="font-semibold px-4 py-2 capitalize">Hourly Rate</td>
                        <td className="px-4 py-2">{userInfo?.hourlyRate}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="font-semibold px-4 py-2 capitalize">Overtime Rate</td>
                        <td className="px-4 py-2">{userInfo?.overtimeRate}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="font-semibold px-4 py-2 capitalize">Month</td>
                        <td className="px-4 py-2">{year}-{month.toString().padStart(2, "0")}</td>
                    </tr>
                </tbody>
            </table>

            {/* Timesheet Table */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-300 rounded-lg">
                    <thead className="bg-gray-300">
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
                        {userMonthlyInfo?.map((d) => (
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
                    <tfoot className="bg-gray-300 font-semibold">
                        <tr>
                            <td colSpan={5} className="px-4 py-2 text-right">
                                Totals:
                            </td>
                            <td className="px-4 py-2">{totals?.regularHours}</td>
                            <td className="px-4 py-2">{totals?.overtimeHours}</td>
                            <td className="px-4 py-2">{totals?.totalHours}</td>
                        </tr>
                        <tr>
                            <td colSpan={5} className="px-4 py-2 text-right">
                                Total Amount:
                            </td>
                            <td className="px-4 py-2">
                                {(totals && userInfo?.hourlyRate) && totals.regularHours * userInfo.hourlyRate}
                            </td>
                            <td className="px-4 py-2">
                                {(totals && userInfo?.overtimeRate) && totals.overtimeHours * userInfo.overtimeRate}
                            </td>
                            <td className="px-4 py-2">
                                {(totals && userInfo?.overtimeRate && userInfo?.hourlyRate) && (totals.regularHours * userInfo.hourlyRate +
                                    totals.overtimeHours * userInfo.overtimeRate)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
