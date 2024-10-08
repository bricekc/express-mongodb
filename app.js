require('dotenv').config();
const express = require('express');
const apiRouter = require('./routes');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose
    .connect(process.env.DATABASE_URL)
    .then(async () => {
        console.log('Database connected');
    })
    .catch((e) => {
        console.log(e);
    });
app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('server is running');
});
