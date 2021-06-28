const express = require('express');
const router = express.Router();
const workshopController = require('../controllers/workshop.controller');

module.exports = () => {
    router.post('/create', workshopController.createWorkshop);
    router.get('/', workshopController.getAllWorkshop);
    router.get('/:id', workshopController.getWorkshop);
    router.patch('/update/:id', workshopController.updateWorkshop);
    router.get('/user/:id', workshopController.getUserWorkshop);
    router.delete('/delete/:id', workshopController.deleteWorkshop);
    return router;
}