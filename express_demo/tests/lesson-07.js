import fs from 'fs';
import path from 'path';
import { check, makeRequest, build, startServer, printResults, PROJECT_ROOT } from './utils.js';

async function main() {
  console.log('Lección 07 — Separación de responsabilidades\n');

  const results = [];

  const expectedFiles = [
    'src/controllers/users.ts',
    'src/controllers/posts.ts',
    'src/routes/users.ts',
    'src/routes/posts.ts',
    'src/routes/index.ts',
  ];

  for (const file of expectedFiles) {
    results.push(
      check(
        `${file} existe`,
        fs.existsSync(path.join(PROJECT_ROOT, file)),
        `Crea ${file} y mueve ahí el/los handler(s) correspondiente(s).`,
      ),
    );
  }

  const indexSrc = fs.existsSync(path.join(PROJECT_ROOT, 'src/index.ts'))
    ? fs.readFileSync(path.join(PROJECT_ROOT, 'src/index.ts'), 'utf8')
    : '';

  const hasInlineUsersRoute = /app\.(get|post)\(["']\/users["']/.test(indexSrc);
  results.push(
    check(
      'src/index.ts no tiene definiciones de rutas /users en línea',
      !hasInlineUsersRoute,
      'Elimina app.get("/users") y app.post("/users") de src/index.ts — ahora deben vivir en routes/users.ts.',
    ),
  );

  const hasInlinePostsRoute = /app\.(get|post)\(["']\/posts["']/.test(indexSrc);
  results.push(
    check(
      'src/index.ts no tiene definiciones de rutas /posts en línea',
      !hasInlinePostsRoute,
      'Elimina app.get("/posts") y app.post("/posts") de src/index.ts — ahora deben vivir en routes/posts.ts.',
    ),
  );

  build();

  const { server } = await startServer();

  try {
    const r1 = await makeRequest({ path: '/users', method: 'GET' });
    results.push(
      check(
        'GET /users sigue devolviendo 200',
        r1.status === 200,
        'Asegúrate de exportar getUsers desde controllers/users.ts y montarlo en routes/users.ts.',
      ),
    );

    const r2 = await makeRequest(
      { path: '/users', method: 'POST' },
      { name: 'Alice', email: 'alice@example.com' },
    );
    results.push(
      check(
        'POST /users sigue devolviendo 201',
        r2.status === 201,
        'Asegúrate de exportar createUser desde controllers/users.ts y montarlo en routes/users.ts.',
      ),
    );

    const r3 = await makeRequest(
      { path: '/posts', method: 'POST' },
      { content: 'Hola mundo' },
    );
    results.push(
      check(
        'POST /posts sigue devolviendo un estado de éxito',
        r3.status >= 200 && r3.status < 300,
        'Asegúrate de exportar createPost desde controllers/posts.ts y montarlo en routes/posts.ts.',
      ),
    );
    results.push(
      check(
        'la respuesta de POST /posts sigue conteniendo message y content',
        r3.json?.message === 'Publicación recibida' &&
          r3.json?.content === 'Hola mundo',
        'Asegúrate de que createPost lea req.body.content y responda con { message: "Publicación recibida", content }.',
      ),
    );
  } finally {
    server.kill();
  }

  printResults(results, 'MODELS');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Error del ejecutor de pruebas: ${err.message}`);
  console.log('');
  process.exit(1);
});
