const {check} = require('express-validator');

module.exports = [
    check('name').notEmpty().withMessage('Nombre es obligatorio'),
    
    check('email').notEmpty().withMessage('Email es obligatorio').isEmail().withMessage('Debe ser un email válido'),

    check('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({min:6}).withMessage('Mínimo 6 caracteres'),

    check('passwordDos')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error('Las contraseñas no coinciden')
        }
        return true
    }),
]
