const router = require('express-promise-router')();

const userController = require('../controllers/user');
const { checkToken, authUser } = require('../middleware/authUser');
const createSchema = require('../schemas/createUser.json');
const loginSchema = require('../schemas/loginUser.json');
const validate = require('../middleware/validate');

/* GET home page. */
router.get('/', checkToken, userController.getHome);
/* GET message page. */
router.get('/message', userController.messagePage);

/* User Router*/
router.get('/login', checkToken, userController.renderLogin);
router.post('/login', checkToken, validate(loginSchema), userController.login);
router.post('/logout', userController.logout);
router.post('/register', validate(createSchema), userController.create);

module.exports = router;
