const express = require('express');
const {getComments, createComment, getCommentsByPost, updateCommentById, deleteCommentById} = require("../controllers/comments_controller");
const router = express.Router();
const secure_middleware = require('../middlewares/secure_middleware');

router.use(secure_middleware)

router.get('/', getComments);
router.post('/:id', createComment);
router.get('/:id', getCommentsByPost);
router.put('/:id', updateCommentById);
router.delete('/:id', deleteCommentById);

module.exports = router;