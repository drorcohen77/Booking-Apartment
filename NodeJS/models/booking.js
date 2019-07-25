const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    startAt: {
        type: Date,
        required: "Starting Date is Required"
    },
    endAt: {
        type: Date,
        required: "Ending Date is Required"
    },
    totalPrice: Number,
    days: Number,
    quests: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    rental: { type: Schema.Types.ObjectId, ref: 'Rentals' }
});

module.exports = mongoose.model('Booking', bookingSchema);