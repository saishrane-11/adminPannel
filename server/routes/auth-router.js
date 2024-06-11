const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth-controllers')
const validate = require('../middleware/validate-middleware');
const {signupSchema,loginSchema} = require('../validator/auth-validator');
const authMiddleware = require('../middleware/auth-middleware');

router.route('/').get(authControllers.home);
router.route('/register').post(validate(signupSchema),authControllers.register);
router.route('/login').post(validate(loginSchema),authControllers.login);
router.route('/user').get(authMiddleware,authControllers.user);

module.exports = router;
