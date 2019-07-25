const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose.js');
const moment = require('moment');


exports.createBooking = (req, res) => {
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
    const userB = res.locals.user;

    const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

    Rental.findById(rental._id)
        .populate('booking')
        .populate('user')
        .exec(function(err, foundRental) {
            if (err) {
                return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
            }

            if (foundRental.user.id === userB.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'Cannot create booking on your Rental!' }] });
            }

            if (isValidBooking(booking, foundRental)) {
                booking.user = userB;
                booking.rental = foundRental;
                foundRental.booking.push(booking);

                booking.save(function(err) {
                    if (err) {
                        return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
                    }
                    foundRental.save();
                    User.update({ _id: userB.id }, { $push: { bookings: booking } }, function() {});

                    return res.json({ startAt: booking.startAt, endAt: booking.endAt });
                });

            } else {
                return res.status(422).send({ errors: [{ title: 'Invalid Booking!', detail: 'Choosen dates are already taken!' }] });
            }

            return res.json({ booking, foundRental });
        });
}

function isValidBooking(proposedbooking, rental) {
    let isValid = true;

    if (rental.booking && rental.booking.length > 0) {

        isValid = rental.booking.every(function(booking) {
            const proposedStart = moment(proposedbooking.startAt);
            const proposedEnd = moment(proposedbooking.endAt);

            const actualStart = moment(booking.startAt);
            const actualEnd = moment(booking.endtAt);


            return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
        });
    }
}