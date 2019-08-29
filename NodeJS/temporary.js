const express = require('express');
const router = express.Router();
const Rentals = require('../models/rental.js');
const MongooseHelpers = require('../helpers/mongoose.js');
const UserCtrl = require('../controllers/user');

const RentalsCtrl = require('../controllers/rentals');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({ "secret": true });
});

router.post('', authMiddleware, RentalsCtrl.createRntals);



router.get('/:id', (req, res) => {
    const rentalId = req.params.id;

    Rentals.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function(err, foundRental) {
            if (err) {
                res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] });
            }

            return res.json(foundRental);
        });

});


router.get('', (req, res) => {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {};


    Rentals.find(query)
        .select('-bookings')
        .exec(function(err, filteredRentals) {
            if (err) {
                return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
            }
            if (city && filteredRentals.length === 0) {
                return res.status(422).send({ errors: [{ title: 'No Rental Found!', detail: `There are no rental for city ${city}` }] });
            }
            return res.json({ filteredRentals });
        });
});

module.exports = router;