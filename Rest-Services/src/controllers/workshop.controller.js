const Workshop = require('../models/Workshop.model');
const mongoose = require('mongoose');

const createWorkshop = async (req, res) => {
    if (req.body) {
        const workshop = new Workshop(req.body); //creating a new workshop with the object of workshop model
        workshop.save()
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}

const getWorkshop = async (req, res) => {
    if (req.params && req.params.id) {
        const workshop = Workshop.findById(req.params.id)
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            })
    }
}

const updateWorkshop = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //id of the workshop
        const workshop = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Workshop matched with the ID'); //id validation
        const updatedWorkshop = await Workshop.findByIdAndUpdate(id, workshop, {new: true}); //Find & update
        res.json(updatedWorkshop);
    }
}

const deleteWorkshop = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //id of the workshop
        const workshop = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post matched with the ID'); //id validation
        await Workshop.findByIdAndRemove(id); //Removing the workshop
        res.json({message: "Workshop removed"});
    }
}

const getUserWorkshop = async (req, res) => {
    if (req.params && req.params.id) {
        const workshop = await Workshop.find({'conductor_id': req.params.id})
            .then(data => {
                res.status(200).send({data: data});
            }).catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}

const getAllWorkshop = async (req, res) => {
    //retrieve all the workshops available in the database as per user
    await Workshop.find({})
        .populate('conductor_id', 'name')
        .then(data => {
            res.status(200).send({data: data})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}

module.exports = {
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
    getUserWorkshop,
    getAllWorkshop,
    getWorkshop
}