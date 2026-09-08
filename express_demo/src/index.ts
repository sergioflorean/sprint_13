import express from "express";
import { getPosts, createPost } from "./controllers/posts.js";
import routes from "./routes/index.js";

//configuración del servidor express
const app = express();
//puerto del servidor
const port = 3000;
//middlewares para parsear el body de las solicitudes
app.use(express.json());
//middleware para parsear datos codificados en URL
app.use(express.urlencoded({ extended: true }));










//PRODUCT
//rutas para productos
app.get("/products", (req, res) => {
  console.log("Solicitud GET /products recibida");

  res.status(200).send("GET /products request received");
});


//PROFILE
//rutas para profile

app.get("/profile", (req, res) => {
  console.log("Solicitud GET /profile recibida");

  res.status(200).json({
    username: "sergio",
    followers: 100,
  });
});


app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});