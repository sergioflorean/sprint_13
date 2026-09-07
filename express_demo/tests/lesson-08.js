import fs from 'fs';
import path from 'path';
import { check, makeRequest, build, startServer, printResults, PROJECT_ROOT } from './utils.js';

async function main() {
  console.log('Lección 08 — Middleware\n');

  const results = [];

  const loggerPath = path.join(PROJECT_ROOT, 'src/middleware/logger.ts');
  results.push(
    check(
      'src/middleware/logger.ts existe',
      fs.existsSync(loggerPath),
      'Crea src/middleware/logger.ts con una función logRequest.',
    ),
  );

  const loggerSrc = fs.existsSync(loggerPath)
    ? fs.readFileSync(loggerPath, 'utf8')
    : '';

  results.push(
    check(
      'logger.ts llama a next()',
      loggerSrc.includes('next()'),
      'Tu middleware logRequest debe llamar a next() para pasar el control al route handler.',
    ),
  );

  const indexSrc = fs.readFileSync(
    path.join(PROJECT_ROOT, 'src/index.ts'),
    'utf8',
  );

  results.push(
    check(
      'src/index.ts importa desde middleware/logger',
      indexSrc.includes('middleware/logger'),
      'Importa logRequest desde ./middleware/logger.js en src/index.ts.',
    ),
  );

  results.push(
    check(
      'src/index.ts registra el logger con app.use()',
      indexSrc.includes('app.use(logRequest)'),
      'Registra el middleware con app.use(logRequest) antes de tu router.',
    ),
  );

  build();

  const { server, getOutput } = await startServer();
  const outputBefore = getOutput();

  try {
    const r1 = await makeRequest({ path: '/users', method: 'GET' });
    await new Promise((resolve) => setTimeout(resolve, 150));

    const newOutput = getOutput().slice(outputBefore.length);
    results.push(
      check(
        'el middleware registra las solicitudes en la consola',
        newOutput.includes('GET') && newOutput.includes('/users'),
        'Asegúrate de que logRequest llame a console.log() con req.method y req.path, y que esté registrado antes del router.',
      ),
    );

    results.push(
      check(
        'GET /users sigue devolviendo 200 después de agregar el middleware',
        r1.status === 200,
        'Asegúrate de que logRequest llame a next() para que el route handler siga ejecutándose.',
      ),
    );
  } finally {
    server.kill();
  }

  printResults(results, 'LOGGER');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Error del ejecutor de pruebas: ${err.message}`);
  console.log('');
  process.exit(1);
});
