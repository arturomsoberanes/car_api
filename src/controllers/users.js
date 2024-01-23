const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users')

const secretKey = process.env.SECRET_KEY || 'secret'

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body.data
    const user = await User.findOne({ username })
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' })
      return
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      res.status(403).json({ message: 'Contraseña erronea' })
      return
    }
    jwt.sign({ user }, secretKey, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        res.json({ message: 'Error al iniciar sesión' })
        return
      }
      const { _id, username, name } = user
      res.json({ token, user: { _id, username, name } })
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error al iniciar session'
    })
  }
}

const registerUser = async (req, res) => {
  try {
    const { name, username, password } = req.body.data
    const user = new User({
      name,
      username,
      password: bcrypt.hashSync(password, 10)
    })
    const newUser = await user.save()
    res.json(newUser)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error al registrar el usuario'
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find()
    const data = {
      quantity: allUsers.length,
      allUsers
    }
    res.json(data)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error al buscar los usuarios'
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id, newData } = req.body.data
    if (!id || !newData) {
      res.json({ message: 'Informacion incompleta' })
      return
    }
    const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true })
    res.json(updatedUser)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error al actualizar el usuario'
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body.data
    const deletedUser = await User.findByIdAndDelete(id)
    res.json(deletedUser)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error al eliminar el usuario'
    })
  }
}

module.exports = {
  loginUser,
  registerUser,
  getAllUsers,
  updateUser,
  deleteUser
}
