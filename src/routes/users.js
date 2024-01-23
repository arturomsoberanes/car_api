const { Router } = require('express')
const router = Router()
const userController = require('../controllers/users')
const { verifyToken } = require('../middlewares/verifyToken')
const { verifyAdmin } = require('../middlewares/verifyAdmin')

router.use(verifyToken)
router.use(verifyAdmin)

router.get('/all', userController.getAllUsers)
router.put('/update', userController.updateUser)
router.delete('/delete', userController.deleteUser)

module.exports = router
