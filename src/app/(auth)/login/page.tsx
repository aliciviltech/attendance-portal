'use client'
import DotsLoader from "@/components/loaders/DotsLoader";
import { LoginInputs } from "@/types/authTypes";
import { login } from "@/utils/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter()
  const [isLoader, setIsLoader] = useState<boolean>(false)

  // inputs 
  const [inputs, setInputs] = useState<LoginInputs>({
    email: '',
    password: ''
  })
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Check Accounts Data


  // submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoader(true)
    try {
      const response = login(inputs);
      console.log(response)
      toast.success('Login success')
      setIsLoader(false)
      localStorage.setItem('user', JSON.stringify(response))
      router.push(`/${response.role}`)
    } catch (e) {
      toast.error((e as Error).message)
      setIsLoader(false)
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-primaryBg px-4 sm:px-0">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Login
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
              className="mt-1 w-full rounded-lg border border-lightBorder p-2"
              placeholder="••••••••"
              name="password"
              value={inputs.password}
              onChange={handleInputs}
              required
            />
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe" className="select-none">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full h-10 flex justify-center items-center block rounded-lg bg-primaryColor p-2 text-white hover:bg-secondaryColor cursor-pointer transition"
          >
            {
              isLoader ? <DotsLoader className="w-6" /> : 'Login'
            }
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="mt-2 text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
export default LoginPage