import { AccountsType } from "@/types/accountsTypes";

export let AccountsData: AccountsType[] = [
    {
        id: `1`,
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'Admin123@',
        role: 'admin',
        designation:'CEO'
    },
    {
        id: '2',
        name: 'hr',
        email: 'hr@gmail.com',
        password: 'Hr12345@',
        role: 'hr',
        designation:'HR Manager',
        department:'HR'
    },
    {
        id: '3',
        name: 'Ali',
        email: 'ali@gmail.com',
        password: 'Ali1234@',
        role: 'employee',
        designation:'Full-Stack Developer',
        department:'Web Development',
        team:'Team1',
        managerName:'Jawed Roomi',
        hourlyRate: 400,
        overtimeRate: 500,
        stats: {
            daily: [
                { date: "2025-08-08", day: 'mon', status: 'present', startTime: '9:00', endTime: '17:00', regularHours: 8, overtimeHours: 2, hoursWorked: 10, tasksCompleted: 1 },
                { date: "2025-09-08", day: 'mon', status: 'present', startTime: '9:00', endTime: '17:00', regularHours: 8, overtimeHours: 2, hoursWorked: 10, tasksCompleted: 1 },
                { date: "2025-09-09", day: 'tue', status: 'present', startTime: '9:00', endTime: '17:00', regularHours: 7, overtimeHours: 0, hoursWorked: 7, tasksCompleted: 2 },
                { date: "2025-09-10", day: 'wed', status: 'absent', startTime: '9:00', endTime: '17:00', regularHours: 0, overtimeHours: 0, hoursWorked: 0, tasksCompleted: 0 },
            ],
            checkinTime: 0,
            checkoutTime: 0,
        },
    },
    {
        id: '4',
        name: 'Shahid',
        email: 'shahid@gmail.com',
        password: 'Shahid1234@',
        role: 'employee',
        designation:'AI Developer',
        department:'AI Development',
        team:'Team2',
        managerName:'Jawed Roomi',
        hourlyRate: 300,
        overtimeRate: 400,
        stats: {
            daily: [
                { date: "2025-08-08", day: 'mon', status: 'present', startTime: '9:00', endTime: '17:00', regularHours: 8, overtimeHours: 2, hoursWorked: 10, tasksCompleted: 1 },
                { date: "2025-09-08", day: 'mon', status: 'present', startTime: '9:00', endTime: '17:00', regularHours: 8, overtimeHours: 0, hoursWorked: 8, tasksCompleted: 2 },
                { date: "2025-09-09", day: 'tue', status: 'absent', startTime: '9:00', endTime: '17:00', regularHours: 0, overtimeHours: 0, hoursWorked: 0, tasksCompleted: 0 },
                { date: "2025-09-10", day: 'wed', status: 'present', startTime: '9:00', endTime: '17:00', regularHours: 8, overtimeHours: 2, hoursWorked: 10, tasksCompleted: 3 },
            ],
            checkinTime: 0,
            checkoutTime: 0,
        },
    }
]