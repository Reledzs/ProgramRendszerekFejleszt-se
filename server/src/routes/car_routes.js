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
exports.carRoutes = void 0;
var Car_1 = require("../model/Car");
var upload_middleware_1 = require("../middleware/upload.middleware");
var fs = require("fs");
var path = require("path");
var carRoutes = function (passport, router) {
    router.get('/list_cars', function (req, res) {
        if (req.isAuthenticated()) {
            var query = Car_1.Car.find();
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
    router.post('/add_car', upload_middleware_1.upload.single('image'), function (req, res) {
        if (req.file) {
            var imagePath = "/uploads/".concat(req.file.filename);
            var _a = req.body, brand = _a.brand, car_model = _a.car_model, year = _a.year, price = _a.price;
            var car = new Car_1.Car({
                brand: brand,
                car_model: car_model,
                year: Number(year),
                price: Number(price),
                imagePath: imagePath
            });
            car.save()
                .then(function (data) { return res.status(200).send(data); })
                .catch(function (error) {
                console.error('Mentési hiba:', error);
                res.status(500).send(error);
            });
        }
    });
    router.post('/update_car', upload_middleware_1.upload.single('image'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _id, brand, car_model, year, price, updateFields, existingCar, oldPath, updatedCar, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, _id = _a._id, brand = _a.brand, car_model = _a.car_model, year = _a.year, price = _a.price;
                    if (!_id) {
                        res.status(400).send({ error: 'Hiányzik az _id a kérésből.' });
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, , 6]);
                    updateFields = {
                        brand: brand,
                        car_model: car_model,
                        year: Number(year),
                        price: Number(price),
                    };
                    if (!req.file) return [3 /*break*/, 3];
                    updateFields.imagePath = "/uploads/".concat(req.file.filename);
                    return [4 /*yield*/, Car_1.Car.findById(_id)];
                case 2:
                    existingCar = _b.sent();
                    if (existingCar === null || existingCar === void 0 ? void 0 : existingCar.imagePath) {
                        oldPath = path.join(__dirname, '..', '..', '..', 'public', existingCar.imagePath);
                        fs.unlink(oldPath, function (err) {
                            if (err) {
                                console.warn('Nem sikerült törölni a régi képet:', err.message);
                            }
                        });
                    }
                    _b.label = 3;
                case 3: return [4 /*yield*/, Car_1.Car.findByIdAndUpdate(_id, updateFields, { new: true })];
                case 4:
                    updatedCar = _b.sent();
                    if (!updatedCar) {
                        res.status(404).send({ error: 'Autó nem található.' });
                    }
                    res.status(200).send(updatedCar);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    console.error('Frissítési hiba:', error_1);
                    res.status(500).send(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    router.delete('/delete_car/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var existingCar, oldPath, deletedCar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Car_1.Car.findById(req.params.id)];
                case 1:
                    existingCar = _a.sent();
                    if (existingCar === null || existingCar === void 0 ? void 0 : existingCar.imagePath) {
                        oldPath = path.join(__dirname, '..', '..', '..', 'public', existingCar.imagePath);
                        fs.unlink(oldPath, function (err) {
                            if (err) {
                                console.warn('Nem sikerült törölni a régi képet:', err.message);
                            }
                        });
                    }
                    deletedCar = Car_1.Car.findByIdAndDelete(req.params.id);
                    deletedCar.then(function (data) {
                        res.status(200).send(data);
                    }).catch(function (error) {
                        res.send(error);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    router.get('/:id', function (req, res) {
        var carId = req.params.id;
        var car = Car_1.Car.findById(carId);
        car.then(function (data) {
            res.status(200).send(data);
        }).catch(function (error) {
            res.status(500).send('Internal server error.');
        }).catch(function (error) {
            res.send(error);
        });
    });
    return router;
};
exports.carRoutes = carRoutes;
