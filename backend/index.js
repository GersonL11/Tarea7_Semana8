import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { db } from './config/db.js'
import colors from 'colors'
import vehiculoRoutes from './routes/vehiculoRoutes.js'
import cors from 'cors' 

//Configuracion de la app
const app = express()

app.use(cors()) // Permite solicitudes de diferentes orígenes
app.use(express.json()) 

//Conectar a la base de datos
db()

//Definicion del Puerto
const PORT = process.env.PORT || 4000

// Usar las rutas de vehiculo
app.use('/api/vehiculos', vehiculoRoutes);

//Ejecutar la app
app.listen(PORT, () =>{
    console.log(colors.cyan('El Servidor se Esta Ejecutado, Puerto: ', PORT))
})