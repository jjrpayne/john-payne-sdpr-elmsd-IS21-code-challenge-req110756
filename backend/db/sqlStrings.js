e = module.exports;

e.getAllPaints = `SELECT * FROM paints`;

e.getAllUsers = `SELECT id, username, can_update_paint, can_manage_users FROM users`;

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

e.editCanUpdatePaint = `UPDATE users
SET can_update_paint = $2
WHERE id = $1 RETURNING username, can_update_paint, can_manage_users`;

e.editCanManageUsers = `UPDATE users
SET can_manage_users = $2
WHERE id = $1 RETURNING username, can_update_paint, can_manage_users`;

e.editAllPermissions = `UPDATE users
SET can_update_paint = $2, can_manage_users = $3
WHERE id = $1 RETURNING username, can_update_paint, can_manage_users`;