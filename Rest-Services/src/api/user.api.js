const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');


module.exports = function () {
    router.get('/', controller.getAllUsers);
    router.post('/login', controller.validateUser);
    router.post('/create', controller.createUser);
    router.get('/getUser/:id', controller.getUser);


    return router;
}