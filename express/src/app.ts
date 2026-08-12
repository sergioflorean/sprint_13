import express from "express";

const app = express();
app.use(express.json());

const planets = [
  { id: 1, name: "Mercury", distanceFromSun: 57.9 },
  { id: 2, name: "Venus", distanceFromSun: 108.2 },
  { id: 3, name: "Earth", distanceFromSun: 149.6 },
  { id: 4, name: "Mars", distanceFromSun: 227.9 },
  { id: 5, name: "Jupiter", distanceFromSun: 778.3 },
  { id: 6, name: "Saturn", distanceFromSun: 1427 },
  { id: 7, name: "Uranus", distanceFromSun: 2871 },
  { id: 8, name: "Neptune", distanceFromSun: 4497 }
];

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
  ]);
});

app.get("/planets", (req, res) => {
  res.json(planets);
});

app.get("/planets/:id", (req, res) => {
  const planetId = parseInt(req.params.id, 10);
  const planet = planets.find(p => p.id === planetId);
  if (planet) {
    res.json(planet);
  } else {
    res.status(404).json({ message: "Planet not found" });
  }
});


app.post("/planets", (req, res) => {
  const newPlanet = req.body;
  newPlanet.id = planets.length + 1;
    planets.push(newPlanet);
    res.status(201).json(newPlanet);
});

app.delete("/planets/:id", (req, res) => {
    const planetId = parseInt(req.params.id, 10);
    const planetIndex = planets.findIndex(p => p.id === planetId);
    if (planetIndex !== -1) {
        const deletedPlanet = planets.splice(planetIndex, 1);
        res.json(deletedPlanet[0]);
    } else {
        res.status(404).json({ message: "Planet not found" });
    }
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
})