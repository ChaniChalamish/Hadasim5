const express = require('express')
const { connectDB } = require('./src/config/database')
const errorMiddlware = require("./src/middlewares/error");
const cors = require("cors");

const dotenv = require('dotenv').config()
const logger = require("./src/config/logger");
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT
const HOST_NAME = process.env.HOST_NAME
// Instantiating the mongodb database
connectDB()

// Instantiating the express application

const server = express()

server.get('/', (req, res) => {
    return res.json({
      message: 'This the Home page',
    })
  })

// Importing our routes
const user = require('./src/routes/user.routes')

// Express Inbuilt middleware

server.use(cors()) // Enables CORS
server.use(express.json()) // Used in passing application/json data
server.use(express.urlencoded({ extended: false })) // Used in passing form
server.use(cookieParser()) // Used in setting the cookies parser

// Routes for API

server.use('/api', user)
server.use(errorMiddlware); // Error handling middleware

logger.info(`Server is running at http://${HOST_NAME}:${PORT}`)
// Creating the server
server.listen(PORT,HOST_NAME, () => console.log('Server is running on port ' + PORT))