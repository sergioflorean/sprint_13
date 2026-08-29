const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = __dirname;
const results = [];

function check(label, pass, hint) {
  results.push({ pass, label, hint });
  return pass;
}

// Check 1: package.json exists
const pkgPath = path.join(dir, 'package.json');
const hasPkg = check(
  'package.json existe',
  fs.existsSync(pkgPath),
  'Ejecuta "npm init -y" en la carpeta lesson-05.'
);

// Check 2: date-fns in dependencies (requires package.json)
let hasDep = false;
if (hasPkg) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  hasDep = check(
    'date-fns aparece en dependencies',
    Boolean(pkg.dependencies && pkg.dependencies['date-fns']),
    'Ejecuta: npm install date-fns'
  );
} else {
  check('date-fns aparece en dependencies', false, 'Crea primero package.json.');
}

// Check 3: node_modules installed
const hasModules = check(
  'node_modules/date-fns está instalado',
  fs.existsSync(path.join(dir, 'node_modules', 'date-fns')),
  'Ejecuta: npm install'
);

// Check 4: index.js output (requires node_modules)
let output = null;
let runError = null;
if (hasModules) {
  try {
    output = execSync('node index.js', { cwd: dir, stdio: 'pipe' }).toString().trim();
  } catch (e) {
    const lines = e.stderr ? e.stderr.toString().split('\n') : [];
    runError = lines.find(l => /^\w+Error:/.test(l.trim())) || e.message;
  }
}

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const validOutput = output !== null && datePattern.test(output);
check(
  'index.js muestra una fecha con el formato yyyy-MM-dd',
  validOutput,
  !hasModules
    ? 'Instala primero las dependencias.'
    : runError
    ? `index.js lanzó un error: ${runError}`
    : `Se obtuvo "${output}" — se esperaba una fecha como 2026-04-25.`
);

// Report
console.log('');
results.forEach(({ pass, label, hint }) => {
  console.log(`${pass ? '✅' : '❌'} ${label}`);
  if (!pass && hint) console.log(`   → ${hint}`);
});
console.log('');

const passed = results.filter(r => r.pass).length;
const allPassed = passed === results.length;
console.log(`${allPassed ? '🎉 ' : ''}${passed}/${results.length} verificaciones pasaron.`);

if (passed === results.length) {
  console.log('\nTu código de verificación: CNPXNTRF');
}
