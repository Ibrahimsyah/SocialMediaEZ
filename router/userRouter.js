const router = require('express').Router()
const {registerUser, loginUser, getAllUser, getUserById} = require('../controller/UserController')

router.get('/', getAllUser)
router.get('/:id_user', getUserById)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
