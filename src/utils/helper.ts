export const formatDate = (date?: string | Date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};