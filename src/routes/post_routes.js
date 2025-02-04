const express = require('express');
const {getPosts, getPostById, createPost, updatePost, deletePost} = require("../controllers/posts_controller");
const router = express.Router();
const secure_middleware = require('../middlewares/secure_middleware');

router.use(secure_middleware)

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;