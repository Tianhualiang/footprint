import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// 全局单例防止开发环境连接数过多
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 创建适配器并传入 PrismaClient
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma