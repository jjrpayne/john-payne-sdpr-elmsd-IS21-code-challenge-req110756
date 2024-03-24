e = module.exports;

e.getAllPaints = `SELECT * FROM paints`;

e.insertNewUser = `INSERT INTO users
(username, password_hash, can_update_paint, can_manage_users)
VALUES ($1, $2, FALSE, FALSE) RETURNING *`;

e.findUserByUsername = `SELECT * FROM users
WHERE username = $1 LIMIT 1`;

e.findUserById = `SELECT * FROM users
WHERE id = $1 LIMIT 1`;

e.editPaintStatus = `UPDATE paints
SET status = $2
WHERE id = $1 RETURNING id, colour, status`;