'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {


    return (

        <SidebarProvider defaultOpen >
            <AppSidebar />
            <main className="w-full max-w-[1920px] mx-auto min-h-screen">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout