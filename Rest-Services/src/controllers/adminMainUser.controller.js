const User = require('../models/User.model');
const mongoose = require("mongoose");

const createMainUser = async (req, res) => {
    if (req.body) {
        const user = new User(req.body);
        await user.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllUsers = async (req, res) => {
    await User.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


module.exports = {
    createMainUser,
    getAllUsers
};