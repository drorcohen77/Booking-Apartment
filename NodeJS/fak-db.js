const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const fakeData = require('./data.json');

class FakeDb {

    constructor() {

        this.rentals = fakeData.rentals;
        this.users = fakeData.users;
        // this.rentals = [{
        //         title: "Nice view on ocean",
        //         city: "Tel Aviv",
        //         street: "Rotshild 145",
        //         category: "condo",
        //         image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        //         bedrooms: 4,
        //         shared: true,
        //         description: "Very nice apartment in center of the city.",
        //         dailyRate: 43
        //     },
        //     {
        //         title: "Modern apartment in center",
        //         city: "New York",
        //         street: "Time Square",
        //         category: "apartment",
        //         image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        //         bedrooms: 1,
        //         shared: false,
        //         description: "Very nice apartment in center of the city.",
        //         dailyRate: 11
        //     },
        //     {
        //         title: "Old house in nature",
        //         city: "Spisska Nova Ves",
        //         street: "Banicka 1",
        //         category: "house",
        //         image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        //         bedrooms: 5,
        //         shared: true,
        //         description: "Very nice apartment in center of the city.",
        //         dailyRate: 23
        //     }
        // ];

        // this.users = [{
        //         username: "Test user",
        //         email: "test@gmail.com",
        //         password: "testtest"
        //     },
        //     {
        //         username: "Test user1",
        //         email: "test1@gmail.com",
        //         password: "testtest1"
        //     },
        //     {
        //         username: "Test user2",
        //         email: "test2@gmail.com",
        //         password: "testtest2"
        //     }
        // ];
    }

    async cleanDb() {
        await User.deleteMany({});
        await Rental.deleteMany({});
        // await Booking.deleteMany({});
    }

    pushRentalsToDb() {
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);
        // const user3 = new User(this.users[2]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental)
            newRental.save();
        });
        user.save();
        user2.save();
        // user3.save();
    }

    async seeDb() {
        await this.cleanDb();
        this.pushRentalsToDb();
    }
}

module.exports = FakeDb;