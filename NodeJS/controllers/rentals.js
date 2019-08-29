const Rental = require('../models/rental');
const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose.js');


exports.createRntals = function(req, res) {
    const { title, city, street, category, image, shared, bedroom, description, dailyRate } = req.body;
    const user = res.locals.user;

    const rental = new Rental({ title, city, street, category, image, shared, bedroom, description, dailyRate });
    rental.user = user;

    Rental.create(rental, function(err, newRental) {
        if (err) {
            return res.status(422).send({ errors: MongooseHelpers.normalizeErrors(err.errors) });
        }

        User.update({ _id: user.id }, { $push: { rentals: newRental } }, function() {});

        return res.json(newRental);
    });
}