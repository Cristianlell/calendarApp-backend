const e = require('express');
const {check, param} = require('express-validator');
const moment = require('moment');
moment.locale('es');



module.exports = [
    check('title').notEmpty().withMessage('Title es obligatorio'),
    
    check('start').notEmpty().withMessage('La fecha inicial es obligatoria').custom((value,{req})=>{
      
        if (!moment(value).isValid()) {
            throw new Error('Formato no válido')
        }else{

            if (moment(value).diff(moment(),'days') < 0) {
                throw new Error('Fecha inicio tiene que ser igual o posterior a la actual')
            }else{
                return true
            }
        }

    }),

    check('end').notEmpty().withMessage('Fecha de finalización es obligatorio').custom((value,{req})=>{
        if (!moment(value).isValid()) {
            throw new Error('Formato no válido')
        }else{

            if (moment(value) < moment(req.body.start)) {
                throw new Error('Fecha finalización debe ser posterior a la fecha inicial')
            }else{
                return true
            }
        }
    }),
    
    param('id', 'No es un id válido de mongoDB').isMongoId()
]

