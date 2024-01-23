const { Schema, model } = require('mongoose')

const carSchema = new Schema({
  model: { type: String, required: true },
  year: { type: String, required: true },
  brand: { type: String, required: true },
  cylinders: { type: String, required: true },
  engine: { type: String, required: true },
  price: { type: String, required: true }
})

const Car = model('Car', carSchema)

module.exports = Car
