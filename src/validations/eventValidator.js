const {check} = require('express-validator');
const moment = require('moment');
moment.locale('es');



module.exports = [
    check('title').notEmpty().withMessage('Title es obligatorio'),
    
    check('start').notEmpty().withMessage('La fecha inicial es obligatoria').isDate().withMessage('Formato no válido').custom((value,{req})=>{
        if (moment(value).diff(moment(),'days') < 0) {
            return false
        }else{
            return true
        }
    }).withMessage('Fecha inicio tiene que ser igual o posterior a la actual'),

    check('end').notEmpty().withMessage('Fecha de finalización es obligatorio').isDate().withMessage('Formato no válido').custom((value,{req})=>{
        if (moment(value) < moment(req.body.start)) {
            return false
        }else{
            return true
        }
    }).withMessage('Fecha finalización debe ser posterior a la fecha inicial'),
]
