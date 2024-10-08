const mongoose = require('mongoose')
const bookModel = require('./../models/Book')
module.exports = {
    getUserInfos: async (req, res) => {
        const {id, firstName, lastName, email } = req.user
        res.send({
            id,
            firstName,
            lastName,
            email
        })
    },
    getUserBooks: async (req, res) => {
        console.log(req.user.id)
        const books = await bookModel.find({
            author: new mongoose.Types.ObjectId(`${req.user.id}`)
        }).populate({
            path: 'author',
            select: '-password'})
        res.send(books);
    }
}
