const express = require('express');
const router = express.Router();

// Ruta para verificar el estado "alive" del servidor
router.get('/status', (req, res) => {
  res.json({ message: 'El servidor está vivo!' });
});

module.exports = router;
