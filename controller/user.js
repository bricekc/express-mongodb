const mongoose = require('mongoose');
const bookModel = require('./../models/Book');
const userModel = require('./../models/User');
module.exports = {
    getUserInfos: async (req, res) => {
        const { id, firstName, lastName, email } = req.user;
        res.send({
            id,
            firstName,
            lastName,
            email
        });
    },
    getUserBooks: async (req, res) => {
        console.log(req.user.id);
        const books = await bookModel
            .find({
                author: new mongoose.Types.ObjectId(`${req.user.id}`)
            })
            .populate({
                path: 'author',
                select: '-password'
            });
        res.send(books);
    },
    getUsers: async  (req,res) => {
        const users = await userModel.find().select('-password');
        res.send(users);
    },
    getOneUserById: async (req, res) => {
        const userId = req.params.id;
        userModel.findById(userId)
            .then((user) => {
                res.status(200).send(user);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                });
            });
    }
};
