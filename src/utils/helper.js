export function formatDate(str) {
  const fixDate = new Date(str).toISOString();
  const date = new Date(str);
  return new Intl.DateTimeFormat("en-UD", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(fixDate);
}
