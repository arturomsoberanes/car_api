const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const compression = require('compression')

// Connection DB
require('dotenv').config()
require('./database')

// Global
app.set('port', process.env.PORT || 3000)

// Configs and Middlewares
app.use(morgan('dev'))
app.use(express.json()) // Express que use JSON
// Cors
app.use(cors())
// Helmet
app.use(helmet())
// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600 // limit each IP to 100 requests per windowMs
})
app.use(limiter)
// Compression
app.use(compression())

// Endpoints
app.use('/', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/cars', require('./routes/cars'))

// Server
app.listen(app.get('port'), () => {
  console.log(`Server running at port ${app.get('port')}`)
})
