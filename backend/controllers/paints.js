const pool = require('../db/dbConfig');
const qStrings = require('../db/sqlStrings');

module.exports = {
    getAllPaints : async (req, res) => {
        const text = qStrings.getAllPaints;
        const values = [];
        try {
            const result = await pool.query(text, values);
            const paintsList = result.rows;
            return res.status(200).send(paintsList);
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    }
}