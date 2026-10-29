export type DayOption = {
  iso: string;
  weekday: string;
  dayLabel: string;
  full: string;
};

export function nextDays(count = 5, from: Date = new Date()): DayOption[] {
  const out: DayOption[] = [];
  for (let i = 0; i < count; i += 1) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    const weekday = i === 0 ? "Today" : d.toLocaleDateString("en-GB", { weekday: "short" });
    const dayLabel = `${d.getDate()} ${d.toLocaleDateString("en-GB", { month: "short" })}`;
    out.push({
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      weekday,
      dayLabel,
      full: `${weekday}, ${dayLabel}`,
    });
  }
  return out;
}
