export function formatDate(date: string) {
  const currentDate = new Date();
  const targetDate = new Date(date);

  const diffTime = Math.abs(currentDate.getTime() - targetDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const yearsAgo = Math.floor(diffDays / 365);
  const monthsAgo = Math.floor(diffDays / 30);

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
