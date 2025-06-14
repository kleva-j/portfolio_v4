import differenceInMonths from "date-fns/differenceInMonths";
import differenceInYears from "date-fns/differenceInYears";
import differenceInDays from "date-fns/differenceInDays";

import { Children, isValidElement } from "react";
import { twMerge } from "tailwind-merge";

import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const currentDate = new Date();
  const targetDate = new Date(date);

  const monthsAgo = differenceInMonths(currentDate, targetDate);
  const yearsAgo = differenceInYears(currentDate, targetDate);
  const diffDays = differenceInDays(currentDate, targetDate);

  const formattedDate =
    yearsAgo > 0
      ? `${yearsAgo}y ago`
      : monthsAgo > 0
      ? `${monthsAgo}mo ago`
      : diffDays > 0
      ? `${diffDays}d ago`
      : "Today";

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

export const DeploymentUrl = (() => {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
  const url = isProduction
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!url) {
    throw new Error(
      `Missing required environment variable: ${
        isProduction ? "NEXT_PUBLIC_VERCEL_URL" : "NEXT_PUBLIC_SITE_URL"
      }`
    );
  }

  return url;
})();

export function extractValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter(isValidElement);
}
