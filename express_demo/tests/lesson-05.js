import { check, makeRequest, build, startServer, printResults } from './utils.js';

async function main() {
  console.log('Lección 05 — Rutas dinámicas\n');

  build();

  const { server } = await startServer();
  const results = [];

  try {
    const r1 = await makeRequest({ path: '/users/42', method: 'GET' });
    results.push(
      check(
        'GET /users/42 devuelve 200 e incluye el ID en la respuesta',
        r1.status === 200 && r1.body.includes('42'),
        'Define una ruta /users/:userId y envía req.params.userId en la respuesta.',
      ),
    );

    const r2 = await makeRequest({ path: '/users/5/posts/9', method: 'GET' });
    results.push(
      check(
        'GET /users/5/posts/9 devuelve 200 e incluye ambos IDs',
        r2.status === 200 && r2.body.includes('5') && r2.body.includes('9'),
        'Define una ruta /users/:userId/posts/:postId que lea y envíe ambos parámetros.',
      ),
    );

    const r3 = await makeRequest({ path: '/posts?tag=news', method: 'GET' });
    results.push(
      check(
        'GET /posts?tag=news devuelve 200 e incluye el valor del tag',
        r3.status === 200 && r3.body.includes('news'),
        'En tu ruta GET /posts, lee req.query.tag e inclúyelo en la respuesta.',
      ),
    );
  } finally {
    server.kill();
  }

  printResults(results, 'DYNAMIC');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Error del ejecutor de pruebas: ${err.message}`);
  console.log('');
  process.exit(1);
});
