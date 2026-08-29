const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, 'package.json');
const results = [];

function check(label, condition, hint) {
  results.push({ pass: Boolean(condition), label, hint });
  return Boolean(condition);
}

let pkg;
try {
  pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
} catch {
  console.log('');
  console.log('❌ No se pudo parsear package.json — revisa si hay errores de sintaxis.');
  console.log('');
  process.exit(1);
}

check(
  '"scripts.start" tiene el valor "node index.js"',
  pkg.scripts && pkg.scripts.start === 'node index.js',
  'Añade un script "start" con el valor "node index.js".'
);

check(
  '"scripts.dev" tiene el valor "nodemon index.js"',
  pkg.scripts && pkg.scripts.dev === 'nodemon index.js',
  'Añade un script "dev" con el valor "nodemon index.js".'
);

check(
  'node_modules/nodemon está instalado',
  fs.existsSync(path.join(__dirname, 'node_modules', 'nodemon')),
  'Ejecuta: npm install'
);

console.log('');
results.forEach(({ pass, label, hint }) => {
  console.log(`${pass ? '✅' : '❌'} ${label}`);
  if (!pass && hint) console.log(`   → ${hint}`);
});
console.log('');

const passed = results.filter(r => r.pass).length;
const allPassed = passed === results.length;
console.log(`${allPassed ? '🎉 ' : ''}${passed}/${results.length} verificaciones pasaron.`);

if (allPassed) {
  console.log('\nTu código de verificación: FPEVCGF');
}
