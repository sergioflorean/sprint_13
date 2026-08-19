import { Router } from "express";
import { getPlanets, getPlanetById, createPlanet, deletePlanet } from "../controllers/planets.js";
const planetsRouter = Router();
const router = Router();

planetsRouter.get("/", getPlanets);
planetsRouter.get("/:id", getPlanetById);
planetsRouter.post("/", createPlanet);
planetsRouter.delete("/:id", deletePlanet);

export default planetsRouter;