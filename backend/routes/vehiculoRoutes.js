import express from "express";
import {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorId,
  actualizarVehiculo,
  eliminarVehiculo,
  eliminarVehiculosMasivo,
  agregarVehiculosMasivo
} from "../controllers/vehiculoController.js";

const router = express.Router();

router.post("/", crearVehiculo);
router.get("/", obtenerVehiculos);
router.get("/:id", obtenerVehiculoPorId);
router.put("/:id", actualizarVehiculo);
router.delete("/:id", eliminarVehiculo);
router.delete("/", eliminarVehiculosMasivo);
router.post("/masivo", agregarVehiculosMasivo);

export default router;
