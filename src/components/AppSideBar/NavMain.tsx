"use client";
import React, {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  SVGProps,
} from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Clock } from "geist-icons";
import { LucideProps } from "lucide-react";

type Props = {
  items: {
    title: string;
    url: string;
    icon:
      | SVGProps<SVGAElement>
      | ForwardRefExoticComponent<
          Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
        > | ReactNode | Element;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
};

const NavMain = ({ items }: Props) => {
  const pathName = usePathname();
  return (
    <SidebarGroup className="p-0">
      <SidebarMenu className="gap-y-4 p-0">
        {items.map((item, idx) => {
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={` py-6 ${
                  pathName.includes(item.url) && "bg-sidebar-accent"
                }`}
              >
                <Link
                  href={item.url}
                  className={`text-lg ${
                    pathName.includes(item.url) && "font-bold"
                  }`}
                >
                  <Clock className="text-lg" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
