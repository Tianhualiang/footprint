"use client";

import * as React from "react";

import { GalleryVerticalEnd } from "lucide-react";
import { NavUser } from "@/components/ui/nav-user";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "学生管理",
      url: "dashboard",
      items: [
        {
          title: "操行考评",
          url: "test",
        },
        {
          title: "行为记录",
          url: "#",
        },
        {
          title: "住宿管理",
          url: "#",
        },
      ],
    },
    {
      title: "班级管理",
      url: "#",
      items: [
        {
          title: "卫生评比",
          url: "#",
        },
        {
          title: "班级文化评比",
          url: "#",
          isActive: true,
        },
        {
          title: "学风评比",
          url: "#",
        },
      ],
    },
    {
      title: "活动管理",
      url: "#",
      items: [
        {
          title: "活动报名",
          url: "#",
        },
        {
          title: "评比结果",
          url: "#",
        },
      ],
    },
    {
      title: "系统管理",
      url: "#",
      items: [
        {
          title: "学生名单",
          url: "#",
        },
        {
          title: "教师名单",
          url: "#",
        },
        {
          title: "管理设置",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">学生工作管理平台</span>
                  <span className="">FOOTPRINT v0.1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
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
      <SidebarFooter>
        <NavUser
          user={{
            name: "陈宁",
            email: "chenning@example.com",
            avatar: "/avatars/chenning.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
