import { Schema, model } from "mongoose";

const planetSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  distanceFromSun: { type: Number, required: true },
});

const Planet = model("Planet", planetSchema);

export default Planet;