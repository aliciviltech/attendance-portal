"use client";

import Timesheet from "@/components/timesheet/Timesheet";
import { useEffect, useState } from "react";
import { UserInfo } from "../page";

export default function TimesheetPage() {

    // fetch employee from local storage
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    useEffect(() => {
        const userInfoString = localStorage.getItem('user') || null;
        const userInfoJson: UserInfo = userInfoString && JSON.parse(userInfoString);
        setUserInfo(userInfoJson)
    }, [])

    return (
        <>
            <Timesheet userInfo={userInfo} />
        </>
    );
}
