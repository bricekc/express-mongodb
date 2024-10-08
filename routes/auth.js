const Router = require('express');
const authController = require('../controller/auth');
const authRouter = Router();

authRouter.post('/register', authController.register);


module.exports = authRouter;