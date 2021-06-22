const express = require('express');
const router = express.Router();
const controller = require('../controllers/conference.controller');

module.exports = function () {
    router.post('/create', controller.createConference);
    router.patch('/update/:id', controller.updateConference);
    router.get('/', controller.getAllConference);
    router.get('/:id', controller.getConference);
    router.delete('/:id', controller.deleteConference);
    return router;
}

