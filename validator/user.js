const { Validator } = require('jsonschema');

module.exports = {
    verifyUser: (user) => {
        if (!user) {
            throw new Error('Cannot create new User');
        }
        let validator = new Validator();
        let userSchema = {
            type: 'object',
            properties: {
                firstName: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: 'Provide firstName is invalid'
                },
                lastName: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: 'Provide lastName is invalid'
                },
                email: {
                    type: 'string',
                    format: 'email',
                    errorMessage: 'Provide email is invalid'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    errorMessage: 'Provide password is invalid',
                    pattern: '^(?=.*[A-Z])(?=.*[0-9]).+$'
                }
            },
            required: ['firstName', 'lastName', 'email', 'password']
        };

        let result = validator.validate(user, userSchema);

        if (result.errors.length) {
            const errorInputsMsg = result.errors
                .map((error) => {
                    return error.schema.errorMessage || error.message;
                })
                .join(' ');

            throw new Error(errorInputsMsg);
        }
    }
};
