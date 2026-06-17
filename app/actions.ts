"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, randomUUID } from "node:crypto";
import {
  createRegistration,
  savePaymentScreenshot,
  isPaymentStatus,
  updateRegistrationPaymentStatus
} from "@/lib/db";

const adminCookieName = "vmt26_admin";

function adminSessionValue(password: string) {
  return createHash("sha256").update(`vmt26:${password}`).digest("hex");
}

function requiredText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();

  if (!value) {
    throw new Error(`Missing required field: ${key}`);
  }

  return value;
}

export async function submitRegistration(formData: FormData) {
  const maimaiIgn = requiredText(formData, "maimaiIgn");
  const playerName = requiredText(formData, "playerName");
  const gmail = requiredText(formData, "gmail");
  const discordId = requiredText(formData, "discordId");
  const phoneNumber = requiredText(formData, "phoneNumber");
  const maimaiRatingValue = requiredText(formData, "maimaiRating");
  const maimaiRating = Number(maimaiRatingValue);

  if (!Number.isInteger(maimaiRating) || maimaiRating < 0) {
    redirect("/register?error=rating");
  }

  const registrationToken = randomUUID();

  await createRegistration({
    registrationToken,
    maimaiIgn,
    playerName,
    gmail,
    discordId,
    phoneNumber,
    maimaiRating
  });

  redirect(`/register/payment/${registrationToken}`);
}

export async function uploadPaymentScreenshot(formData: FormData) {
  const registrationToken = requiredText(formData, "registrationToken");
  const screenshot = formData.get("paymentScreenshot");

  if (
    !screenshot ||
    typeof screenshot !== "object" ||
    !("arrayBuffer" in screenshot) ||
    !("size" in screenshot) ||
    !("type" in screenshot)
  ) {
    redirect(`/register/payment/${registrationToken}?error=missing_file`);
  }

  const file = screenshot as File;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    redirect(`/register/payment/${registrationToken}?error=file_type`);
  }

  if (file.size <= 0 || file.size > maxSize) {
    redirect(`/register/payment/${registrationToken}?error=file_size`);
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const dataUrl = `data:${file.type};base64,${bytes.toString("base64")}`;

  await savePaymentScreenshot({
    registrationToken,
    dataUrl
  });

  redirect("/register/success");
}

export async function loginAdmin(formData: FormData) {
  const password = requiredText(formData, "password");
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword || password !== configuredPassword) {
    redirect("/admin?error=invalid");
  }

  const cookieStore = await cookies();

  cookieStore.set(adminCookieName, adminSessionValue(configuredPassword), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin"
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();

  cookieStore.set(adminCookieName, "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin"
  });
  redirect("/admin");
}

export async function updatePaymentStatus(formData: FormData) {
  const cookieStore = await cookies();
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const sessionPassword = cookieStore.get(adminCookieName)?.value;

  if (!configuredPassword || sessionPassword !== adminSessionValue(configuredPassword)) {
    redirect("/admin?error=expired");
  }

  const id = Number(formData.get("id"));
  const paymentStatus = String(formData.get("paymentStatus") ?? "");

  if (!Number.isInteger(id) || id <= 0 || !isPaymentStatus(paymentStatus)) {
    redirect("/admin?error=invalid_status");
  }

  await updateRegistrationPaymentStatus(id, paymentStatus);
  redirect("/admin");
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const sessionPassword = cookieStore.get(adminCookieName)?.value;

  return Boolean(
    configuredPassword && sessionPassword === adminSessionValue(configuredPassword)
  );
}
