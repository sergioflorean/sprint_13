import fs from 'fs';
import path from 'path';
import { check, build, startServer, printResults, PROJECT_ROOT } from './utils.js';

async function main() {
  console.log('Lección 03 — Enrutamiento de solicitudes\n');

  const indexPath = path.join(PROJECT_ROOT, 'src/index.ts');
  const src = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : '';

  const results = [];

  results.push(
    check(
      'src/index.ts existe',
      fs.existsSync(indexPath),
      'Crea src/index.ts con la configuración de tu servidor Express.',
    ),
  );

  results.push(
    check(
      'la ruta GET /users está definida',
      src.includes("app.get('/users'") || src.includes('app.get("/users"'),
      'Agrega app.get("/users", ...) a tu index.ts.',
    ),
  );

  results.push(
    check(
      'la ruta GET /products está definida',
      src.includes("app.get('/products'") ||
        src.includes('app.get("/products"'),
      'Agrega app.get("/products", ...) a tu index.ts.',
    ),
  );

  results.push(
    check(
      'la ruta POST /users está definida',
      src.includes("app.post('/users'") || src.includes('app.post("/users"'),
      'Agrega app.post("/users", ...) a tu index.ts.',
    ),
  );

  build();

  const { server } = await startServer();
  server.kill();

  results.push(
    check(
      'el servidor arranca y escucha en el puerto 3000',
      true,
      'Asegúrate de que tu servidor llame a app.listen(3000, ...).',
    ),
  );

  printResults(results, 'ROUTES');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Error del ejecutor de pruebas: ${err.message}`);
  console.log('');
  process.exit(1);
});
