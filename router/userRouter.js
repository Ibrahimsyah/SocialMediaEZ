const router = require('express').Router()
const {registerUser, loginUser, getAllUser} = require('../controller/UserController')

router.get('/', getAllUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
