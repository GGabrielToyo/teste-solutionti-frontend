import { LogOut, MapPin, User } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

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
import { UserService } from "@/services/user-service"


export function AppSidebar() {
    const useLocationSafe = () => {
        try {
            return useLocation()
        } catch {
            return { pathname: "/" }
        }
    }

    const navigate = useNavigate()

    const handleLogout = () => {
        UserService.logout()
        navigate("/auth")
    }

    const items = [
        {
            title: "Address",
            url: "/",
            icon: MapPin,
        },
        {
            title: "Profile",
            url: "/profile",
            icon: User,
        },
        {
            title: "Exit",
            onClick: handleLogout,
            icon: LogOut,
        }
    ]

    const location = useLocationSafe()

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Solution App</SidebarGroupLabel>
                    <SidebarGroupContent>

                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={location.pathname === item.url} onClick={item.onClick}>
                                        <a href={item.url} style={{ cursor: "pointer" }}>
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