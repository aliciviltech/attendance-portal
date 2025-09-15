import EditEmployeeForm from "@/components/editEmployeeForm/EditEmployeeForm"
import { AccountsData } from "@/utils/ExampleData/AccountsData"
import { Pen, Pencil, Trash } from "lucide-react"


export default function AllEmployees() {

    // fetch all employees
    const allEmployees = AccountsData.filter(emp => emp.role === 'employee')
    console.log(allEmployees)



    return (
        <div className="px-2">
            <h1 className='text-h4  mt-10 mb-2'>All Employees</h1>

            <table className="w-full bg-white border-separate border-spacing-0 border border-gray-300 rounded-lg overflow-hidden">
                <thead >
                    <tr>
                        <th className="px-4 py-4 text-left border-b border-gray-300">Sr. No.</th>
                        <th className="px-4 py-4 text-left border-b border-gray-300">ID</th>
                        <th className="px-4 py-4 text-left border-b border-gray-300">Name</th>
                        <th className="px-4 py-4 text-left border-b border-gray-300">Email</th>
                        <th className="px-4 py-4 text-left border-b border-gray-300">Desgination</th>
                        <th className="px-4 py-4 text-left border-b border-gray-300">Department</th>
                        <th className="px-4 py-4 text-left border-b border-gray-300">Team</th>
                        <th className="px-4 py-4 text-left border-b border-gray-300">Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {allEmployees?.map((emp, i) => (
                        <tr key={emp.id}>
                            <td className="px-4 py-4 border-b border-gray-300">{i + 1}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.id}</td>
                            <td className={`px-4 py-4 border-b border-gray-300 capitalize`}>{emp.name}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.email}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.designation}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.department}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.team}</td>
                            <td className="px-4 py-4 border-b border-gray-300">
                                <div className="flex gap-4">
                                    <Pencil size={16} className="cursor-pointer hover:text-blue-500" /> <Trash size={16} className="cursor-pointer hover:text-red-500" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="bg-primaryBg font-semibold">
                    {/* <tr>
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
                        </tr> */}
                </tfoot>
            </table>






                        {/* <EditEmployeeForm/> */}





        </div>
    )
}