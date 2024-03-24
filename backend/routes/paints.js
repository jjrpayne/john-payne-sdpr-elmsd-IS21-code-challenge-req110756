const express = require("express");
const router = express.Router();
const UserController = require('../controllers/users')
const PaintController = require('../controllers/paints');

router.get('/paints/',
    UserController.verifyToken,
    PaintController.getAllPaints
);

module.exports = router;