
export const obtenerSemanaActual = () => {
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 = domingo, 6 = sábado

  // Domingo de la semana actual
  const inicioSemana = new Date(hoy);
  inicioSemana.setDate(hoy.getDate() - diaSemana);

  const semana = [];

  for (let i = 0; i < 7; i++) {
    const fecha = new Date(inicioSemana);
    fecha.setDate(inicioSemana.getDate() + i);

    const mes = meses[fecha.getMonth()];
    const dia = fecha.getDate();
    const anio = fecha.getFullYear();

    semana.push(`${mes} ${dia}, ${anio}`);
  }

  return semana;
}
