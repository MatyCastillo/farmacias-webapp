const express = require('express');
const app = require('./app');
const userRoutes = require('./routes/userRoutes');

// Configurar las rutas
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
