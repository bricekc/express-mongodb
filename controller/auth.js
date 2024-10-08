const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const { verifyUser } = require('../validator/user');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
            verifyUser(req.body);
            const { firstName, lastName, email, password } = req.body;
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                firstName,
                lastName,
                email,
                password: hashPassword
            });
    
            newUser.save()
            res.status(201).send({
                id: newUser._id,
                lastName: newUser.lastName,
                firstName: newUser.firstName,
                email: newUser.email
            });
        } catch(error) {
            res.status(400).send({
                message: error.message || 'Something Wrong'
            })
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        const user = await UserModel.findOne({
                email: email
        })
        if(!user) {
            res.status(401).send({
                message: "User not exist"
            })
        }
        console.log("user", user, password, email)
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
            const jwtOptions = {
                expiresIn: process.env.JWT_TIMEOUT_DURATION || "1h"
            }
            const secret = process.env.JWT_SECRET || "secret"
            const token = jwt.sign({
                userId: user.id
            }, secret, jwtOptions)

            res.send({
                message: 'Login successfully',
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lasName: user.lasName,
                    email: user.email,
                    token
                }
            })
        } else {
            res.status(401).send({
                message: "Wrong login informations"
            })
        }
    }
}