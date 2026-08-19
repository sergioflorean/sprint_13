const moons = [
  { id: 1, name: "Moon", planetId: 1 },
  { id: 2, name: "Phobos", planetId: 2 },
  { id: 3, name: "Deimos", planetId: 2 },
  { id: 4, name: "Europa", planetId: 3 },
  { id: 5, name: "Ganymede", planetId: 3 },
];

export default moons;

const getMoons = () => {
  return moons;
};

const getMoonById = (id: number) => {
  return moons.find(moon => moon.id === id);
};

const createMoon = (moon: { name: string; planetId: number }) => {
  const newMoon = { id: moons.length + 1, ...moon };
  moons.push(newMoon);
  return newMoon;
};

const deleteMoon = (id: number) => {
  const index = moons.findIndex(moon => moon.id === id);
  if (index !== -1) {
    const deletedMoon = moons.splice(index, 1);
    return deletedMoon[0];
  }
  return null;
};

export { getMoons, getMoonById, createMoon, deleteMoon };