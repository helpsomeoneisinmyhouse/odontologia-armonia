const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');
const rolsController = require('../controllers/rolController');
const userController = require('../controllers/userController');
const pacienteController = require('../controllers/pacienteController');
const citaCompletaController = require('../controllers/citaCompletaController')
const loginController = require('../controllers/loginController');

// Rutas para las citas
router.get('/citas', citasController.getCitas);
router.get('/citas/:id', citasController.getCitaById); // Nueva ruta para obtener una película por ID
router.post('/citas', citasController.createCita);
router.put('/citas/:id', citasController.updateCita);
router.delete('/citas/:id', citasController.deleteCita);

//rutas para los roles
router.get('/rols', rolsController.getRols);
router.get('/rols/:id', rolsController.getRolById); // Nueva ruta para obtener una película por ID
router.post('/rols', rolsController.createRol);
router.put('/rols/:id', rolsController.updateRol);
router.delete('/rols/:id', rolsController.deleteRol);

//ruta para los usuarios
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById); // Nueva ruta para obtener una película por ID
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

//ruta para login
router.post('/login', loginController.login);

//ruta para los pacientes
router.get('/pacientes', pacienteController.getPacientes);
router.get('/pacientes/:id', pacienteController.getPacienteById); // Nueva ruta para obtener una película por ID
router.post('/pacientes', pacienteController.createPaciente);
router.put('/pacientes/:id', pacienteController.updatePaciente);
router.delete('/pacientes/:id', pacienteController.deletePaciente);

// Rutas especiales
router.post('/citaCompleta', citaCompletaController.createCitaCompleta);
router.get('/citaCompleta', citaCompletaController.getCitasCompletas);
router.put('/citaCompletaStatus/:id', citaCompletaController.UpdateSatusCita);
router.put('/citaCompletaDate/:id', citaCompletaController.UpdateDateCita);
router.put('/citaCompletaLogic/:id', citaCompletaController.logicCita);

module.exports = router;
