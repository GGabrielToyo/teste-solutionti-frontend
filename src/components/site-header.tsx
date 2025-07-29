import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

interface SiteHeaderProps {
    title: string;
}

export function SiteHeader({ title }: SiteHeaderProps) {
    return (
        <header className="w-full flex h-(--header-height) shrink items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <h1 className="text-base font-medium ml-2">{title}</h1>
                <div className="ml-auto flex items-center gap-2">
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}