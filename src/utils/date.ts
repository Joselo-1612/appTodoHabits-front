import { months } from "./data";

export const getWeekCurrent = () => {

  const week = [];
  const today = new Date();
  const dayWeek = today.getDay(); // 0 = domingo, 6 = sábado

  // Domingo de la semana actual
  const startWeek = new Date(today);
  startWeek.setDate(today.getDate() - dayWeek);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startWeek);

    date.setDate(startWeek.getDate() + i);
    week.push(date);
  }

  return week;
}

export const getDateFormat = (date: Date) => {

  const mes = months[date.getMonth()];
  const dia = date.getDate();
  const anio = date.getFullYear();

  return `${mes} ${dia}, ${anio}`;
}