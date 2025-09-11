'use client'
import DotsLoader from "@/components/loaders/DotsLoader";
import { LoginInputs } from "@/types/authTypes";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {

    const [isLoader, setIsLoader] = useState<boolean>(false)

    // inputs 
    const [input, setInput] = useState<string>('')
    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    // submit form
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoader(true)
        setTimeout(() => {
            setIsLoader(false)
            toast.success('Email sent')
        }, 1000);
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-primaryBg px-4 sm:px-0">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">
                    Recovery Email
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className="mt-1 w-full rounded-lg border border-lightBorder p-2"
                            placeholder="you@example.com"
                            name="email"
                            value={input}
                            onChange={handleInputs}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-10 flex justify-center items-center block rounded-lg bg-primaryColor p-2 text-white hover:bg-secondaryColor cursor-pointer transition"
                    >
                        {
                            isLoader ? <DotsLoader className="w-6" /> : 'Submit'
                        }
                    </button>
                </form>

                <div className="mt-2 text-center text-sm">
                    Got to{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword