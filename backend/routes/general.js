const express = require("express");
const router = express.Router();
const pool = require('../db/dbConfig');

router.get('', (req, res) => {
    res.send('Hello A Painting Company!');
})

router.get('/health/', (req, res) => {
    res.status(200).send("Server is healthy.");
})

module.exports = router;