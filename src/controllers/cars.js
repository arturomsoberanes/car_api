const Car = require('../models/cars')

const addCar = async (req, res) => {
  try {
    const { model, year, brand, cylinders, engine, price } = req.body
    const car = new Car({
      model,
      year,
      brand,
      cylinders,
      engine,
      price
    })
    const newCar = await car.save()
    res.json(newCar)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error al añadir el auto'
    })
  }
}

const getAllCars = async (req, res) => {
  try {
    const allCars = await Car.find()
    const data = {
      quantity: allCars.length,
      allCars
    }
    res.json(data)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error traer los autos'
    })
  }
}

const getCar = async (req, res) => {
  try {
    const { filter } = req.body
    const cars = await Car.find({
      $or: [
        { model: { $regex: filter, $options: 'i' } },
        { year: { $regex: filter, $options: 'i' } },
        { brand: { $regex: filter, $options: 'i' } },
        { cylinders: { $regex: filter, $options: 'i' } },
        { engine: { $regex: filter, $options: 'i' } },
        { price: { $regex: filter, $options: 'i' } }
      ]
    })
    const data = {
      quantity: cars.length,
      cars
    }
    res.json(data)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error al buscar la sucursal'
    })
  }
}

const deleteCar = async (req, res) => {
  try {
    const { id } = req.body
    const deletedCar = await Car.findByIdAndDelete(id)
    res.json(deletedCar)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error al eliminar la sucursal'
    })
  }
}

const updateCar = async (req, res) => {
  try {
    const { id, newData } = req.body
    const updatedCar = await Car.findOneAndUpdate(id, newData, { new: true })
    res.json(updatedCar)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error al actualizar la sucursal'
    })
  }
}

module.exports = {
  addCar,
  getAllCars,
  getCar,
  updateCar,
  deleteCar
}
