var express = require('express');
const authController = require('../controllers/authController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/auth/create',authController.userCreate);

module.exports = router;
