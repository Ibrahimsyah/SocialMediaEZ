const router = require('express').Router();
const likeController = require('../controller/LikeController');
const { checkToken } = require('../middleware');

router.get('/', likeController.getAllLike);
router.post('/:id', checkToken, likeController.postLike);
router.delete('/:id', checkToken, likeController.deleteLike);

module.exports = router;