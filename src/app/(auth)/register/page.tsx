'use client'
import DotsLoader from "@/components/loaders/DotsLoader";
import InfoModal from "@/components/modals/InfoModal";
import { RegisterInputs } from "@/types/authTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterPage = () => {

    const router = useRouter()
    const [isLoader, setIsLoader] = useState<boolean>(false)
    const [isInfoModal, setIsInfoModal] = useState<boolean>(false)


    // inputs 
    const [inputs, setInputs] = useState<RegisterInputs>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    // email regex
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValidate = (email: string): boolean => {
        return emailRegex.test(email);
    }
    // password validate
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordValidate = (password: string): boolean => {
        return passwordRegex.test(password);
    }
    // confirmPassword
    // const isConfirmPassword = (pass: string, confirmPass: string): boolean => {
    //     return pass === confirmPass
    // }
    // handle input change
    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // validate inputs
    const validateInputs = (inp: RegisterInputs) => {
        const { name, email, password, confirmPassword } = inp
        if (!name.trim()) {
            toast.error('All fields are required')
            return false
        }
        if (!emailValidate(email)) {
            toast.error('Invalid email format')
            return false
        }
        if (!passwordValidate(password)) {
            toast.error('Invalid password')
            setIsInfoModal(true)
            return false
        }
        if (password !== confirmPassword) {
            toast.error('Password did not match')
            return false
        }
        return true

    }

    // submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validateInputs(inputs)) {
            setIsLoader(true)
            setTimeout(() => {
                setIsLoader(false)
                toast.success('Account created successfully')
                router.push('/login')
            }, 1000);
        }

        // if (passwordValidate(inputs.password)) {
        //     if (isConfirmPassword(inputs.password, inputs.confirmPassword)) {
        //         setIsLoader(true)
        //         setTimeout(() => {
        //             setIsLoader(false)
        //             toast.success('Account created successfully')
        //             router.push('/login')
        //         }, 1000);
        //     } else {
        //         toast.error('Password did not match')
        //     }
        // } else {
        //     alert('Password must be 8 - characters long including atleast: \n one uppercase \n one lowercase \n one special character (@$!%*?&) \n one number \nEmpty spaces are not allowed')
        // }
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-primaryBg px-4 sm:px-0">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">
                    Register
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            className="mt-1 w-full rounded-lg border border-lightBorder p-2"
                            placeholder="Name"
                            name="name"
                            value={inputs.name}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            placeholder="you@example.com"
                            name="email"
                            value={inputs.email}
                            onChange={handleInputs}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            placeholder="••••••••"
                            name="password"
                            value={inputs.password}
                            onChange={handleInputs}
                            required
                        />
                        {
                            isInfoModal &&
                            <InfoModal setIsInfoModal={setIsInfoModal}>
                                <ul className="list-disc list-inside">
                                    Password must be 8 - characters long including atleast:
                                    <li>one uppercase letter</li>
                                    <li>one lowercase letter</li>
                                    <li>one special character {`(@$!%*?&)`}</li>
                                    <li>Empty spaces are not allowed</li>
                                </ul>
                            </InfoModal>
                        }
                    </div>

                    {/* confirm password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            placeholder="••••••••"
                            name="confirmPassword"
                            value={inputs.confirmPassword}
                            onChange={handleInputs}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-10 flex justify-center items-center block rounded-lg bg-primaryColor p-2 text-white hover:bg-secondaryColor cursor-pointer transition"
                    >
                        {
                            isLoader ? <DotsLoader className="w-6" /> : 'Register'
                        }
                    </button>
                </form>

                <div className="mt-2 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>

        </div>
    );
}
export default RegisterPage