import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "./components/site-header"
import { useLocation } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation()
    const getTitleByPath = (pathname: string) => {
        const titleMap: Record<string, string> = {
            '/': 'Dashboard de Endereços',
            '/profile': 'Perfil do Usuário',
        }

        return titleMap[pathname] || 'Sistema'
    }

    const currentTitle = getTitleByPath(location.pathname)

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
                <SiteHeader title={currentTitle} />
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </SidebarProvider>

    )
}