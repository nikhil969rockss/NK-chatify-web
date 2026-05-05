function formatCreatedAtIntl(date: Date | string) {
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

const DATE_DAY = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

export const getMessageDay = (date: Date | string) => {
  const input = new Date(date);
  const now = new Date();

  // Reset time for accurate day diff
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfInput = new Date(
    input.getFullYear(),
    input.getMonth(),
    input.getDate(),
  );

  const diffInDays =
    (startOfToday.getTime() - startOfInput.getTime()) / (1000 * 60 * 60 * 24);

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays <= 7) return DATE_DAY[input.getDay()];

  if (input.getFullYear() === now.getFullYear()) {
    return input.toDateString().slice(0, 10);
  }

  return input.toDateString();
};

export default formatCreatedAtIntl;
