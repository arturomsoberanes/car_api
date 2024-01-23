const mongoose = require('mongoose')

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true
    })
  } catch (e) {
    console.log('Error Conection')
  }
}

connectDataBase().then(() => {
  console.log('Conection Succesfull')
})
