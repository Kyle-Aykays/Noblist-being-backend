const Joi = require('joi');

// Signup Validation Middleware
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                'string.base': 'Name must be a string.',
                'string.empty': 'Name cannot be empty.',
                'string.min': 'Name must have at least 3 characters.',
                'string.max': 'Name must not exceed 100 characters.',
                'any.required': 'Name is required.',
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Email must be a valid email address.',
                'string.empty': 'Email cannot be empty.',
                'any.required': 'Email is required.',
            }),
        password: Joi.string()
            .min(4)
            .max(100)
            .required()
            .messages({
                'string.min': 'Password must have at least 4 characters.',
                'string.max': 'Password must not exceed 100 characters.',
                'string.empty': 'Password cannot be empty.',
                'any.required': 'Password is required.',
            }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((detail) => detail.message),
        });
    }
    next();
};

// Login Validation Middleware
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Email must be a valid email address.',
                'string.empty': 'Email cannot be empty.',
                'any.required': 'Email is required.',
            }),
        password: Joi.string()
            .min(4)
            .max(100)
            .required()
            .messages({
                'string.min': 'Password must have at least 4 characters.',
                'string.max': 'Password must not exceed 100 characters.',
                'string.empty': 'Password cannot be empty.',
                'any.required': 'Password is required.',
            }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((detail) => detail.message),
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation,
};
