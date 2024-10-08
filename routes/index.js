const express = require('express')

const bookRouter = require('./book')

const app = express()

app.use('/books', bookRouter)

module.exports = app;