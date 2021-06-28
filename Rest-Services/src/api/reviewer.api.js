const express = require('express');
const router = express.Router();
const reviewerController = require('../controllers/reviewer.controller');

module.exports = () => {

    router.get('/amountApprovesResearches', reviewerController.getAmountOfResearchApproves);
    router.get('/amountRejectedResearches', reviewerController.getAmountOfResearchRejected);
    router.get('/summaryOfResearchesStatus', reviewerController.summaryOfResearchesStatus);
    router.patch('/approveWorkshop/:id', reviewerController.approveWorkshopPaper);

    return router;
}