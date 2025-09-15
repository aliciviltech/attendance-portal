import { BookCheck,   Handshake, Info, LayoutDashboard,  LogOut,  Settings, TimerIcon, Users } from "lucide-react"


export const adminMenuItems = [
    {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Time Sheet",
    url: "#",
    icon: TimerIcon,
  },
  {
    title: "All Employees",
    url: "#",
    icon: Users,
  },
  {
    title: "Department/Team",
    url: "#",
    icon: Handshake,
  },
  {
    title: "Company Information",
    url: "#",
    icon: Info,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export const hrMenuItems = [
    {
    title: "Dashboard",
    url: "/hr",
    icon: LayoutDashboard,
  },
  {
    title: "Time Sheet",
    url: "/hr/timesheet",
    icon: TimerIcon,
  },
  {
    title: "All Employees",
    url: "/hr/all-employees",
    icon: Users,
  },
  {
    title: "Team Assignments",
    url: "#",
    icon: BookCheck,
  },

]

export const employeeMenuItems = [
    {
    title: "Dashboard",
    url: "/employee",
    icon: LayoutDashboard,
  },
   {
    title: "Time Sheet",
    url: "/employee/timesheet",
    icon: TimerIcon,
  },


]