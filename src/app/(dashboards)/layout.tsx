'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {


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