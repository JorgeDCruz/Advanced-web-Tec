const express = require('express');
const router = express.Router();
const pool = require('../database/database');


router.get('/', async (req, res) => {
    const rows = await pool.query("SELECT * FROM user");
    const name = rows[0].username;
    console.log(name);
    res.render("home.html", {name: rows[0]})
});

module.exports = router;