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
import { LogOut } from "lucide-react"
import { logout } from "@/utils/client"
import { useRouter } from "next/navigation"



export function AppSidebar() {

  const pathname = usePathname()
  let role = ""
  let items;
  if (pathname.includes("/admin")) {
    role = "Admin"
    items = adminMenuItems
  }
  if (pathname.includes("/hr")) {
    role = "HR"
    items = hrMenuItems
  }
  if (pathname.includes("/employee")) {
    role = "Employee"
    items = employeeMenuItems
  }

// logout
const router = useRouter()
  const handleLogout = ()=>{
    logout();
    router.push('/login')
  }


  return (
    <Sidebar collapsible="icon" className="app-sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{role} Account</SidebarGroupLabel>
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
              <div className="flex gap-2 items-center cursor-pointer ml-2 hover:text-primaryColor " onClick={handleLogout}><LogOut size={16}/> Logout </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}