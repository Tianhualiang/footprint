import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "五育综评与学生日常管理系统",
  description: "德智体美劳全面发展评价体系与校园日常管理一体化平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full bg-slate-50">
      <body className={`${inter.className} h-full antialiased text-slate-900`}>
        {/* 整体采用 Flex 布局，侧边栏固定，右侧自适应 */}
        <div className="flex h-full overflow-hidden">
          {/* 桌面端侧边栏 - 隐藏于移动端 */}
          <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
            <Sidebar />
          </aside>

          {/* 右侧主区域容器 */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* 顶部导航栏 */}
            <header className="flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 z-10">
              <TopNav />
            </header>

            {/* 主内容滚动区 */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="mx-auto max-w-7xl space-y-6">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}