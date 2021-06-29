const Conference = require('../models/Conference.model');
const Post = require('../models/Post.model');
const Workshop = require('../models/Workshop.model');
const mongoose = require("mongoose");
const User = require("../models/User.model");

const approveConference = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //fetching the id of the post item
        const conference = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post With That id'); //Validating the Post id
        const approveConference = await Conference.findByIdAndUpdate(id, conference,{new : true}); //Find and Update operation
        res.json(approveConference);
    }
}

const getAmountOfConferenceApproves = async (req, res) => {
    await Conference.find({
        status: "A",
    })

        .then(data => {
            const  amount = data.length
            res.status(200).send({data: amount})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}

const getAmountOfConferenceReject = async (req, res) => {
    await Conference.find({
        status: "R",
    })

        .then(data => {
            const  amount = data.length
            res.status(200).send({data: amount})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}

const getAmountOfConferencePending = async (req, res) => {
    await Conference.find({
        status: "P",
    })

        .then(data => {
            const  amount = data.length
            res.status(200).send({data: amount})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}

const getAmountOfResearchApproves = async (req, res) => {
    await Post.find({
        status: "approved",
    })
        .populate('user_id', 'name')
        .then(data => {
            const  amount = data.length
            res.status(200).send({data: amount})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}

const getAmountOfResearchRejected = async (req, res) => {
    await Post.find({
        status: "reject",
    })
        .populate('user_id', 'name')
        .then(data => {
            const  amount = data.length
            res.status(200).send({data: amount})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}
const getAmountOfResearchPending= async (req, res) => {
    await Post.find({
        status: "pending",
    })
        .populate('user_id', 'name')
        .then(data => {
            const  amount = data.length
            res.status(200).send({data: amount})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}
const getAmountOfWorkshopApproves = async (req, res) => {
    await Workshop.find({
        status: "approved",
    })

        .then(data => {
            const  amount = data.length
            res.status(200).send({data: amount})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}

const getAmountOfWorkshopRejected = async (req, res) => {
    await Workshop.find({
        status: "reject",
    })

        .then(data => {
            const  amount = data.length
            res.status(200).send({data: amount})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}
const getAmountOfWorkshopPending= async (req, res) => {
    await Workshop.find({
        status: "pending",
    })
        .then(data => {
            const  amount = data.length
            res.status(200).send({data: amount})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}

const summaryOfUsers = async (req, res) => {
    await User.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(new Date().getTime() - 1000 * 3600 * 24 * 7),
                    $lt: new Date(),
                },
            },
        },
        {
            $group: {
                _id:

                    "$role"
                ,
                count: {
                    $sum: 1,
                },
            },
        },
    ])
        .then(data => {
            const  amount = data.length
            res.status(200).send({data: data})
            console.log(new Date(new Date().getTime() - 1000 * 3600 * 24 * 7))
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}




module.exports = {
    approveConference,
    getAmountOfConferenceApproves,
    getAmountOfConferenceReject,
    getAmountOfConferencePending,
    getAmountOfResearchApproves,

    getAmountOfResearchRejected,
    getAmountOfResearchPending,

    getAmountOfWorkshopApproves,
    getAmountOfWorkshopRejected,
    getAmountOfWorkshopPending,

    summaryOfUsers


}