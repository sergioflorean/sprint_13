import { check, makeRequest, build, startServer, printResults } from './utils.js';

async function main() {
  console.log('Lección 04 — Envío de respuestas\n');

  build();

  const { server } = await startServer();
  const results = [];

  try {
    const r1 = await makeRequest({ path: '/users', method: 'GET' });
    results.push(
      check(
        'GET /users devuelve 200',
        r1.status === 200,
        'Tu handler de GET /users debe llamar a res.send() con un argumento de texto.',
      ),
    );
    results.push(
      check(
        'GET /users envía una respuesta de texto plano (no JSON)',
        r1.json === null,
        'Usa res.send() para texto plano — res.json() envuelve el valor en JSON, que es más de lo que esta ruta necesita.',
      ),
    );

    const r2 = await makeRequest({ path: '/products', method: 'GET' });
    results.push(
      check(
        'GET /products devuelve 200',
        r2.status === 200,
        'Tu handler de GET /products debe llamar a res.send() con un argumento de texto.',
      ),
    );
    results.push(
      check(
        'GET /products envía una respuesta de texto plano (no JSON)',
        r2.json === null,
        'Usa res.send() para texto plano también en esta ruta.',
      ),
    );

    const r3 = await makeRequest({ path: '/users', method: 'POST' });
    results.push(
      check(
        'POST /users devuelve 201',
        r3.status === 201,
        'POST /users crea un recurso — usa res.status(201) antes de enviar la respuesta.',
      ),
    );

    const r4 = await makeRequest({ path: '/profile', method: 'GET' });
    results.push(
      check(
        'GET /profile devuelve JSON con los campos username y followers',
        r4.status === 200 &&
          r4.json?.username !== undefined &&
          r4.json?.followers !== undefined,
        'Tu handler de GET /profile debe usar res.json() para enviar un objeto con los campos username y followers.',
      ),
    );
  } finally {
    server.kill();
  }

  printResults(results, 'RESPONSES');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Error del ejecutor de pruebas: ${err.message}`);
  console.log('');
  process.exit(1);
});
