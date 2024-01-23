const { Router } = require('express')
const router = Router()
const carsController = require('../controllers/cars')
const { verifyToken } = require('../middlewares/verifyToken')

router.use(verifyToken)

router.get('/all', carsController.getAllCars)
router.post('/add', carsController.addCar)
router.post('/search', carsController.getCar)
router.put('/update', carsController.updateCar)
router.delete('/delete', carsController.deleteCar)

module.exports = router
