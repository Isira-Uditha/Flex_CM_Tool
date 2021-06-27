const Post = require('../models/Post.model');
const mongoose = require("mongoose");

const createPost = async (req, res) => {
    if (req.body) {
        const post = new Post(req.body); //creating a new post with the object of post model
        post.save()
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message})
            });
    }
}

const updatePost = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //id of the post
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post matched with the ID'); //id validation
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true}); //Find & update
        res.json(updatedPost);
    }
}

const deletePost = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params; //id of the post
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post matched with the ID'); //id validation
        await Post.findByIdAndRemove(id); //Removing the post
    }
}

const getAllPosts = async (req, res) => {
    //retrieve all the posts available in the database
    await Post.find({})
        .then(data => {
            res.status(200).send({data: data})
        })
        .catch(error => {
            res.status(500).send({error: error.message})
        });
}

const getPost = async (req, res) => {
    if (req.params && req.params.id) {
        const post = await Post.findById(req.params.id)
            .then(data => {
                res.status(200).send({data: data}) //data of the post related to the id
            })
            .catch(error => {
                res.status(500).send({error: error.message})
            });
    }
}

const getUserPost = async (req, res) => {
    if (req.params && req.params.id) {
        const posts = await Post.find({'user_id': req.params.id})
            .then(data => {
                res.status(200).send({data: data});
            }).catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPost,
    getUserPost
};