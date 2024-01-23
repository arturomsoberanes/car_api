const verifyAdmin = (req, res, next) => {
  const { user } = req.dataToken
  if (user.role !== 'administrador') {
    res.status(403).json({ message: 'No tienes permiso para acceder' })
    return
  }
  next()
}

exports.verifyAdmin = verifyAdmin
