const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

module.exports = function () {
    router.patch('/approveConference/:id', controller.approveConference);
    return router;

}