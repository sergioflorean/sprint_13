const _ = require("lodash");
const chalk = require("chalk").default;

const users = [
  { name: "Alice", age: 28, role: "developer" },
  { name: "Bob", age: 34, role: "designer" },
  { name: "Charlie", age: 25, role: "developer" },
];

// Usa Lodash para encontrar todas las personas desarrolladoras
const developers = _.filter(users, { role: "developer" });

// Usa Lodash para calcular la edad promedio
const averageAge = _.meanBy(users, "age");

// Usa Chalk para imprimir texto con colores
console.log(chalk.blue.bold("\n=== Estadísticas de usuarios ==="));
console.log(chalk.green(`Total de usuarios: ${users.length}`));
console.log(chalk.green(`Edad promedio: ${averageAge.toFixed(1)}`));
console.log(chalk.yellow(`\nDesarrolladores:`));

developers.forEach((dev) => {
  console.log(chalk.cyan(`  - ${dev.name} (${dev.age} años)`));
});
