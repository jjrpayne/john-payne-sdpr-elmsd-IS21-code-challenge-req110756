e = module.exports;

e.getAllPaints = `SELECT * FROM paints`;

e.insertNewUser = `INSERT INTO users
(username, password_hash, can_update_paint, can_manage_users)
VALUES ($1, $2, FALSE, FALSE) RETURNING *`;
