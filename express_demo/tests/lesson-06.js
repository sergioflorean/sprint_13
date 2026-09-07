import { check, makeRequest, build, startServer, printResults } from './utils.js';

async function main() {
  console.log('Lección 06 — Parseando el cuerpo de la solicitud\n');

  build();

  const { server } = await startServer();
  const results = [];

  try {
    const r1 = await makeRequest(
      { path: '/posts', method: 'POST' },
      { content: 'Hola mundo' },
    );
    results.push(
      check(
        'POST /posts devuelve un estado de éxito',
        r1.status >= 200 && r1.status < 300,
        'Tu ruta POST /posts debe responder con un código de estado de éxito.',
      ),
    );
    results.push(
      check(
        'la respuesta de POST /posts contiene message: "Publicación recibida"',
        r1.json?.message === 'Publicación recibida',
        'Responde con { message: "Publicación recibida", content: ... }. Asegúrate de registrar express.json() antes de tus rutas.',
      ),
    );
    results.push(
      check(
        'la respuesta de POST /posts devuelve el content del cuerpo de la solicitud',
        r1.json?.content === 'Hola mundo',
        'Lee req.body.content e inclúyelo en la respuesta como content.',
      ),
    );
  } finally {
    server.kill();
  }

  printResults(results, 'PARSING');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Error del ejecutor de pruebas: ${err.message}`);
  console.log('');
  process.exit(1);
});
