const express = require("express");
const router = express.Router();
const PaintController = require('../controllers/paints');

router.get('/paints/',
    PaintController.getAllPaints
);

module.exports = router;