const router = require('express').Router();
const commentController = require('../controller/CommentController');
const { checkToken } = require('../middleware');

router.post('/:id', checkToken, commentController.postComment);
router.get('/:id', commentController.getAllCommentByPost);
router.put('/', checkToken, commentController.updateComment);
router.delete('/', checkToken, commentController.deleteComment);

module.exports = router;
