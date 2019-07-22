const express = require('express');
const router = express.Router();
const Rentals = require('../models/rental.js');

const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({ "secret": true });
});

router.get('', (req, res) => {

    Rentals.find({})
        .select('-booking')
        .exec(function(err, foundRentals) {
            res.json(foundRentals);
        });
});

router.get('/:id', (req, res) => {
    const rentalId = req.params.id;

    Rentals.findById(rentalId)
        .populate('user', 'username - _id')
        .populate('booking', 'startAt endAt - _id')
        .exec(function(err, foundRentals) {
            if (err) {
                res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] });
            }

            return res.json(foundRentals);
        });

});

module.exports = router;