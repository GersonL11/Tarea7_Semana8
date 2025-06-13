import { Vehiculo } from "../models/Vehiculo.js";

// Crear un nuevo registro
export const crearVehiculo = async (req, res) => {
  try {
    const vehiculo = new Vehiculo(req.body);
    await vehiculo.save();
    res.status(201).json(vehiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los registros
export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro por ID
export const obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) return res.status(404).json({ error: "Vehiculo no encontrado" });
    res.json(vehiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un registro por ID
export const actualizarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehiculo) return res.status(404).json({ error: "Vehiculo no encontrado" });
    res.json(vehiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un registro por ID
export const eliminarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculo) return res.status(404).json({ error: "Vehiculo no encontrado" });
    res.json({ mensaje: "Vehiculo eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar registros de manera masiva
export const eliminarVehiculosMasivo = async (req, res) => {
  try {
    const result = await Vehiculo.deleteMany({});
    res.json({ mensaje: "Vehiculos eliminados", count: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar registros de manera masiva
export const agregarVehiculosMasivo = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.insertMany(req.body);
    res.status(201).json(vehiculos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
