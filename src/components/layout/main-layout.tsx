import React from "react";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/icons";
import { SidebarNav } from "./sidebar-nav";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" variant="sidebar" side="left">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-sidebar-foreground hover:text-sidebar-primary transition-colors">
              <AppLogo className="h-8 w-8" />
              <span className="group-data-[collapsible=icon]:hidden">Guardian AI</span>
            </Link>
            <div className="ml-auto group-data-[collapsible=icon]:hidden">
               <SidebarTrigger />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
          {/* Placeholder for user profile/settings */}
           <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-auto">
            <UserCircle className="h-6 w-6" />
            <span className="group-data-[collapsible=icon]:hidden">User Profile</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 lg:px-8">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <h1 className="text-xl font-semibold">Guardian AI</h1>
           {/* Placeholder for additional header content e.g. search or actions */}
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
