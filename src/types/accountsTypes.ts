export type DailyStat = {
  date: string   // e.g. "2025-09-08" (ISO format YYYY-MM-DD)
  day: string
  startTime: string
  endTime: string
  regularHours: number
  overtimeHours: number
  status: string
  hoursWorked: number
  tasksCompleted: number
  // add more fields like salaryEarned, progress, etc.
}

export type MonthlyStat = {
  month: string  // e.g. "2025-09",
  daysPresent: number
  hoursWorked: number
  tasksCompleted: number
}

export type StatsType = {
  daily: DailyStat[],
  checkinTime: number,
  checkoutTime: number,
}

export type AccountsType = {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'hr' | 'employee',
  designation: string
  department?: string
  team?:string
  managerName?: string
  hourlyRate?: number
  overtimeRate?: number
  stats?: StatsType
}