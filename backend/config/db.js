import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";

dotenv.config();

export const db = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(colors.yellow(`MongoDB se conectó correctamente: ${url}`));
  } catch (error) {
    console.error(colors.red("No se ha podido conectar a la base de datos:"), error);
    process.exit(1);
  }
};
