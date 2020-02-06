const router = require('express').Router();
const likeController = require('../controller/LikeController');
const { checkToken } = require('../middleware');

router.post('/', checkToken, likeController.postLike);
router.delete('/', checkToken, likeController.deleteLike);

module.exports = router;