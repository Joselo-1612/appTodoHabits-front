import { months } from "./data";

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