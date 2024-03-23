export function getDayOfWeek(dateString: string | Date): string {
  const date = new Date(dateString);

  const daysOfWeek = [
    "domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "sábado",
  ];

  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
}
