const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: String,
        min: [4, 'too short, min is 4 characters'],
        max: [32, 'too long, max is 128 characters']
    },
    email: {
        type: String,
        require: 'Email is required',
        min: [4, 'too short, min is 4 characters'],
        max: [32, 'too long, max is 128 characters'],
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
            // regExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: 'Password is required',
        min: [4, 'too short, min is 4 characters'],
        max: [32, 'too long, max is 128 characters'],
    },
    rentals: [{ type: Schema.Types.ObjectId, ref: 'Rentals' }],
    booking: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

userSchema.methods.hasSamePassword = function(requistedPassword) {

    return bcrypt.compareSync(requistedPassword, this.password);
}

userSchema.pre('save', function(next) {

    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) { // Store hash in your password DB.
            user.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model('Users', userSchema);