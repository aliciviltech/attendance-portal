import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { adminMenuItems, employeeMenuItems, hrMenuItems } from "@/utils/menuItems"



export function AppSidebar() {

  const pathname = usePathname()
  let role = ""
  let items;
  if (pathname.includes("/admin")) {
    role = "Admin"
    items = adminMenuItems
  }
  if (pathname.includes("/hr")){
    role = "HR"
    items=hrMenuItems
  }
  if (pathname.includes("/employee")) {
    role = "Employee"
    items=employeeMenuItems
  }




  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Attendance Portal - {role}-Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}