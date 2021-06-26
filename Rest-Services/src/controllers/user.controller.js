const User = require('../models/User.model');
const mongoose = require("mongoose");

const createUser = async (req, res) => {
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

const validateUser = async (req, res) => {
    if (req.body) {
        const query = { email: req.body.email , password:req.body.password};

        /*const options = {
            // sort matched documents in descending order by rating
            sort: {  },
            // Include only the `title` and `imdb` fields in the returned document
            projection: { _id: 0, name: 1, email: 1 ,role: 1 },
        };*/

        await User.findOne(query)

            .then(data => {
                res.status(200).send({ data : data});
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getUser = async (req, res) => {
    if (req.params && req.params.id) {
        await User.findById(req.params.id)
            .populate('users','name email')
            .then(data => {
                res.status(200).send({ data : data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const updateUser = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //fetching the id of the post item
        const user = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No User With That id'); //Validating the User id
        const updatedUser= await User.findByIdAndUpdate(id, user,{new : true}); //Find and Update operation
        res.json(updatedUser);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    validateUser,
    getUser,
    updateUser

};