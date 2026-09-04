/**
 * Format a number as currency with the ৳ symbol.
 * Shows two decimal places only when the value has a fractional part.
 */
export function formatCurrency(value: number): string {
  const formatted = Number.isInteger(value)
    ? value.toString()
    : value.toFixed(2);
  return `৳${formatted}`;
}

/**
 * Format the current date and time for display / PDF.
 * Example: "04 Sep 2026, 11:30 PM"
 */
export function formatDateTime(date: Date): { dateStr: string; timeStr: string; combined: string } {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const timeStr = date
    .toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();

  const dateStr = `${day} ${month} ${year}`;
  const combined = `${dateStr}, ${timeStr}`;

  return { dateStr, timeStr, combined };
}
