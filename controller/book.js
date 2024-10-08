const BookModel = require('../models/Book');
const { verifyBook } = require('../validator/book');
const UserModel = require('../models/User.js')

module.exports = {
    create: async (req, res) => {
        try {

        verifyBook(req.body)
        const author = await UserModel.findById(req.body.author);
        if(!author) {
            res.status(400).send({
                message: "Author not exist"
            })
        }
        const newBook = new BookModel({
            name: req.body.name,
            description: req.body.description,
            author
        })

        newBook.save();
        res.status(201).send({
            id: newBook._id,
            name: newBook.name,
            description: newBook?.description,
            author: {
                id: newBook.author._id,
                firstName: newBook.author.firstName,
                lastName: newBook.author.lastName,
                email: newBook.author.email,
            }
        });
        } catch(error) {
        res.status(400).send({
            message: error.message || 'Something Wrong'
        })
    }
    },
    findAll: (req, res) => {
        BookModel
        .find()
        .then((books) => {
            res.send(books);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message 
            })
        })
    },
    findBook: (req, res) => {
        const bookId = req.params.id;
        BookModel.findById(bookId)
            .then((book) => {
                res.status(200).send(book);
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                })
            })
    },
    updateBook: async (req, res) => {
        const bookId = req.params.id;
        const oldBook =  await BookModel.findById(bookId);
        if (!oldBook) {
            throw new Error('Cannot fin dbook to update')
        }
        const newBook = {...oldBook, ...req.body}

        verifyBook(newBook)
        const {name, description} = newBook;
        BookModel.findByIdAndUpdate(oldBook.id, {
            name,
            description
        }, {new: true}).then((book) => {
            res.send(book)
        }).catch(error => {
            res.status(500).send({
                message: error.message
            })
        })
    },
    deleteBook: (req, res) => {
        const bookId = req.params.id;
        BookModel.findByIdAndDelete(bookId).then(
            () => {
                res.status(201).send('Book was successfully delete')
            }
        ).catch(error => {
            res.status(500).send({
                message: error.message
            })
        });
    }
}