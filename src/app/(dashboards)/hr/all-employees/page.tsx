'use client'
import FitButton from "@/components/buttons/FitButton"
import EditEmployeeForm from "@/components/employeeEditForm/EmployeeEditForm"
import { ExecutiveModal } from "@/components/modals/ExecutiveModal"
import { EmployeeEditInputs } from "@/types/EmployeeEditForm"
import { AccountsData } from "@/utils/ExampleData/AccountsData"
import { Pencil, Plus, Trash } from "lucide-react"
import { useState } from "react"


export default function AllEmployees() {

    // fetch all employees
    const allEmployees = AccountsData.filter(emp => emp.role === 'employee')
    console.log(allEmployees)

    // modal
    const [isFormModal, setisFormModal] = useState(false)
    const handleFormModal = () => setisFormModal(!isFormModal)

    // is edit mode?
    const [isEditForm, setIsEditForm] = useState(false)
    const [editEmployee, setEditEmployee] = useState<EmployeeEditInputs>()
    const handleEdit = (emp: EmployeeEditInputs) => {
        handleFormModal()
        setIsEditForm(true)
        setEditEmployee(emp)
    }

    // is delete mode
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [deleteEmployee, setDeleteEmployee] = useState<EmployeeEditInputs>()
    const handleDeleteModal = () => setIsDeleteModal(!isDeleteModal)
    const handleDelete = (emp: EmployeeEditInputs) => {
        handleDeleteModal()
        setDeleteEmployee(emp)
    }

    return (
        <div className="px-2">
            <h1 className='text-h4  mt-10 mb-2 flex items-center justify-between'>
                All Employees 
                <span className="flex gap-2 items-center text-p1 border border-gray-300 rounded-sm px-2 py-1 hover:bg-gray-300 cursor-pointer transition-all" onClick={handleFormModal}>Add <Plus size={16}/> </span> 
            </h1>

            <div className="overflow-auto">

            <table className="w-full bg-white border-separate border-spacing-0 border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-primaryBg text-gray-600">
                    <tr>
                        <td className="px-4 py-4 text-left border-b border-gray-300">Sr. No.</td>
                        <td className="px-4 py-4 text-left border-b border-gray-300">ID</td>
                        <td className="px-4 py-4 text-left border-b border-gray-300">Name</td>
                        <td className="px-4 py-4 text-left border-b border-gray-300">Email</td>
                        <td className="px-4 py-4 text-left border-b border-gray-300">Desgination</td>
                        <td className="px-4 py-4 text-left border-b border-gray-300">Department</td>
                        <td className="px-4 py-4 text-left border-b border-gray-300">Team</td>
                        <td className="px-4 py-4 text-left border-b border-gray-300">Controls</td>
                    </tr>
                </thead>
                <tbody>
                    {allEmployees?.map((emp, i) => (
                        <tr key={emp.id}>
                            <td className="px-4 py-4 border-b border-gray-300 bg-primaryBg text-center">{i + 1}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.id}</td>
                            <td className={`px-4 py-4 border-b border-gray-300 capitalize`}>{emp.name}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.email}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.designation}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.department}</td>
                            <td className="px-4 py-4 border-b border-gray-300">{emp.team}</td>
                            <td className="px-4 py-4 border-b border-gray-300">
                                <div className="flex gap-4">
                                    <Pencil size={16} className="cursor-pointer hover:text-blue-500" onClick={() => handleEdit(emp)} />
                                    <Trash size={16} className="cursor-pointer hover:text-red-500" onClick={() => handleDelete(emp)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>



            {/* =================== employee add/edit modal =================== */}

            <ExecutiveModal isOpen={isFormModal} onClose={()=>{handleFormModal(); setIsEditForm(false)}} title={isEditForm ? 'Edit Employee':'Add Employee'} >
                <EditEmployeeForm isEditForm={isEditForm} editEmployee={editEmployee} />
            </ExecutiveModal>


            {/* =================== employee delete modal =================== */}

            <ExecutiveModal isOpen={isDeleteModal} onClose={handleDeleteModal} title='Delete Employee' >
                <p>Are you sure you want to delete <strong>{deleteEmployee?.name}</strong> permanantly ?</p>
                <div className="mt-4 flex gap-2 justify-end">
                    <button className={`px-6 py-2 text-white font-medium rounded-xl shadow-md bg-primaryColor hover:bg-secondaryColor active:scale-95 transition duration-200 cursor-pointer`}
                    onClick={handleDeleteModal}
                    >
                        Cancel
                    </button>
                    <button className={`px-6 py-2 text-white font-medium rounded-xl shadow-md bg-dangerColor hover:bg-red-700 active:scale-95 transition duration-200 cursor-pointer`}>
                        Delete
                    </button>
                </div>
            </ExecutiveModal>


        </div>
    )
}