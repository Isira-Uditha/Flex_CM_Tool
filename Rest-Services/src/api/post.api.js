const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

module.exports = () => {
    router.post('/create', postController.createPost);
    router.get('/', postController.getAllPosts);
    router.get('/:id', postController.getPost);
    router.patch('/update/:id', postController.updatePost);
    router.delete('/delete/:id', postController.deletePost);
    return router;
}