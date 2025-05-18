"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
exports.isCarAvailable = isCarAvailable;
const Car_1 = require("../model/Car");
const Extra_1 = require("../model/Extra");
const Booking_1 = require("../model/Booking");
const mongoose_1 = __importDefault(require("mongoose"));
function isCarAvailable(carId, start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        const overlappingBookings = yield Booking_1.Booking.find({
            car: carId,
            status: 'active',
            startDate: { $lte: end },
            endDate: { $gte: start }
        });
        return overlappingBookings.length === 0;
    });
}
const bookingRoutes = (passport, router) => {
    router.get('/all_bookings_with_details', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookings = yield Booking_1.Booking.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'cars',
                        localField: 'car',
                        foreignField: '_id',
                        as: 'carDetails'
                    }
                },
                {
                    $unwind: '$userDetails'
                },
                {
                    $unwind: '$carDetails'
                },
                { $lookup: {
                        from: 'extras',
                        localField: 'extras',
                        foreignField: '_id',
                        as: 'extraDetails'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        startDate: 1,
                        endDate: 1,
                        bookingDate: 1,
                        status: 1,
                        total: 1,
                        extras: '$extraDetails.name',
                        'userEmail': '$userDetails.email',
                        'carBrand': '$carDetails.brand',
                        'carModel': '$carDetails.car_model'
                    }
                }
            ]);
            res.status(200).json(bookings);
        }
        catch (err) {
            console.error('Hiba lekérdezés során:', err);
            res.status(500).json({ message: 'Szerver hiba' });
        }
    }));
    router.get('/mybookings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const id = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.userid;
        try {
            const bookings = yield Booking_1.Booking.aggregate([
                {
                    $match: { user: new mongoose_1.default.Types.ObjectId(id) }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $unwind: '$userDetails'
                },
                {
                    $lookup: {
                        from: 'cars',
                        localField: 'car',
                        foreignField: '_id',
                        as: 'carDetails'
                    }
                },
                {
                    $unwind: '$carDetails'
                },
                {
                    $lookup: {
                        from: 'extras',
                        localField: 'extras',
                        foreignField: '_id',
                        as: 'extraDetails'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        startDate: 1,
                        endDate: 1,
                        bookingDate: 1,
                        status: 1,
                        total: 1,
                        extras: '$extraDetails.name',
                        userEmail: '$userDetails.email',
                        carBrand: '$carDetails.brand',
                        carModel: '$carDetails.car_model'
                    }
                }
            ]);
            res.status(200).json(bookings);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hiba a foglalások lekérésekor.' });
        }
    }));
    router.get('/list_bookings', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Booking_1.Booking.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    //Add Car
    router.post('/add_booking', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { car, startDate, endDate, extras } = req.body;
            const user = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.userid;
            const start = new Date(startDate);
            const end = new Date(endDate);
            const overlappingBookings = yield Booking_1.Booking.find({
                car: car,
                status: { $ne: 'canceled' },
                $or: [
                    {
                        startDate: { $lte: end },
                        endDate: { $gte: start }
                    }
                ]
            });
            if (overlappingBookings.length > 0) {
                res.status(400).send('Az adott időszakban már van érvényes foglalás.');
            }
            else {
                const carDoc = yield Car_1.Car.findById(car);
                let total = 0;
                let days = 0;
                if (carDoc === null || carDoc === void 0 ? void 0 : carDoc.price) {
                    const durationInMs = end.getTime() - start.getTime();
                    days = Math.ceil(durationInMs / (1000 * 60 * 60 * 24)) + 1;
                    total = carDoc.price * days;
                }
                if (extras && Array.isArray(extras) && extras.length > 0) {
                    const extrasData = yield Extra_1.Extra.find({ _id: { $in: extras } });
                    const extrasTotalPerDay = extrasData.reduce((sum, extra) => {
                        return sum + (extra.price || 0);
                    }, 0);
                    total += extrasTotalPerDay * days;
                }
                const booking = new Booking_1.Booking({
                    car,
                    user,
                    extras,
                    startDate: start,
                    endDate: end,
                    bookingDate: Date.now(),
                    total
                });
                const savedBooking = yield booking.save();
                res.status(200).send(savedBooking);
            }
        }
        catch (error) {
            console.error('Foglalás mentési hiba:', error);
            res.status(500).send('Szerverhiba.');
        }
    }));
    router.put('/user_cancel_booking/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingId = req.params.id;
        try {
            const booking = yield Booking_1.Booking.findById(bookingId);
            if (!booking)
                res.status(404).json({ message: 'Foglalás nem található' });
            else {
                if (req.session.user && booking.user.toString() != req.session.user.toString()) {
                    res.status(404).json({ message: 'Session hiba!' });
                }
                else {
                    const startDate = new Date(booking.startDate);
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(0, 0, 0, 0);
                    if (startDate > tomorrow) {
                        booking.status = 'canceled';
                        yield booking.save();
                        res.status(200).json({ message: 'Foglalás sikeresen lemondva' });
                    }
                    else {
                        res.status(400).json({ message: 'A foglalás már elkezdődött vagy holnap kezdődik, nem mondható le' });
                    }
                }
            }
        }
        catch (error) {
            console.error('Lemondási hiba:', error);
            res.status(500).json({ message: 'Szerverhiba a lemondás során' });
        }
    }));
    router.put('/admin_canceled_booking/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingId = req.params.id;
        try {
            const booking = yield Booking_1.Booking.findById(bookingId);
            if (!booking)
                res.status(404).json({ message: 'Foglalás nem található' });
            else {
                if (req.session.user && !req.session.user.isAdmin) {
                    res.status(404).json({ message: 'Session hiba!' });
                }
                else {
                    booking.status = 'canceled';
                    yield booking.save();
                    res.status(200).json({ message: 'Foglalás sikeresen lemondva' });
                }
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Szerverhiba a lemondás során' });
        }
    }));
    router.put('/admin_completed_booking/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const bookingId = req.params.id;
        try {
            const booking = yield Booking_1.Booking.findById(bookingId);
            if (!booking)
                res.status(404).json({ message: 'Foglalás nem található' });
            else {
                if (req.session.user && !req.session.user.isAdmin) {
                    res.status(404).json({ message: 'Session hiba!' });
                }
                else {
                    booking.status = 'completed';
                    yield booking.save();
                    res.status(200).json({ message: 'Foglalás sikeresen lemondva' });
                }
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Szerverhiba a lemondás során' });
        }
    }));
    router.get('/car_bookings/:carId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { carId } = req.params;
            const bookings = yield Booking_1.Booking.find({
                car: carId,
                status: { $ne: 'canceled' }
            }).select('startDate endDate');
            const bookedRanges = bookings.map(b => ({
                start: b.startDate,
                end: b.endDate
            }));
            res.json(bookedRanges);
        }
        catch (err) {
            console.error('Hiba a foglalások lekérdezésekor:', err);
            res.status(500).send('Szerverhiba');
        }
    }));
    return router;
};
exports.bookingRoutes = bookingRoutes;
//# sourceMappingURL=booking_routes.js.map