const Router = require('express');
const bookController = require('../controller/book');
const jwt = require('../middlewares/jwt')
const bookRouter = Router();

bookRouter.get('/', bookController.findAll);

bookRouter.get('/:id', bookController.findBook);

bookRouter.post('/', jwt.verifyUser, bookController.create);

bookRouter.put("/:id", bookController.updateBook)

bookRouter.delete("/:id", bookController.deleteBook
)

module.exports = bookRouter;