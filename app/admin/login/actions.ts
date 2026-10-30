"use server";

import { createSession, destroySession, verifyLogin } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(
  _previous: { error?: string },
  formData: FormData,
): Promise<{ error?: string }> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  const valid = await verifyLogin(email, password);
  if (!valid) return { error: "Wrong email or password." };

  await createSession(email);
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
