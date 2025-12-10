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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
exports.isCarAvailable = isCarAvailable;
var Car_1 = require("../model/Car");
var Extra_1 = require("../model/Extra");
var Booking_1 = require("../model/Booking");
var mongoose_1 = require("mongoose");
function isCarAvailable(carId, start, end) {
    return __awaiter(this, void 0, void 0, function () {
        var overlappingBookings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Booking_1.Booking.find({
                        car: carId,
                        status: 'active',
                        startDate: { $lte: end },
                        endDate: { $gte: start }
                    })];
                case 1:
                    overlappingBookings = _a.sent();
                    return [2 /*return*/, overlappingBookings.length === 0];
            }
        });
    });
}
var bookingRoutes = function (passport, router) {
    router.get('/all_bookings_with_details', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var bookings, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Booking_1.Booking.aggregate([
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
                        ])];
                case 1:
                    bookings = _a.sent();
                    res.status(200).json(bookings);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Hiba lekérdezés során:', err_1);
                    res.status(500).json({ message: 'Szerver hiba' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    router.get('/mybookings', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, bookings, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.userid;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Booking_1.Booking.aggregate([
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
                        ])];
                case 2:
                    bookings = _b.sent();
                    res.status(200).json(bookings);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error(error_1);
                    res.status(500).json({ message: 'Hiba a foglalások lekérésekor.' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    router.get('/list_bookings', function (req, res) {
        if (req.isAuthenticated()) {
            var query = Booking_1.Booking.find();
            query.then(function (data) {
                res.status(200).send(data);
            }).catch(function (error) {
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    //Add Car
    router.post('/add_booking', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, car, startDate, endDate, extras, user, start, end, overlappingBookings, carDoc, total, days, durationInMs, extrasData, extrasTotalPerDay, booking, savedBooking, error_2;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 8, , 9]);
                    _a = req.body, car = _a.car, startDate = _a.startDate, endDate = _a.endDate, extras = _a.extras;
                    user = (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.userid;
                    start = new Date(startDate);
                    end = new Date(endDate);
                    return [4 /*yield*/, Booking_1.Booking.find({
                            car: car,
                            status: { $ne: 'canceled' },
                            $or: [
                                {
                                    startDate: { $lte: end },
                                    endDate: { $gte: start }
                                }
                            ]
                        })];
                case 1:
                    overlappingBookings = _c.sent();
                    if (!(overlappingBookings.length > 0)) return [3 /*break*/, 2];
                    res.status(400).send('Az adott időszakban már van érvényes foglalás.');
                    return [3 /*break*/, 7];
                case 2: return [4 /*yield*/, Car_1.Car.findById(car)];
                case 3:
                    carDoc = _c.sent();
                    total = 0;
                    days = 0;
                    if (carDoc === null || carDoc === void 0 ? void 0 : carDoc.price) {
                        durationInMs = end.getTime() - start.getTime();
                        days = Math.ceil(durationInMs / (1000 * 60 * 60 * 24)) + 1;
                        total = carDoc.price * days;
                    }
                    if (!(extras && Array.isArray(extras) && extras.length > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Extra_1.Extra.find({ _id: { $in: extras } })];
                case 4:
                    extrasData = _c.sent();
                    extrasTotalPerDay = extrasData.reduce(function (sum, extra) {
                        return sum + (extra.price || 0);
                    }, 0);
                    total += extrasTotalPerDay * days;
                    _c.label = 5;
                case 5:
                    booking = new Booking_1.Booking({
                        car: car,
                        user: user,
                        extras: extras,
                        startDate: start,
                        endDate: end,
                        bookingDate: Date.now(),
                        total: total
                    });
                    return [4 /*yield*/, booking.save()];
                case 6:
                    savedBooking = _c.sent();
                    res.status(200).send(savedBooking);
                    _c.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_2 = _c.sent();
                    console.error('Foglalás mentési hiba:', error_2);
                    res.status(500).send('Szerverhiba.');
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
    router.put('/user_cancel_booking/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var bookingId, booking, startDate, tomorrow, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookingId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, Booking_1.Booking.findById(bookingId)];
                case 2:
                    booking = _a.sent();
                    if (!!booking) return [3 /*break*/, 3];
                    res.status(404).json({ message: 'Foglalás nem található' });
                    return [3 /*break*/, 7];
                case 3:
                    if (!(req.session.user && booking.user.toString() != req.session.user.toString())) return [3 /*break*/, 4];
                    res.status(404).json({ message: 'Session hiba!' });
                    return [3 /*break*/, 7];
                case 4:
                    startDate = new Date(booking.startDate);
                    tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(0, 0, 0, 0);
                    if (!(startDate > tomorrow)) return [3 /*break*/, 6];
                    booking.status = 'canceled';
                    return [4 /*yield*/, booking.save()];
                case 5:
                    _a.sent();
                    res.status(200).json({ message: 'Foglalás sikeresen lemondva' });
                    return [3 /*break*/, 7];
                case 6:
                    res.status(400).json({ message: 'A foglalás már elkezdődött vagy holnap kezdődik, nem mondható le' });
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_3 = _a.sent();
                    console.error('Lemondási hiba:', error_3);
                    res.status(500).json({ message: 'Szerverhiba a lemondás során' });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
    router.put('/admin_canceled_booking/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var bookingId, booking, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookingId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, Booking_1.Booking.findById(bookingId)];
                case 2:
                    booking = _a.sent();
                    if (!!booking) return [3 /*break*/, 3];
                    res.status(404).json({ message: 'Foglalás nem található' });
                    return [3 /*break*/, 6];
                case 3:
                    if (!(req.session.user && !req.session.user.isAdmin)) return [3 /*break*/, 4];
                    res.status(404).json({ message: 'Session hiba!' });
                    return [3 /*break*/, 6];
                case 4:
                    booking.status = 'canceled';
                    return [4 /*yield*/, booking.save()];
                case 5:
                    _a.sent();
                    res.status(200).json({ message: 'Foglalás sikeresen lemondva' });
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_4 = _a.sent();
                    res.status(500).json({ message: 'Szerverhiba a lemondás során' });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
    router.put('/admin_completed_booking/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var bookingId, booking, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookingId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, Booking_1.Booking.findById(bookingId)];
                case 2:
                    booking = _a.sent();
                    if (!!booking) return [3 /*break*/, 3];
                    res.status(404).json({ message: 'Foglalás nem található' });
                    return [3 /*break*/, 6];
                case 3:
                    if (!(req.session.user && !req.session.user.isAdmin)) return [3 /*break*/, 4];
                    res.status(404).json({ message: 'Session hiba!' });
                    return [3 /*break*/, 6];
                case 4:
                    booking.status = 'completed';
                    return [4 /*yield*/, booking.save()];
                case 5:
                    _a.sent();
                    res.status(200).json({ message: 'Foglalás sikeresen lemondva' });
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_5 = _a.sent();
                    res.status(500).json({ message: 'Szerverhiba a lemondás során' });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
    router.get('/car_bookings/:carId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var carId, bookings, bookedRanges, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    carId = req.params.carId;
                    return [4 /*yield*/, Booking_1.Booking.find({
                            car: carId,
                            status: { $ne: 'canceled' }
                        }).select('startDate endDate')];
                case 1:
                    bookings = _a.sent();
                    bookedRanges = bookings.map(function (b) { return ({
                        start: b.startDate,
                        end: b.endDate
                    }); });
                    res.json(bookedRanges);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error('Hiba a foglalások lekérdezésekor:', err_2);
                    res.status(500).send('Szerverhiba');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    return router;
};
exports.bookingRoutes = bookingRoutes;
