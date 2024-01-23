const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'secret'

const verifyToken = (req, res, next) => {
  const header = req.headers.authorization
  if (header === undefined) {
    res.status(403).json({ message: 'Token does not exists' })
    return
  }
  const token = header.split(' ')[1]
  jwt.verify(token, secretKey, (error, data) => {
    if (error) {
      res.status(403).json({ message: 'Token Invalid' })
      return
    }
    req.dataToken = data
    next()
  })
}

exports.verifyToken = verifyToken
