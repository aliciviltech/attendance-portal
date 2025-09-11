import { LoginInputs } from "@/types/authTypes";
import { AccountsData } from "./ExampleData/AccountsData";
import { useRouter } from "next/navigation";

type User = {
    id:string,
    name: string,
    email: string,
    password: string,
    role: string
} | undefined



export const login = (userCredentials: LoginInputs) => {
    const { email } = userCredentials;
    const user: User = AccountsData.find((u) => email === u.email)
    if(!user){
        throw new Error("User not found");
    }
    console.log('running')
    const {password, ...otherInfo} = user
    return(otherInfo)
}

export const logout = () => {
    localStorage.removeItem('user')
}