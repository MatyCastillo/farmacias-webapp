const express = require('express');
const router = express.Router();
const VaccinationController = require('../controllers/vaccinationController');

// Crear una nueva vacunación
router.post('/', VaccinationController.createVaccination);

// Obtener todas las vacunaciones
router.get('/', VaccinationController.getAllVaccinations);

// Obtener todas las vacunaciones de un paciente
router.get('/:patient_id', VaccinationController.getVaccinationsByPatientId);

// Eliminar una vacunación por ID
router.delete('/:id', VaccinationController.deleteVaccinationById);

module.exports = router;
