import differenceInMonths from "date-fns/differenceInMonths";
import differenceInYears from "date-fns/differenceInYears";
import differenceInDays from "date-fns/differenceInDays";

import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

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
