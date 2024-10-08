const express = require('express')

const bookRouter = require('./book')
const authRouter = require('./auth')
const userRouter = require('./user')

const app = express()

app.use('/books', bookRouter)

app.use('/auth', authRouter)

app.use('/users', userRouter)

module.exports = app;