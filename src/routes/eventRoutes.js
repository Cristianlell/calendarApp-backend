const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const eventController =  require('../controllers/eventControllers');
const authentication = require("../middlewares/authentication");
const validationFields = require("../middlewares/validationFields");
const eventValidator = require('../validations/eventValidator');
const updateValidator = require("../validations/updateValidator");


router.use(authentication)
/* /api/event */
router
    .get('/',eventController.getAll)
    .post('/',eventValidator,validationFields,eventController.create)
    .put('/:id',updateValidator,validationFields,eventController.update)
    .delete('/:id', check('id', 'No es un id válido de mongoDB').isMongoId(),validationFields, eventController.remove)




module.exports = router