import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ModeToggle } from "./components/mode-toggle"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex justify-between w-full min-h-screen">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center p-4 border-b">
                        <SidebarTrigger />
                        <ModeToggle />
                    </div>
                    <div className="flex-1 w-full">
                        {children}
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}