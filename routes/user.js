const Router = require('express');
const userController = require('../controller/user');
const userRouter = Router();
const jwt = require('../middlewares/jwt');

userRouter.get('/me', jwt.verifyUser, userController.getUserInfos);
userRouter.get('/books', jwt.verifyUser, userController.getUserBooks);

module.exports = userRouter;
