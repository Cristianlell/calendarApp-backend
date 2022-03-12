var express = require('express');
const authController = require('../controllers/authController');
const validationFields = require('../middlewares/validationFields');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');
var router = express.Router();

router
  .post('/',registerValidator,validationFields,authController.userCreate)
  .post('/login',loginValidator,validationFields,authController.userLogin)

module.exports = router;
