export type EmployeeEditInputs = {
    id: string
    name: string
    email: string
    role: 'admin' | 'hr' | 'employee',
    designation: string
    department?: string
    team?: string
    managerName?: string
    hourlyRate?: number
    overtimeRate?: number
}
