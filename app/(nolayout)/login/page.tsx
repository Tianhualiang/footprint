'use client';

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

export default function Login() {
  const [errorMessage, dispatch, isPending] = useActionState(authenticate,undefined);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">登录</h1>
        <form action={dispatch}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-2 block font-semibold text-gray-700"
            >
              用户名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="输入你的用户名"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block font-semibold text-gray-700"
            >
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="输入你的密码"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <input type="hidden" name="redirectTo" value="/dashboard" />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            {isPending ? "登录中..." : "登录"}
          </button>
        </form>
      </div>
    </div>
  );
}