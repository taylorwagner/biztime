/** Routes for invoices. */


const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

router.get('/', async function (req, res, next) {
    try {
        const results = await db.query(`SELECT id, comp_code, amt, paid, add_date, paid_date FROM invoices`);
        return res.json({"invoices": results.rows});
    } catch (err) {
        return next(err);
    }
});

router.get('/', async function (req, res, next) {
    try {
        const results = await db.query(`SELECT id, comp_code, amt, paid, add_date, paid_date FROM invoices`);
        return res.json({"invoices": results.rows});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;