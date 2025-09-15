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


// =================== login logout =====================
export const login = (userCredentials: LoginInputs) => {
    const { email } = userCredentials;
    const user: User = AccountsData.find((u) => email === u.email)
    if(!user){
        throw new Error("User not found");
    }
    if(userCredentials.password !== user.password){
        console.log(userCredentials.password)
        throw new Error("Invalid credentials");
    }
    
    const {password, ...otherInfo} = user
    return(otherInfo)
}

export const logout = () => {
    localStorage.removeItem('user')
}


