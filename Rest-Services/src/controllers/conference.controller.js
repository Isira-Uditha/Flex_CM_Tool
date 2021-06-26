const Conference = require('../models/Conference.model');
const mongoose = require("mongoose");

const createConference = async (req, res) => {
    if (req.body) {
        console.log(req.body)
        const conference = new Conference(req.body);
        await conference.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                console.log(error.message);
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllConference = async (req, res) => {
    await Conference.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getConference = async (req, res) => {
    if (req.params && req.params.id) {
        await Conference.findById(req.params.id)
            .populate('conferences','title description')
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const updateConference = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //fetching the id of the post item
        const conference = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Category With That id'); //Validating the Conference id
        const updatedConference = await Conference.findByIdAndUpdate(id, conference,{new : true}); //Find and Update operation
        res.json(updatedConference);
    }
}

const deleteConference = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //fetching the id of the post item
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`); //Validating the post id

        await Conference.findByIdAndRemove(id); //Find and Remove operation

        res.json({message: "Conference deleted successfully."});
    }
}

const getConferenceForPost = async (req, res) => {
    console.log("xxxx")
    await Conference.find({status: "A"})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

module.exports = {
    createConference,
    updateConference,
    deleteConference,
    getAllConference,
    getConference,
    getConferenceForPost,
};