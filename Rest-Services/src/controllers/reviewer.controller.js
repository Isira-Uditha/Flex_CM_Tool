const Post = require('../models/Post.model');
const Workshop = require('../models/Workshop.model');
const mongoose = require("mongoose");
const User = require('../models/User.model');

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

const summaryOfResearchesStatus = async (req, res) => {
    await Post.aggregate([
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
                _id: {
                    "name": "$user_id",
                    "status":  "$status"
                },
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

//Workshops
const approveWorkshopPaper = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //fetching the id of the post item
        const workshop = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post With That id'); //Validating the Post id
        const approvedWorkshop = await Workshop.findByIdAndUpdate(id, workshop,{new : true}); //Find and Update operation
        res.json(approvedWorkshop);
    }
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
                _id: "$role",
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
    getAmountOfResearchApproves,
    getAmountOfResearchRejected,
    summaryOfResearchesStatus,
    approveWorkshopPaper,
    getAmountOfResearchPending,
    getAmountOfWorkshopApproves,
    getAmountOfWorkshopRejected,
    getAmountOfWorkshopPending,
    summaryOfUsers
};