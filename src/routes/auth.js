const { Router } = require('express')
const userController = require('../controllers/users')
const router = Router()

router.post('/signup', userController.registerUser)
router.post('/login', userController.loginUser)

module.exports = router
