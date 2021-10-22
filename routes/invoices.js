/** Routes for invoices. */


const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

router.get('/', async function (req, res, next) {
    try {
        const results = await db.query(`SELECT id, comp_code FROM invoices ORDER by id`);
        return res.json({"invoices": results.rows});
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const results = await db.query(`SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, c.name, c.description FROM invoices AS i INNER JOIN companies AS c ON (i.comp_code = c.code) WHERE id = $1`, [req.params.id]);

        if(results.rows.length === 0) {
            throw new ExpressError("Invoice cannot be found", 404);
        };

        const data = result.rows[0];
        const invoice = {
            id: data.id,
            company: {
                code: data.comp_code,
                name: data.name,
                description: data.description,
            },
            amt: data.amt,
            paid: data.paid,
            add_date: data.add_date,
            paid_date: data.paid_date,
        };

        return res.json({"invoice": invoice});

    } catch (err) {
        return next(err);
    }
});

module.exports = router;