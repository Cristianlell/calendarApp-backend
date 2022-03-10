var express = require('express');
const authController = require('../controllers/authController');
const validationFields = require('../middlewares/validationFields');
const registerValidator = require('../validations/registerValidator');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',registerValidator,validationFields,authController.userCreate);
router.post('/login',authController.userLogin);

module.exports = router;
