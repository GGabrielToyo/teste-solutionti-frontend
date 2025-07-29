import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "./components/site-header"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }

        >
            <AppSidebar />
            <main className="flex flex-1 flex-col">
                <SiteHeader title="Dashboard de Endereços" />
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </SidebarProvider>

    )
}