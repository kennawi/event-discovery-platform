export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatPrice = (price: number | "free") => {
  return price === "free" ? "Free" : `$${price}`;
};

/**
 * Formats a date with full weekday, month, day, and year
 */
export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

/**
 * Formats time in 12-hour format
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

/**
 * Formats a date range for display
 */
export const formatDateRange = (
  startDate: string,
  endDate?: string
): { date: string; time: string; endTime: string | null } => {
  const formattedDate = formatEventDate(startDate);
  const formattedTime = formatTime(startDate);
  const formattedEndTime = endDate ? formatTime(endDate) : null;

  return {
    date: formattedDate,
    time: formattedTime,
    endTime: formattedEndTime,
  };
};
