// Importa la función format desde date-fns.
// Úsala para mostrar la fecha de hoy con el formato 'yyyy-MM-dd'.
// Ejemplo de salida: 2026-04-24
//
// Pista: date-fns es compatible con CommonJS — usa require().
//   const { format } = require("date-fns");
const { format } = require("date-fns");
const today = new Date();
const formattedDate = format(today, "yyyy-MM-dd");
console.log(formattedDate);
