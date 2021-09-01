import { checkSchema } from "express-validator";

export const signup = checkSchema({
    name: {
        trim: true,
        notEmpty: true,
        isLength: {
            options: {
                min: 2
            }
        },
        errorMessage: "Name precisa ter pelomenos 2 caracteres"
    },
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "E-mail inválido"
    },
    password: {
        notEmpty: true,
        isLength: {
            options: {
                min: 2
            }
        },
        errorMessage: "Password precisa ter pelo menos 2 caracteres"
    }
});

export const signin = checkSchema({
    email: {
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "E-mail inválido"
    },
    password: {
        notEmpty: true,
        isLength: {
            options: {
                min: 2
            }
        },
        errorMessage: "Password precisa ter pelo menos 2 caracteres"
    }
});

export const update = checkSchema({
    token: {
        notEmpty: true
    },
    name: {
        optional: true,
        trim: true,
        notEmpty: true,
        isLength: {
            options: {
                min: 2
            }
        },
        errorMessage: "Name precisa ter pelomenos 2 caracteres"
    },
    email: {
        optional: true,
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "E-mail inválido"
    },
    password: {
        optional: true,
        notEmpty: true,
        isLength: {
            options: {
                min: 2
            }
        },
        errorMessage: "Password precisa ter pelo menos 2 caracteres"
    }
});