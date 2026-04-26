export function capitalize(text: string): string {
  if (!text) return "";

  const firstLetter = text.charAt(0);
  const rest = text.slice(1);

  return firstLetter.toUpperCase() + rest;
}