"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, Star, Activity, Users, CalendarCheck, 
  BarChart3, Settings, GraduationCap, Heart, Palette, Dumbbell 
} from "lucide-react";
import { cn } from "@/lib/utils";

// 菜单配置：体现五育+管理的业务结构
const NAV_GROUPS = [
  {
    label: "五育综合评价",
    items: [
      { name: "评价看板", href: "/evaluation/dashboard", icon: BarChart3 },
      { name: "德育纪实", href: "/evaluation/moral", icon: Heart },
      { name: "智育学业", href: "/evaluation/intellectual", icon: BookOpen },
      { name: "体育健康", href: "/evaluation/physical", icon: Dumbbell },
      { name: "美育素养", href: "/evaluation/aesthetic", icon: Palette },
      { name: "劳育实践", href: "/evaluation/labor", icon: Activity },
    ],
  },
  {
    label: "学生日常管理",
    items: [
      { name: "学籍档案", href: "/management/students", icon: Users },
      { name: "考勤请假", href: "/management/attendance", icon: CalendarCheck },
      { name: "班级事务", href: "/management/class-affairs", icon: GraduationCap },
    ],
  },
  {
    label: "系统设置",
    items: [
      { name: "评价指标体系", href: "/settings/criteria", icon: Star },
      { name: "权限与账号", href: "/settings/users", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-between py-6">
      {/* Logo 区域 */}
      <div className="px-6 mb-6">
        <h1 className="text-xl font-bold text-indigo-600 tracking-tight">
          🎓 印记
        </h1>
        <p className="text-xs text-slate-500 mt-1">学生评价与管理平台</p>
      </div>

      {/* 导航列表 */}
      <nav className="flex-1 space-y-8 px-4 overflow-y-auto scrollbar-thin">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-x-3 rounded-md px-2 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-colors",
                          isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                        )}
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* 底部用户简略信息（可选） */}
      <div className="mt-auto border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-2">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            T
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-medium text-slate-900">张老师</p>
            <p className="truncate text-xs text-slate-500">高二(3)班班主任</p>
          </div>
        </div>
      </div>
    </div>
  );
}