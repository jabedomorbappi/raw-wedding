"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function saveContent(
  key: string,
  json: string,
): Promise<{ ok: boolean; message: string }> {
  const session = await getSession();
  if (!session) return { ok: false, message: "You are not signed in." };

  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return {
      ok: false,
      message: "That is not valid JSON. Check the commas and quotes.",
    };
  }

  try {
    await prisma.siteContent.update({
      where: { key },
      data: { data: data as Prisma.InputJsonValue },
    });
  } catch {
    return { ok: false, message: "Could not save. Please try again." };
  }

  revalidatePath("/");
  return { ok: true, message: "Saved. The website is updated." };
}
