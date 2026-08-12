import express from "express";
const app = express();
const planets = [
    { name: "Mercury", distanceFromSun: 57.9 },
    { name: "Venus", distanceFromSun: 108.2 },
    { name: "Earth", distanceFromSun: 149.6 },
    { name: "Mars", distanceFromSun: 227.9 },
    { name: "Jupiter", distanceFromSun: 778.3 },
    { name: "Saturn", distanceFromSun: 1427 },
    { name: "Uranus", distanceFromSun: 2871 },
    { name: "Neptune", distanceFromSun: 4497 }
];
app.get("/planets", (req, res) => {
    res.json(planets);
});
app.get("/planets/:id", (req, res) => {
    const planetId = parseInt(req.params.id, 10);
    const planet = planets[planetId];
    if (planet) {
        res.json(planet);
    }
    else {
        res.status(404).json({ message: "Planet not found" });
    }
});
app.get("/", (req, res) => {
    res.json({ "message": "Hello World" });
});
app.get("/planeta", (req, res) => {
    res.json({ "message": "Hello World, I'm on planet Earth" });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=app.js.map