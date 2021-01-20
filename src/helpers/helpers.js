export function getFullDate(day, month, year) {
  const months = [];
  months[0] = "Janvier";
  months[1] = "Fevrier";
  months[2] = "Mars";
  months[3] = "Avril";
  months[4] = "Mai";
  months[5] = "Juin";
  months[6] = "Juillet";
  months[7] = "Août";
  months[8] = "Septembre";
  months[9] = "Octobre";
  months[10] = "Novembre";
  months[11] = "Decembre";

  return `${String(day).padStart(2, "0")} ${months[month]} ${year}`;
}
