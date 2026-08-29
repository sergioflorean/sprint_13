import * as math from "./math.mjs";
const { multiply, divide } = math;

if (typeof multiply !== "function") {
  console.log("multiply no se exporta desde math.mjs.");
  console.log("Asegúrate de definirla y de usar la palabra clave 'export'.");
  process.exit(1);
}

if (typeof divide !== "function") {
  console.log("divide no se exporta desde math.mjs.");
  console.log("Asegúrate de definirla y de usar la palabra clave 'export'.");
  process.exit(1);
}

const results = [];

function check(label, actual, expected) {
  const pass = Number.isNaN(expected)
    ? Number.isNaN(actual)
    : actual === expected;
  results.push({ pass, label, actual, expected });
}

check("multiply(3, 4) devuelve 12", multiply(3, 4), 12);
check("multiply(0, 5) devuelve 0", multiply(0, 5), 0);
check("multiply(-2, 6) devuelve -12", multiply(-2, 6), -12);
check("divide(10, 2) devuelve 5", divide(10, 2), 5);
check("divide(9, 3) devuelve 3", divide(9, 3), 3);
check("divide(5, 0) devuelve NaN", divide(5, 0), NaN);

console.log("");
results.forEach(({ pass, label, actual }) => {
  if (pass) {
    console.log(`✅ ${label}`);
  } else {
    console.log(`❌ ${label} — se obtuvo ${actual}`);
  }
});
console.log("");

const passed = results.filter((r) => r.pass).length;
const allPassed = passed === results.length;
console.log(
  `${allPassed ? "🎉 " : ""}${passed}/${results.length} tests pasaron.`,
);

if (passed === results.length) {
  console.log("\nTu código de verificación: ZBQHYRF");
}
