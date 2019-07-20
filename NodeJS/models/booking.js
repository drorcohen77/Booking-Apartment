const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchem = new booking.Schem({
    endAt: {
        type: Date,
        required: "Ending Date is Required"
    },
    startAt: {
        type: Date,
        required: "Starting Date is Required"
    },
    totalPrice: Number,
    days: Number,
    quests: Number,
    createdAt: {
        type: Date,
        default: Date.Now
    },
    user: { type: mongoose.Schem.types.ObjectId, ref: 'Users' },
    rental: { type: mongoose.Schem.types.ObjectId, ref: 'Rentals' }
})

module.exports = mongoose.model('Booking', bookingSchem);