export type DailyStat = {
  status:string
  date: string   // e.g. "2025-09-08" (ISO format YYYY-MM-DD)
  hoursWorked: number
  tasksCompleted: number
  // add more fields like salaryEarned, progress, etc.
}

export type MonthlyStat = {
  month: string  // e.g. "2025-09",
  daysPresent:number
  hoursWorked: number
  tasksCompleted: number
}

export type StatsType = {
  daily: DailyStat[]
}

export type AccountsType = {
  id: string,
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'hr' | 'employee',
  stats?: StatsType
}