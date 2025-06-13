import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
    trim: true
  },
  modelo: {
    type: String,
    required: true,
    trim: true
  },
  anio: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  tipo: {
    type: String,
    required: true,
    trim: true
  },
  precio: {
    type: Number,
    required: true
  }
});

export const Vehiculo = mongoose.model("Vehiculo", vehiculoSchema);