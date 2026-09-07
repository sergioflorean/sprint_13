import fs from 'fs';
import path from 'path';
import { check, makeRequest, build, startServer, printResults, PROJECT_ROOT } from './utils.js';

async function main() {
  console.log('Lección 09 — Trabajando con sistemas de archivos\n');

  const results = [];

  // --- data/users.json ---
  const usersJsonPath = path.join(PROJECT_ROOT, 'data/users.json');
  const usersJsonExists = fs.existsSync(usersJsonPath);
  results.push(
    check(
      'data/users.json existe',
      usersJsonExists,
      'Crea una carpeta data/ en la raíz del proyecto y agrega dentro un archivo users.json con los datos de prueba.',
    ),
  );

  let fileUsers = null;
  if (usersJsonExists) {
    try {
      fileUsers = JSON.parse(fs.readFileSync(usersJsonPath, 'utf8'));
    } catch {
      fileUsers = null;
    }
  }

  results.push(
    check(
      'data/users.json contiene un arreglo JSON válido de usuarios',
      Array.isArray(fileUsers) &&
        fileUsers.length >= 1 &&
        fileUsers.every((u) => u && u.name !== undefined),
      'Asegúrate de que data/users.json sea un arreglo JSON válido, donde cada usuario tenga al menos un campo name.',
    ),
  );

  // --- src/controllers/users.ts ---
  const controllerPath = path.join(PROJECT_ROOT, 'src/controllers/users.ts');
  const controllerSrc = fs.existsSync(controllerPath)
    ? fs.readFileSync(controllerPath, 'utf8')
    : '';

  results.push(
    check(
      'src/controllers/users.ts existe',
      fs.existsSync(controllerPath),
      'Actualiza tu controlador de usuarios en src/controllers/users.ts.',
    ),
  );

  results.push(
    check(
      'el controlador construye una ruta absoluta hacia users.json',
      (controllerSrc.includes('import.meta.dirname') ||
        controllerSrc.includes('__dirname')) &&
        controllerSrc.includes('users.json') &&
        controllerSrc.includes('path.join'),
      'Usa path.join(import.meta.dirname, "../../data/users.json") para construir la ruta hacia el archivo.',
    ),
  );

  results.push(
    check(
      'el controlador lee el archivo con fs.readFile',
      controllerSrc.includes('readFile'),
      'Lee el archivo con await fs.readFile(usersPath, "utf8") dentro del controlador getUsers.',
    ),
  );

  build();

  const { server } = await startServer();

  try {
    const r1 = await makeRequest({ path: '/users', method: 'GET' });
    results.push(
      check(
        'GET /users devuelve 200 con datos JSON',
        r1.status === 200 && Array.isArray(r1.json),
        'Tu controlador getUsers debe leer el archivo, convertirlo con JSON.parse() y enviarlo con res.json().',
      ),
    );

    const returnsFileData =
      Array.isArray(r1.json) &&
      Array.isArray(fileUsers) &&
      r1.json.length === fileUsers.length &&
      r1.json[0]?.name === fileUsers[0]?.name;
    results.push(
      check(
        'GET /users devuelve los datos leídos desde data/users.json',
        returnsFileData,
        'La respuesta debe coincidir con el contenido de data/users.json — asegúrate de leer el archivo y no devolver datos estáticos.',
      ),
    );
  } finally {
    server.kill();
  }

  printResults(results, 'FSREAD');
}

main().catch((err) => {
  console.log('');
  console.log(`❌ Error del ejecutor de pruebas: ${err.message}`);
  console.log('');
  process.exit(1);
});
