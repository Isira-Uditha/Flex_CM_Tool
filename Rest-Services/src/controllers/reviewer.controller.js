const Post = require('../models/Post.model');
const mongoose = require("mongoose");

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



module.exports = {
    getAmountOfResearchApproves,
    getAmountOfResearchRejected,
    summaryOfResearchesStatus
};