function formatCreatedAtIntl(date: Date) {
  const d = date instanceof Date ? date : new Date(date);

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const timeStampOnly = formatter.format(d).slice(11);
  return timeStampOnly;
}

// Output: "10/25/2023, 3:30 PM"

export default formatCreatedAtIntl;
