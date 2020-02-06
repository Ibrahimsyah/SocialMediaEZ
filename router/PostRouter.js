const router = require('express').Router()
const {checkToken} = require('../middleware')
const {createPost, getAllPost, getSpecificPost, updatePost, deletePost} = require('../controller/PostController')


router.get('/', getAllPost)
router.post('/', checkToken, createPost)
router.get('/:id_post', getSpecificPost)
router.put('/:id_post', checkToken, updatePost)
router.delete('/:id_post', checkToken, deletePost)
module.exports = router