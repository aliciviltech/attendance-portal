import { AccountsType } from "@/types/accountsTypes";

export let AccountsData:AccountsType[] = [
    {
        id:`1`,
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'Admin123@',
        role: 'admin'
    },
    {
        id:'2',
        name: 'hr',
        email: 'hr@gmail.com',
        password: 'Hr12345@',
        role: 'hr'
    },
    {
        id:'3',
        name: 'Ali',
        email: 'ali@gmail.com',
        password: 'Ali1234@',
        role: 'employee',
        stats: {
            daily: [
                { date: "2025-09-07", status:'present', hoursWorked: 8, tasksCompleted: 1 },
                { date: "2025-09-08", status:'present', hoursWorked: 7, tasksCompleted: 2 },
                { date: "2025-09-09", status:'absent', hoursWorked: 0, tasksCompleted: 0 },
            ],
        },
    },
    {
        id:'4',
        name: 'Shahid',
        email: 'shahid@gmail.com',
        password: 'shahid1234@',
        role: 'employee',
        stats: {
            daily: [
                { date: "2025-09-07", status:'present', hoursWorked: 8, tasksCompleted: 2 },
                { date: "2025-09-08", status:'absent', hoursWorked: 0, tasksCompleted: 0 },
                { date: "2025-09-09", status:'present', hoursWorked: 6, tasksCompleted: 3 },
            ],
        },
    }
]