const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.post('/signup/',
    UsersController.generatePasswordHash,
    UsersController.signUp
);

router.post('/login/',
    UsersController.logIn
);

router.get('/users/',
    UsersController.verifyToken,
    UsersController.checkIfUserCanManageUsers,
    UsersController.getAllUsers
)

module.exports = router;