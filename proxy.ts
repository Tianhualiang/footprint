export { auth as proxy } from "@/auth";

export const config = {
  //matcher: ["/dashboard:path*", "/behavior-records/:path*", "/login:path*"],
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
