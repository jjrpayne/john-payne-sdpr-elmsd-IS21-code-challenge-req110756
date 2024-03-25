const pool = require('../db/dbConfig');
const qStrings = require('../db/sqlStrings');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    // hash password
    generatePasswordHash: async (req, res, next) => {
        b = req.body;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(b.password, salt, function(err, hash) {
                if (err) {
                    // let the next function handle error
                    next (err)
                }
                req.body.password = hash
                next()
            })
        })
    },

    // create a new account
    signUp : async(req, res) => {
        const b = req.body;
        const text = qStrings.insertNewUser;
        var values = [b.username.toLowerCase(), b.password];

        try {
            const result = await pool.query(text, values);
            const newUsername = result.rows[0].username;
            return res.status(200).send({message: `Success! User ${newUsername} created.`});
        } catch(err) {
            console.log("error", err)
            if (err.constraint == 'unique_username') {
                // return err if username is taken
                // make sure to configure database so it has a unique constraint on username
                return res.status(401).send({error: "Username taken"})
            }
            return res.status(500).send({error: "Internal server error"});
        }
    },

    // log into account, returns auth token
    logIn : async(req, res) => {
        const b = req.body;
        const text = qStrings.findUserByUsername;
        var values = [b.username];

        try {
            const result = await pool.query(text, values);
            const user = result.rows[0];
            if (user && await bcrypt.compare(b.password, user.password_hash)) {
                const token = jwt.sign({id:user.id, username: user.username}, JWT_SECRET, {
                    expiresIn: '1h'
                });
                return res.status(200).json({token})
            } else {
                return res.status(401).send({error: "Invalid username or password."})
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    // verify token given by login route
    verifyToken : async(req, res, next) => {
        const authHeader = req.header('Authorization');
        if(!authHeader) {
            return res.status(401).send({error: "Access denied"});
        } else if (authHeader.split(" ")[0] !== "Bearer") {
            return res.status(401).send({error: "Invalid token"});
        } else {
            const token = authHeader.split(" ")[1]
            try {
                // if token is valid, pass on user id to the next function
                const decoded = jwt.verify(token, JWT_SECRET);
                req.user_id = decoded.id;
                next();
            } catch(err) {
                return res.status(401).send({error: "Invalid token"});
            }
        }
    },

    // check if user has permission to edit paint status
    checkIfUserCanEditPaint : async(req, res, next) => {
        const userId = req.user_id;
        const text = qStrings.findUserById;
        var values = [userId];

        try {
            const result = await pool.query(text, values);
            const user = result.rows[0];
            if(user.can_update_paint){
                next();
            } else {
                return res.status(401).send({error: "Access denied."});
            }
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    // check if user has permission to view users and manage permissions
    checkIfUserCanManageUsers : async(req, res, next) => {
        const userId = req.user_id;
        const text = qStrings.findUserById;
        var values = [userId];

        try {
            const result = await pool.query(text, values);
            const user = result.rows[0];
            if(user.can_manage_users){
                next();
            } else {
                return res.status(401).send({error: "Access denied."});
            }
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    // get all users
    getAllUsers : async (req, res) => {
        const text = qStrings.getAllUsers;
        const values = [];
        try {
            const result = await pool.query(text, values);
            const usersList = result.rows;
            return res.status(200).send(usersList);
        } catch (err) {
            return res.status(500).send({error: "Internal server error"});
        }
    },

    // edit user permissions
    editUserPermissions : async(req, res) => {
        const objectUserId = 1*req.params.id;
        const b = req.body;

        // check if updating both permissions or just one
        if (typeof b.can_manage_users === "boolean" && typeof b.can_update_paint === "boolean"){
            const text = qStrings.editAllPermissions;
            const values = [objectUserId, b.can_update_paint, b.can_manage_users];
            try {
                const result = await pool.query(text, values);
                const newPermissions = result.rows[0];
                return res.status(200).send(newPermissions);
            } catch (err) {
                return res.status(500).send({error: "Internal server error"});
            }
        } else if (typeof b.can_manage_users === "boolean") {
            const text = qStrings.editCanManageUsers;
            const values = [objectUserId, b.can_manage_users];
            try {
                const result = await pool.query(text, values);
                const newPermissions = result.rows[0];
                return res.status(200).send(newPermissions);
            } catch (err) {
                return res.status(500).send({error: "Internal server error"});
            }
        } else if (typeof b.can_update_paint === "boolean") {
            const text = qStrings.editCanUpdatePaint;
            const values = [objectUserId, b.can_update_paint];
            try {
                const result = await pool.query(text, values);
                const newPermissions = result.rows[0];
                return res.status(200).send(newPermissions);
            } catch (err) {
                return res.status(500).send({error: "Internal server error"});
            }
        } else {
            return res.status(400).send({error: "Invalid permissions"});
        }
    }
}