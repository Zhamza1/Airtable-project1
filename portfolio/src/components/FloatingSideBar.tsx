import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface sideBarItem {
  title: string;
  url: string;
  items?: sideBarItem[];
  isActive?: boolean;
}

interface floatingSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: sideBarItem[];
}
export function FloatingSidebar({ data, ...props }: floatingSidebarProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    data.forEach((item) => {
      if (item.url === pathname) {
        item.isActive = true;
      }
      if (item.items) {
        item.items.forEach((subItem) => {
          if (subItem.url === pathname) {
            subItem.isActive = true;
          }
        });
      }
    });
  }, [pathname]);

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
