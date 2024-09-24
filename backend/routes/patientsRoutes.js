const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patientsController');

// Ruta para crear un nuevo paciente
router.post('/', PatientController.createPatient);

// Ruta para obtener un paciente por ID
router.get('/:id', PatientController.getPatientById);

// Ruta para actualizar un paciente por ID
router.put('/:id', PatientController.updatePatientById);

// Ruta para eliminar un paciente por ID
router.put('/delete/:id', PatientController.deletePatientById);

// Ruta para obtener todos los pacientes
router.get('/', PatientController.getAllPatients);

// Ruta para obtener un paciente por DNI
router.get('/dni/:dni', PatientController.getPatientByDNI);

module.exports = router;
