"use client";

import { useState } from "react";
import { 
  Search, Bell, Plus, ChevronDown, User, Settings, LogOut, Menu 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// 模拟当前数据范围（实际项目中应从全局状态或 Context 获取）
const CURRENT_SCOPE = {
  label: "高二(3)班",
  type: "班级",
};

export function TopNav() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* 1. 左侧：全局搜索框 */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="搜索学生、班级或功能... (Ctrl+K)"
          className={cn(
            "pl-10 transition-all bg-slate-50 border-slate-200",
            isSearchFocused && "bg-white border-indigo-300 ring-2 ring-indigo-100"
          )}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>

      {/* 2. 中间：数据范围指示器 (教育系统核心防呆设计) */}
      <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">
        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-xs font-medium text-indigo-700">
          当前视图：{CURRENT_SCOPE.label}
        </span>
        <Button variant="ghost" size="icon" className="h-5 w-5 p-0 text-indigo-400 hover:text-indigo-600">
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>

      {/* 3. 右侧：快捷操作与用户菜单 */}
      <div className="flex items-center gap-2">
        {/* 快捷录入按钮 (五育系统高频操作) */}
        <Button size="sm" className="hidden sm:inline-flex gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          <span>快捷评价</span>
        </Button>

        {/* 消息通知 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-500" />
              {/* 未读红点 */}
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>系统通知</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start cursor-pointer">
              <p className="text-sm font-medium">德育学分审核提醒</p>
              <p className="text-xs text-slate-500">有 3 条学生德育记录待您审核</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start cursor-pointer">
              <p className="text-sm font-medium">系统更新</p>
              <p className="text-xs text-slate-500">五育评价雷达图算法已升级</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 用户头像与设置菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9 border border-slate-200">
                <AvatarImage src="/avatars/teacher.png" alt="张老师" />
                <AvatarFallback className="bg-indigo-100 text-indigo-600">Z</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">张老师</p>
                <p className="text-xs leading-none text-muted-foreground">
                  zhanglaoshi@school.edu.cn
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>个人主页</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>系统设置</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}