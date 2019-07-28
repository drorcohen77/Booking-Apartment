const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose.js');
const moment = require('moment');


exports.createBooking = (req, res) => {
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
    const userB = res.locals.user;

    const bookingA = new Booking({ startAt, endAt, totalPrice, guests, days });

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


            if (isValidBooking(bookingA, foundRental)) {
                bookingA.user = userB;
                bookingA.rental = foundRental;
                foundRental.booking.push(bookingA);
                // foundRental.save();
                // booking.save();
                // return res.json({ 'created': true });
                // return res.status(422).send(bookingA);

                // bookingA.save(function(err) {
                //     if (err) {
                //         return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
                //     }
                //     foundRental.save();
                //     User.update({ _id: userB.id }, { $push: { bookings: bookingA } }, function() {});

                //     return res.json({ startAt: bookingA.startAt, endAt: bookingA.endAt });
                // });
                bookingA.save()
                foundRental.save();
                User.update({ _id: userB.id }, { $push: { bookings: bookingA } }, function() {});

                return res.json({ startAt: bookingA.startAt, endAt: bookingA.endAt });


            } else {
                return res.status(422).send({ errors: [{ title: 'Invalid Booking!', detail: 'Choosen dates are already taken!' }] });
            }

            return res.json({ bookingA, foundRental });
        });
}

function isValidBooking(proposedBooking, rental) {
    let isValid = true;

    if (rental.booking && rental.booking.length > 0) {

        isValid = rental.booking.every(function(bookings) {
            const proposedStart = moment(proposedBooking.startAt);
            const proposedEnd = moment(proposedBooking.endAt);

            const actualStart = moment(bookings.startAt);
            const actualEnd = moment(bookings.endtAt);

            //         if ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart)) {
            //             return true;
            //         } else {
            //             return false;
            //         }
            //     });
            // }

            // return isValid;
            return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
        });
    }
    return isValid;
}