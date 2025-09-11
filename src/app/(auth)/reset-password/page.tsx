'use client'
import DotsLoader from "@/components/loaders/DotsLoader";
import { RegisterInputs, ResetPasswordInputs } from "@/types/authTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {

    const router = useRouter()

    // loader
    const [isLoader, setIsLoader] = useState(false)

    // inputs 
    const [inputs, setInputs] = useState<ResetPasswordInputs>({
        newPassword: '',
        confirmPassword: ''
    })
    // password validate
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordValidate = (password: string):boolean => {
        return passwordRegex.test(password);
    }
    // confirmPassword
    const isConfirmPassword = (pass:string, confirmPass:string):boolean=>{
        return pass===confirmPass
    }
    // handle input change
    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoader(true)
        if(passwordValidate(inputs.newPassword)){
            if(isConfirmPassword(inputs.newPassword, inputs.confirmPassword)){
                console.log(inputs);
                setTimeout(() => {
                    alert('Password reset success')
                    setIsLoader(false)
                    router.push('/login')
                }, 1000);
            } else{
                alert('Password did not match')
            }
        }else{
            alert('Password must be 8 - characters long including atleast: \n one uppercase \n one lowercase \n one special character (@$!%*?&) \n one number \nEmpty spaces are not allowed')
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-primaryBg px-4 sm:px-0">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">
                    Reset Password
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border  border-lightBorder p-2"
                            placeholder="••••••••"
                            name="newPassword"
                            value={inputs.newPassword}
                            onChange={handleInputs}
                            required
                        />
                    </div>

                    {/* confirm password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="mt-1 w-full rounded-lg border  border-lightBorder p-2"
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
                            isLoader? <DotsLoader className="w-6"/> : 'Submit'
                        }
                    </button>
                </form>
                
                
            </div>
        </div>
    );
}
export default ResetPassword