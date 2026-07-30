const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const MainRoutes = require('./routes/MainRoutes');

// Middleware
app.use(express.json()); // Para parsear JSON en las solicitudes
app.use(cors()); // Habilita CORS para todas las rutas

// Rutas
app.use('/api', MainRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
