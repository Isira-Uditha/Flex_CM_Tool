const express = require('express');
const router = express.Router();
const reviewerController = require('../controllers/reviewer.controller');

module.exports = () => {

    router.get('/amountApprovesResearches', reviewerController.getAmountOfResearchApproves);
    router.get('/amountRejectedResearches', reviewerController.getAmountOfResearchRejected);
    router.get('/summaryOfResearchesStatus', reviewerController.summaryOfResearchesStatus);
    router.get('/amountPendingResearches', reviewerController.getAmountOfResearchPending);
    router.patch('/approveWorkshop/:id', reviewerController.approveWorkshopPaper);

    router.get('/amountApprovesWorkshops', reviewerController.getAmountOfWorkshopApproves);
    router.get('/amountRejectedWorkshops', reviewerController.getAmountOfWorkshopRejected);
    router.get('/amountPendingWorkshops', reviewerController.getAmountOfWorkshopPending);
    router.get('/summaryOfUsers', reviewerController.summaryOfUsers);

    return router;
}