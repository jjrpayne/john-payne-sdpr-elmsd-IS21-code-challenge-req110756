const express = require("express");
const router = express.Router();
const UserController = require('../controllers/users')
const PaintController = require('../controllers/paints');

// get all paints
router.get('/paints/',
    UserController.verifyToken,
    PaintController.getAllPaints
);

// update paint status
router.put('/edit_paint_status/:id',
    UserController.verifyToken,
    UserController.checkIfUserCanEditPaint,
    PaintController.editPaintStatus
)

module.exports = router;