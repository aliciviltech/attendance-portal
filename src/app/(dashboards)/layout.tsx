'use client'
import { usePathname } from "next/navigation"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname()
    console.log(pathname)
    let role = ""
    if (pathname.includes("/admin")) role = "Admin"
    if (pathname.includes("/hr")) role = "HR"
    if (pathname.includes("/employee")) role = "Employee"


    return (

        <SidebarProvider>
            <AppSidebar />
            <main className="w-full min-h-screen bg-primaryBg">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout