import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type PanelTopbarProps = {
    suite: string;
    service: string;
}

const PanelTopbar = ({ suite, service }: PanelTopbarProps) => {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between bg-[#e0c4a4] border-b border-white shadow-md shadow-[#E3B341]/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 text-black">
                <SidebarTrigger className="-ml-1 hover:text-[#F5F6FA] transition-colors md:hidden" />
                <Separator orientation="vertical" className="mr-2 h-6 md:hidden" />
                <Breadcrumb className="">
                    <BreadcrumbList className="text-[#E3B341]/90 font-medium text-md">
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-medium">
                                {service}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}

export default PanelTopbar