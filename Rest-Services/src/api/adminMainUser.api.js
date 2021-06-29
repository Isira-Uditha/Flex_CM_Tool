const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminMainUser.controller');

module.exports = function () {
    router.post('/createMainUser', controller.createMainUser);
    // router.get('/getUser/:id', controller.getUser);
    // router.patch('/updateUser/:id', controller.updateUser);

    return router;
}