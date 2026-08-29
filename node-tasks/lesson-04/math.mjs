// Añade una función multiply(a, b) que devuelva el producto de a y b.
// Añade una función divide(a, b) que devuelva a dividido entre b. Si b es 0, devuelve NaN.
// Exporta ambas funciones usando la sintaxis de ES modules (export).

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return NaN;
  } else {
    return a / b;
  }
}

export { multiply, divide };
