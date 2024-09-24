const express = require('express');
const cors = require('cors');
const app = express();
const statusRoute = require('./routes/statusRoute');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const patientsRoutes = require('./routes/patientsRoutes');
const vaccinationRoutes = require('./routes/vaccinationRoutes'); 
const prescriptionRoutes = require('./routes/prescriptionRoutes');
// const path = require('path');

require('dotenv').config();

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

app.use(express.json());

// Registrar la ruta de estado "alive" en la ruta específica
app.use('/api/v1', statusRoute);

// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/patients', patientsRoutes);
app.use('/api/v1/vaccination',vaccinationRoutes)
app.use('/api/v1/prescriptions', prescriptionRoutes);

// Hacer accesible la carpeta 'uploads' (si es necesario)
app.use('/uploads', express.static('uploads'));

// Sirve el index.html para todas las rutas no especificadas después de las rutas de API (produccion)
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
