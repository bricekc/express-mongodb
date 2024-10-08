const express = require('express')

const bookRouter = require('./book')
const authRouter = require('./auth')

const app = express()

app.use('/books', bookRouter)

app.use('/auth', authRouter)

module.exports = app;