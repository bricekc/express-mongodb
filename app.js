require('dotenv').config();
const express = require('express');
const apiRouter = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express')

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Book API',
            version: '1.0.0',
            description: 'API for books',
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)

mongoose
    .connect(process.env.DATABASE_URL)
    .then(async () => {
        console.log('Database connected');
    })
    .catch((e) => {
        console.log(e);
    });

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('server is running');
});
