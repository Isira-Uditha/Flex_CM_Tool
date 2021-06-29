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

const deleteUsers = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //fetching the id of the post item
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`); //Validating the post id

        await User.findByIdAndRemove(id); //Find and Remove operation

        res.json({message: "Deleted successfully."});
    }
}

module.exports = {
    createMainUser,
    getAllUsers,
    deleteUsers
};