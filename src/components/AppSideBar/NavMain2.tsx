import { data } from "@/lib/constants";
import React from "react";
import { SidebarLink, useSidebar } from "../CustomSideBar";
import { LucideProps } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<LucideProps>;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
};

const NavMain2 = ({ items }: Props) => {
    const {open} = useSidebar();
    const pathName = usePathname();
  return (
    <div className={`flex flex-col ${!open&& 'items-center'} gap-y-4 mt-6 w-full`}>
      {items.map((item, idx) => {
        const IconComponent = item.icon; 
        return (
          <SidebarLink
            key={item.label}
            className={`${open?'p-4':'p-2 rounded-full'} ${pathName.includes(item.href) && "bg-sidebar-accent"} rounded-xl hover:bg-sidebar-accent`}
            link={{
              label: item.label,
              href: item.href,
              icon: <IconComponent />,
            }}
          />
        );
      })}
    </div>
  );
};

export default NavMain2;
