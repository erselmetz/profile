import profileData from "@/data/profile-data.json";

export type ProfileData = typeof profileData;

export const profile: ProfileData = profileData;

const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || profile.personal.website
).replace(/\/$/, "");
