import fs from 'fs';
import path from 'path';
import { check, makeRequest, build, startServer, printResults, PROJECT_ROOT } from './utils.js';

async function main() {
  console.log('Lección 11 — Servir HTML y archivos estáticos\n');

  const results = [];

  results.push(
    check(
      'public/index.html existe',
      fs.existsSync(path.join(PROJECT_ROOT, 'public/index.html')),
      'Crea una carpeta public/ en la raíz de tu proyecto y agrega un archivo index.html.',
    ),
  );

  results.push(
    check(
      'public/style.css existe',
      fs.existsSync(path.join(PROJECT_ROOT, 'public/style.css')),
      'Agrega un archivo style.css a la carpeta public/.',
    ),
  );

  const indexSrc = fs.readFileSync(
    path.join(PROJECT_ROOT, 'src/index.ts'),
    'utf8',
  );

  results.push(
    check(
      'src/index.ts registra express.static',
      indexSrc.includes('express.static'),
      'Agrega app.use(express.static("public")) a src/index.ts antes del router.',
    ),
  );

  build();

  const { server } = await startServer();

  try {
    const r1 = await makeRequest({ path: '/' });
    results.push(
      check(
        'GET / sirve el archivo HTML',
        r1.status === 200 && r1.body.includes('<h1>'),
        'Asegúrate de registrar express.static("public") y de que exista public/index.html.',
      ),
    );

    const r2 = await makeRequest({ path: '/style.css' });
    results.push(
      check(
        'GET /style.css sirve el archivo CSS',
        r2.status === 200 && r2.body.includes('font-family'),
        'Asegúrate de que exista public/style.css y de que express.static esté registrado.',
      ),
    );
  } finally {
    server.kill();
  }

  printResults(results, 'STATIC');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Error del ejecutor de pruebas: ${err.message}`);
  console.log('');
  process.exit(1);
});
