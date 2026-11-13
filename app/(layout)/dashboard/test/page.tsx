import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

async function getUser(id: string | undefined = undefined) {
  const user = await prisma.user.findFirst({
    where: { id: id },
  });
  return user;
}

export default async function Test() {
  
  const session = await auth();
  const user = await getUser(session?.user?.id);
  
  return (
    <div>
      <h1>用户：{user?.name || "用户未找到"}</h1>
      <p>这是一个测试页面，显示用户角色：{user?.role || "角色未找到"}</p>
    </div>
  );
}