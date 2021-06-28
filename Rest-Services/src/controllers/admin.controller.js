const Conference = require('../models/Conference.model');
const mongoose = require("mongoose");

const approveConference = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //fetching the id of the post item
        const conference = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post With That id'); //Validating the Post id
        const approveConference = await Conference.findByIdAndUpdate(id, conference,{new : true}); //Find and Update operation
        res.json(approveConference);
    }
}

module.exports = {
    approveConference
}