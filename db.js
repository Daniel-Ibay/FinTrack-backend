const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Conectado");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    process.exit(1); // Detener el servidor en caso de fallo
  }
};

module.exports = connectDB;