const express = require('express');
const router = express.Router();
const Rentals = require('../models/rental.js');
const MongooseHelpers = require('../helpers/mongoose.js');
const UserCtrl = require('../controllers/user');
const RentalsCtrl = require('../controllers/rentals');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({ "secret": true });
});



// router.get('', (req, res) => {

//     Rentals.find({})
//         .select('-bookings')
//         .exec(function(err, foundRentals) {
//             res.json(foundRentals);
//         });
// });

router.get('/:id', (req, res) => {
    const rentalId = req.params.id;

    Rentals.findById(rentalId)
        // .populate('user', 'username -_id')
        // .populate('bookings', 'startAt endAt -_id')
        .populate({
            path: 'user',
            select: 'username -_id'
        })
        .populate({ path: 'bookings', select: 'startAt endAt -_id' })
        .exec(function(err, foundRental) {
            if (err) {
                res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could not find Rental!' }] });
            }
            return res.json(foundRental);
        });

});


router.delete('/:id', UserCtrl.authMiddleware, (req, res) => {
    const user = res.locals.user;

    Rentals.findById(req.params.id)
        .populate('user', '_id')
        .populate({
            path: 'bookings',
            select: 'startAt',
            math: { startAt: { $gt: new Date() } }
        })
        .exec(function(err, foundRental) {
            if (err) {
                return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
            }

            if (user.id !== foundRental.user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalide user!', detail: 'You are not rental owner!' }] });
            }

            if (foundRental.bookings.length > 0) {
                return res.status(422).send({ errors: [{ title: 'Active Bookings!', detail: 'Can not delete rental with active bookings!' }] });
            }

            foundRental.remove(function(err) {
                if (err) {
                    return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
                }

                return res.json({ 'status': 'deleted' });
            });

        });
});


router.post('', UserCtrl.authMiddleware, RentalsCtrl.createRntals);

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
            return res.json(filteredRentals);
        });
});

module.exports = router;