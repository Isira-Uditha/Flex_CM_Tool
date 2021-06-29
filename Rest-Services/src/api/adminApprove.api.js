const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

module.exports = function () {
    router.patch('/approveConference/:id', controller.approveConference);
    router.get('/amountApprovedConference', controller.getAmountOfConferenceApproves);
    router.get('/amountRejectedConference', controller.getAmountOfConferenceReject);
    router.get('/amountPendingConference', controller.getAmountOfConferencePending);
    router.get('/amountApprovesResearches', controller.getAmountOfResearchApproves);
    // router.get('/amountRejectedResearches', controller.getAmountOfResearchRejected);
    // router.get('/summaryOfResearchesStatus', controller.summaryOfResearchesStatus);
    router.get('/amountRejectedResearches', controller.getAmountOfResearchRejected)
    router.get('/amountPendingResearches', controller.getAmountOfResearchPending);
    router.get('/amountApprovesWorkshops', controller.getAmountOfWorkshopApproves);
    router.get('/amountRejectedWorkshops', controller.getAmountOfWorkshopRejected);
    router.get('/amountPendingWorkshops', controller.getAmountOfWorkshopPending);
    router.get('/summaryOfUsers', controller.summaryOfUsers);
    return router;

}