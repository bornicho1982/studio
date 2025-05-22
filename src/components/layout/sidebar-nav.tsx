"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BackpackIcon,
  SwordsIcon,
  DatabaseIcon,
  BrainCircuitIcon,
  CalendarDaysIcon,
  LayoutDashboardIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/inventory", label: "Inventory", icon: BackpackIcon },
  { href: "/loadouts", label: "Loadouts", icon: SwordsIcon },
  { href: "/item-db", label: "Item DB", icon: DatabaseIcon },
  { href: "/ai-optimizer", label: "AI Optimizer", icon: BrainCircuitIcon },
  { href: "/daily-activities", label: "Daily Activities", icon: CalendarDaysIcon },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <a> {/* Use <a> tag for proper semantics with legacyBehavior */}
                  <Icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
