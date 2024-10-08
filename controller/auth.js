const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const { verifyUser } = require('../validator/user');

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
    }
}