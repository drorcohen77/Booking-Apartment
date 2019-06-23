const express = require('express');
const router = express.Router();
const Rentals = require('../models/rental.js');

router.get('', (req, res) => {
    Rentals.find({}, (err, foundRentals) => {

        res.json(foundRentals);
    });
});

router.get('/:id', (req, res) => {
    const rentalId = req.params.id;
    Rentals.findById(rentalId, (err, foundRentals) => {
        if (err) {
            res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] });
        }

        res.json(foundRentals);
    });
});

module.exports = router;