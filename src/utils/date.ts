import { months } from "./data";

export const getDateFormat = (date: string) => {

  const dateFormat = new Date(date + "T00:00:00");

  const mes = months[dateFormat.getMonth()];
  const dia = dateFormat.getDate();
  const anio = dateFormat.getFullYear();

  return `${mes} ${dia}, ${anio}`;
}