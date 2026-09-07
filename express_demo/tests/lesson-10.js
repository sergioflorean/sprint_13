import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { check, printResults, PROJECT_ROOT } from './utils.js';

console.log('Lección 10 — Configurar un linter\n');

const pkg = JSON.parse(
  fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf8'),
);
const devDeps = pkg.devDependencies || {};

const results = [];

results.push(
  check(
    'eslint está instalado',
    'eslint' in devDeps,
    'Ejecuta: npm install --save-dev eslint @eslint/js typescript-eslint',
  ),
);

results.push(
  check(
    '@eslint/js está instalado',
    '@eslint/js' in devDeps,
    'Ejecuta: npm install --save-dev eslint @eslint/js typescript-eslint',
  ),
);

results.push(
  check(
    'typescript-eslint está instalado',
    'typescript-eslint' in devDeps,
    'Ejecuta: npm install --save-dev eslint @eslint/js typescript-eslint',
  ),
);

results.push(
  check(
    'prettier está instalado',
    'prettier' in devDeps,
    'Ejecuta: npm install -D prettier eslint-config-prettier',
  ),
);

results.push(
  check(
    'eslint-config-prettier está instalado',
    'eslint-config-prettier' in devDeps,
    'Ejecuta: npm install -D prettier eslint-config-prettier',
  ),
);

results.push(
  check(
    'el script "lint" existe en package.json',
    typeof pkg.scripts?.lint === 'string',
    'Agrega "lint": "eslint src/" a la sección scripts de package.json.',
  ),
);

results.push(
  check(
    'eslint.config.js existe',
    fs.existsSync(path.join(PROJECT_ROOT, 'eslint.config.js')),
    'Crea eslint.config.js en la raíz de tu proyecto.',
  ),
);

results.push(
  check(
    '.prettierrc existe',
    fs.existsSync(path.join(PROJECT_ROOT, '.prettierrc')),
    'Crea .prettierrc en la raíz de tu proyecto.',
  ),
);

const eslintConfigSrc = fs.existsSync(path.join(PROJECT_ROOT, 'eslint.config.js'))
  ? fs.readFileSync(path.join(PROJECT_ROOT, 'eslint.config.js'), 'utf8')
  : '';

results.push(
  check(
    'eslint.config.js integra eslint-config-prettier',
    eslintConfigSrc.includes('eslint-config-prettier'),
    'Importa y agrega prettierConfig a eslint.config.js para desactivar las reglas que entran en conflicto con Prettier.',
  ),
);

results.push(
  check(
    'eslint.config.js ignora la carpeta dist/',
    eslintConfigSrc.includes('ignores') && eslintConfigSrc.includes('dist'),
    'Agrega { ignores: ["dist/", "node_modules/"] } como primer elemento del arreglo en eslint.config.js.',
  ),
);

results.push(
  check(
    'eslint.config.js define la regla no-underscore-dangle que permite _id',
    eslintConfigSrc.includes('no-underscore-dangle') &&
      eslintConfigSrc.includes('_id'),
    'Agrega "no-underscore-dangle": ["error", { "allow": ["_id"] }] al objeto rules.',
  ),
);

results.push(
  check(
    'eslint.config.js define la regla no-console que permite warn y error',
    eslintConfigSrc.includes('no-console') &&
      eslintConfigSrc.includes('allow') &&
      (eslintConfigSrc.includes("'warn'") ||
        eslintConfigSrc.includes('"warn"')) &&
      (eslintConfigSrc.includes("'error'") ||
        eslintConfigSrc.includes('"error"')),
    'Configura no-console con: ["warn", { allow: ["warn", "error"] }]',
  ),
);

// Con no-console en 'warn', eslint termina con código 0 aunque haya advertencias.
let lintPassed = false;
try {
  execSync('npm run lint', { cwd: PROJECT_ROOT, stdio: 'pipe' });
  lintPassed = true;
} catch {
  // lintPassed queda en false
}

results.push(
  check(
    'npm run lint termina sin errores',
    lintPassed,
    "Asegúrate de que no-console esté en 'warn' y no en 'error', y de resolver el resto de los errores de lint.",
  ),
);

printResults(results, 'LINTED');
