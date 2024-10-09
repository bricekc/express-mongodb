const Router = require('express');
const userController = require('../controller/user');
const userRouter = Router();
const jwt = require('../middlewares/jwt');

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users API Endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *       example:
 *         id: d5fE_asz
 *         firstName: John
 *         lastName: Doe
 *         email: JohnDoe@example.com
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Retrieve the authenticated user's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The authenticated user's information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/me', jwt.verifyUser, userController.getUserInfos);

/**
 * @swagger
 * /api/users/books:
 *   get:
 *     summary: Retrieve the authenticated user's books
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the authenticated user's books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/books', jwt.verifyUser, userController.getUserBooks);

module.exports = userRouter;