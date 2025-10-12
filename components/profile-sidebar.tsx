"use client";
import Image from "next/image";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {
  Archive,
  Layers,
  Settings,
  HelpCircle,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavProjects } from "./nav-projects";
import appLogo from "@/public/icons/logo.svg"

const data = [
  {
    name: "Overview",
    url: "/profile",
    icon: Archive,
  },
  {
    name: "Buy Course",
    url: "/buy-course",
    icon: Layers,
  },
  {
    name: "Doubt Clearing",
    url: "/doubt-clearing",
    icon: HelpCircle,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    name: "Exam",
    url: "/exam",
    icon: BookOpen,
  },
  {
    name: "Certificates",
    url: "/certificates",
    icon: ShieldCheck,
  },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src={appLogo} alt="AlphaFusion Trademark" width={35} className="p-1 border rounded-sm" />

                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate font-medium">WahTabla</span>
                  <span className="truncate text-[10px]">Learning Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  );
};

export default ProfileSidebar;
