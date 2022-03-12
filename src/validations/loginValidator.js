const {check} = require('express-validator');

module.exports = [
    
    check('email').notEmpty().withMessage('Email es obligatorio').isEmail().withMessage('Debe ser un email válido'),

    check('password').notEmpty().withMessage('La contraseña es obligatoria')
]
