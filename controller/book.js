const BookModel = require('../models/Book');
const { verifyBook } = require('../validator/book');

module.exports = {
    create: (req, res) => {
        try {

        verifyBook(req.body)
        const newBook = new BookModel({
            name: req.body.name,
            description: req.body.description
        })

        newBook.save();
        res.status(201).send(newBook);
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