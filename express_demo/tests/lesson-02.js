import fs from 'fs';
import path from 'path';
import { check, build, startServer, printResults, PROJECT_ROOT } from './utils.js';

async function main() {
  console.log('Lección 02 — Creando una aplicación Express\n');

  let pkg;
  try {
    pkg = JSON.parse(
      fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf8'),
    );
  } catch {
    console.log('');
    console.log(
      '❌ No se pudo leer package.json — ejecuta esta prueba desde la raíz de tu proyecto.',
    );
    console.log('');
    process.exit(1);
  }

  const results = [];

  // --- Configuración del proyecto y dependencias ---
  results.push(
    check(
      'package.json tiene "type": "module"',
      pkg.type === 'module',
      'Abre package.json y agrega o actualiza el campo "type": "module".',
    ),
  );

  results.push(
    check(
      'express está instalado',
      fs.existsSync(path.join(PROJECT_ROOT, 'node_modules/express')),
      'Ejecuta: npm install express',
    ),
  );

  results.push(
    check(
      'typescript está instalado',
      fs.existsSync(path.join(PROJECT_ROOT, 'node_modules/typescript')),
      'Ejecuta: npm install -D typescript @types/express @types/node',
    ),
  );

  results.push(
    check(
      '@types/express está instalado',
      fs.existsSync(path.join(PROJECT_ROOT, 'node_modules/@types/express')),
      'Ejecuta: npm install -D typescript @types/express @types/node',
    ),
  );

  results.push(
    check(
      '@types/node está instalado',
      fs.existsSync(path.join(PROJECT_ROOT, 'node_modules/@types/node')),
      'Ejecuta: npm install -D typescript @types/express @types/node',
    ),
  );

  results.push(
    check(
      'tsx está instalado',
      fs.existsSync(path.join(PROJECT_ROOT, 'node_modules/tsx')),
      'Ejecuta: npm install -D tsx',
    ),
  );

  // --- Configuración de TypeScript ---
  const tsconfigPath = path.join(PROJECT_ROOT, 'tsconfig.json');
  const tsconfigExists = fs.existsSync(tsconfigPath);
  results.push(
    check('tsconfig.json existe', tsconfigExists, 'Ejecuta: npx tsc --init'),
  );

  if (tsconfigExists) {
    const tsconfig = fs.readFileSync(tsconfigPath, 'utf8');
    results.push(
      check(
        'tsconfig.json define rootDir como "./src"',
        /"rootDir"\s*:\s*"\.\/src"/.test(tsconfig),
        'En tsconfig.json, descomenta y establece "rootDir": "./src".',
      ),
    );
    results.push(
      check(
        'tsconfig.json define outDir como "./dist"',
        /"outDir"\s*:\s*"\.\/dist"/.test(tsconfig),
        'En tsconfig.json, descomenta y establece "outDir": "./dist".',
      ),
    );
  }

  // --- src/index.ts ---
  const indexPath = path.join(PROJECT_ROOT, 'src/index.ts');
  const indexSrc = fs.existsSync(indexPath)
    ? fs.readFileSync(indexPath, 'utf8')
    : '';

  results.push(
    check(
      'src/index.ts existe',
      fs.existsSync(indexPath),
      'Crea el archivo src/index.ts con la configuración de tu servidor Express.',
    ),
  );

  results.push(
    check(
      'src/index.ts importa express',
      indexSrc.includes("import express from 'express'") ||
        indexSrc.includes('import express from "express"'),
      'Agrega: import express from "express";',
    ),
  );

  results.push(
    check(
      'src/index.ts crea una instancia de la aplicación Express',
      indexSrc.includes('express()'),
      'Agrega: const app = express();',
    ),
  );

  results.push(
    check(
      'src/index.ts llama a app.listen()',
      indexSrc.includes('app.listen('),
      'Llama a app.listen() en src/index.ts para iniciar el servidor.',
    ),
  );

  results.push(
    check(
      'app.listen() usa el puerto 3000',
      /app\.listen\(\s*(3000|port)/.test(indexSrc),
      'Pasa 3000 (o una variable con valor 3000) como primer argumento de app.listen().',
    ),
  );

  results.push(
    check(
      'el callback de app.listen() registra un mensaje de arranque',
      /app\.listen\([\s\S]*?(ejecut|running)[\s\S]*?\)/i.test(indexSrc),
      'Agrega un callback a app.listen() que llame a console.log() con un mensaje como "Servidor ejecutándose en el puerto 3000".',
    ),
  );

  // --- Scripts de package.json ---
  results.push(
    check(
      'el script "build" está configurado como "tsc"',
      pkg.scripts?.build === 'tsc',
      'Agrega "build": "tsc" a la sección scripts de package.json.',
    ),
  );

  results.push(
    check(
      'el script "start" está configurado como "node dist/index.js"',
      pkg.scripts?.start === 'node dist/index.js',
      'Agrega "start": "node dist/index.js" a la sección scripts de package.json.',
    ),
  );

  const devScript = pkg.scripts?.dev ?? '';
  results.push(
    check(
      'el script "dev" usa tsx con src/index.ts',
      devScript.includes('tsx') && devScript.includes('src/index.ts'),
      'Agrega "dev": "tsx watch src/index.ts" a la sección scripts de package.json.',
    ),
  );

  // --- .gitignore ---
  const gitignoreSrc = fs.existsSync(path.join(PROJECT_ROOT, '.gitignore'))
    ? fs.readFileSync(path.join(PROJECT_ROOT, '.gitignore'), 'utf8')
    : '';

  results.push(
    check(
      '.gitignore incluye node_modules',
      gitignoreSrc.includes('node_modules'),
      'Crea un archivo .gitignore que incluya "node_modules" en su propia línea.',
    ),
  );

  // --- Compilar y arrancar el servidor ---
  build();

  const { server } = await startServer();
  server.kill();

  results.push(
    check(
      'el servidor arranca y registra un mensaje de arranque',
      true,
      'Asegúrate de que app.listen() llame a console.log() con un mensaje de arranque.',
    ),
  );

  printResults(results, 'INSTALL');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Error del ejecutor de pruebas: ${err.message}`);
  console.log('');
  process.exit(1);
});
