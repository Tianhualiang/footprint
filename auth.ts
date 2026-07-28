import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // 1. 使用 Prisma 适配器，让 Auth.js 自动管理数据库中的 Account 和 Session 表
  adapter: PrismaAdapter(prisma),
  
  // 2. 配置认证方式（这里使用账号密码）
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      // 3. 授权逻辑：校验用户输入的账号密码是否正确
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        // 从数据库中查找用户
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })
        
        // 如果找不到用户，或者用户没有设置密码，直接返回 null（认证失败）
        if (!user || !user.password) return null
        
        // 比对前端传来的明文密码和数据库中加密后的密码
        const isMatch = await bcrypt.compare(credentials.password as string, user.password)
        
        // 密码匹配则返回用户对象，不匹配返回 null
        return isMatch ? user : null
      }
    })
  ],
  
  // 4. 使用 JWT 策略（无状态，性能更好，适合前后端分离或校园系统）
  session: { strategy: "jwt" },
  
  // 5. 核心回调函数：处理数据在 Token 和 Session 之间的流转
  callbacks: {
    // 【第一步：jwt 回调】
    // 触发时机：用户登录成功时，以及每次请求携带 Token 时
    async jwt({ token, user }) {
      // 如果是刚登录成功（user 对象存在），把数据库里的用户信息塞进 Token 里
      if (user) {
        token.id = user.id
        token.role = user.role // 把用户的角色（STUDENT/TEACHER/ADMIN）存入 Token
      }
      return token // 返回更新后的 Token
    },
    
    // 【第二步：session 回调】
    // 触发时机：前端调用 useSession() 或后端调用 auth() 时
    async session({ session, token }) {
      // 把 Token 里的数据提取出来，赋值给 session 对象，这样前端就能拿到了
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session // 返回更新后的 Session
    }
  },
  
  // 6. 自定义登录页面路径
  pages: {
    signIn: "/login",
  },
})