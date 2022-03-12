const { Router } = require("express");
const router = Router();
const eventController =  require('../controllers/eventControllers');
const authentication = require("../middlewares/authentication");
const validationFields = require("../middlewares/validationFields");
const eventValidator = require('../validations/eventValidator');


router.use(authentication)
/* /api/event */
router
    .get('/',eventController.getAll)
    .post('/',eventValidator,validationFields,eventController.create)
    .put('/:id',eventController.update)
    .delete('/:id',eventController.remove)




module.exports = router