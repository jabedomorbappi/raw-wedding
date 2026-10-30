"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form
      action={formAction}
      className="w-full max-w-sm space-y-5 rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="text-center">
        <p className="font-serif text-2xl">RAW Weddings</p>
        <p className="mt-1 text-sm text-stone-500">Admin sign in</p>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-stone-600">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="username"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-stone-700"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-stone-600">Password</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-stone-700"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-stone-900 py-2.5 text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
