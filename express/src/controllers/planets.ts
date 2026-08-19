import type { RequestHandler } from "express";
import type { Planet } from "../types/planets.js";

import planets from "../data/planets.json" with { type: "json" };

export const getPlanets: RequestHandler = (req, res) => {
  try {
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPlanetById: RequestHandler<{ id: string }> = (req, res) => {
  try {
    const planetId = parseInt(req.params.id, 10);

    const planet = planets.find((p) => p.id === planetId);

    if (planet) {
      res.json(planet);
    } else {
      res.status(404).json({ message: "Planet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPlanet: RequestHandler = (req, res) => {
  try {
    const newPlanet: Planet = req.body;

    newPlanet.id = planets.length + 1;

    planets.push(newPlanet);

    res.status(201).json(newPlanet);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePlanet: RequestHandler<{ id: string }> = (req, res) => {
  try {
    const planetId = parseInt(req.params.id, 10);

    const planetIndex = planets.findIndex((p) => p.id === planetId);

    if (planetIndex !== -1) {
      const deletedPlanet = planets.splice(planetIndex, 1);

      res.json(deletedPlanet[0]);
    } else {
      res.status(404).json({ message: "Planet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getPlanets,
  getPlanetById,
  createPlanet,
  deletePlanet,
};