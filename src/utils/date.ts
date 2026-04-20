import { days_of_week, months } from "./data";

export const getDateFormat = (date: string) => {

  const dateFormat = new Date(date + "T00:00:00");

  const mes = months[dateFormat.getMonth()];
  const dia = dateFormat.getDate();
  const anio = dateFormat.getFullYear();

  return `${mes} ${dia}, ${anio}`;
}

export const getFormatDateTime = (time: string) => {
  const now = new Date();

  // Separar hora y minutos
  const [hours, minutes] = time.split(":");

  // Crear nueva fecha con hora personalizada
  now.setHours(Number(hours));
  now.setMinutes(Number(minutes));
  now.setSeconds(0);

  // Formatear a yyyy-mm-dd HH:mm:ss
  return now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0") + " " +
    String(now.getHours()).padStart(2, "0") + ":" +
    String(now.getMinutes()).padStart(2, "0") + ":" +
    String(now.getSeconds()).padStart(2, "0");
}

export const getDayDate = (date: string) => {

  const dateFormat = new Date(date + "T00:00:00");
  const dia = dateFormat.getDay();

  return days_of_week[dia-1];
}

export const formatDateYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getFirstAndLastDayInMonth = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { firstDay: formatDateYYYYMMDD(firstDay), lastDay: formatDateYYYYMMDD(lastDay) };
}