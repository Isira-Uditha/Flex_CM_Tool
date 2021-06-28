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
        console.log(conference)
        console.log(id)

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Category With That id'); //Validating the Conference id
        const updatedConference = await Conference.findByIdAndUpdate(id, conference,{new : true}); //Find and Update operation
        res.json(updatedConference);
    }
}

const updatePost = async (req, res) => {
    if (req.params && req.params.id) {
        const id = req.params.id; //fetching the id of the post item
        const post = await Conference.find({post_status : "1"});
        const previousId = post[0]._id;

        console.log("previous", previousId)
        console.log("id", id)
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Category With That id'); //Validating the Conference id
        const updatedFormerPost = await Conference.findByIdAndUpdate(previousId, {post_status: "0"},{new : true});
        const updatedPost = await Conference.findByIdAndUpdate(id, {post_status: "1"},{new : true});
        res.status(200).send({ data : updatedPost });
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
    await Conference.find({post_status: "1"})
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
    updatePost,
    getConferenceForPost,
};