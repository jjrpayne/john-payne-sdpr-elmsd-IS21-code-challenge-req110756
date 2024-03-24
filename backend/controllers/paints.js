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
    },

    editPaintStatus : async (req, res) => {
        const text = qStrings.editPaintStatus;
        const productId = 1*req.params.id;
        const b = req.body;
        var values = [productId, b.status];

        if (b.status === "available" || b.status === "running low" || b.status === "out of stock") {
            try {
                const result = await pool.query(text, values);
                const newPaint = result.rows[0];
                return res.status(200).send(newPaint);
            } catch (err) {
                return res.status(500).send({error: "Internal server error"});
            }
        } else {
            return res.status(400).send({error: "Invalid status"});
        }
    }
}