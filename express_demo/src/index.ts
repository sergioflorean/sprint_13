import express from "express";

//configuración del servidor express
const app = express();
//puerto del servidor
const port = 3000;
//middlewares para parsear el body de las solicitudes
app.use(express.json());
//middleware para parsear datos codificados en URL
app.use(express.urlencoded({ extended: true }));





//rutas de usuarios
app.get("/users", (req, res) => {
  console.log("Solicitud GET /users recibida");

  res.status(200).send("GET /users request received");
});

//rutas usuario por ID
app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId;

    res.status(200).send(`id del usuario ${userId} request received`);
});

//rutas de posts de un usuario por ID
app.get("/users/:userId/posts/:postId", (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;

    res.status(200).send(`id del usuario ${userId}, id del post ${postId} request received`);
});

//rutas de posts filtrados por tag
app.get("/posts", (req, res) => {
    const tag = req.query.tag;

    res.status(200).send(`Posts with tag ${tag} request received`);
});

app.post("/posts", (req, res) => {
    console.log("Solicitud POST /posts recibida");

    const content = req.body.content;

    res.status(201).json({
        "message": "Publicación recibida",
        "content": content
    });
});



//rutas para crear un nuevo usuario

app.post("/users", (req, res) => {
  console.log("Solicitud POST /users recibida");

  res.status(201).send("POST /users request received");
});

//rutas para productos
app.get("/products", (req, res) => {
  console.log("Solicitud GET /products recibida");

  res.status(200).send("GET /products request received");
});

//rutas para profile

app.get("/profile", (req, res) => {
  console.log("Solicitud GET /profile recibida");

  res.status(200).json({
    username: "sergio",
    followers: 100,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});