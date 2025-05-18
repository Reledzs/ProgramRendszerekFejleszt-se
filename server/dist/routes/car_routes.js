"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const Car_1 = require("../model/Car");
const upload_middleware_1 = require("../middleware/upload.middleware");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const carRoutes = (passport, router) => {
    router.get('/list_cars', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Car_1.Car.find();
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
    router.post('/add_car', upload_middleware_1.upload.single('image'), (req, res) => {
        if (req.file) {
            const imagePath = `/uploads/${req.file.filename}`;
            const { brand, car_model, year, price } = req.body;
            const car = new Car_1.Car({
                brand,
                car_model,
                year: Number(year),
                price: Number(price),
                imagePath
            });
            car.save()
                .then(data => res.status(200).send(data))
                .catch(error => {
                console.error('Mentési hiba:', error);
                res.status(500).send(error);
            });
        }
    });
    router.post('/update_car', upload_middleware_1.upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, brand, car_model, year, price } = req.body;
        if (!_id) {
            res.status(400).send({ error: 'Hiányzik az _id a kérésből.' });
        }
        try {
            const updateFields = {
                brand,
                car_model,
                year: Number(year),
                price: Number(price),
            };
            if (req.file) {
                updateFields.imagePath = `/uploads/${req.file.filename}`;
                const existingCar = yield Car_1.Car.findById(_id);
                if (existingCar === null || existingCar === void 0 ? void 0 : existingCar.imagePath) {
                    const oldPath = path.join(__dirname, '..', '..', '..', 'public', existingCar.imagePath);
                    fs.unlink(oldPath, (err) => {
                        if (err) {
                            console.warn('Nem sikerült törölni a régi képet:', err.message);
                        }
                    });
                }
            }
            const updatedCar = yield Car_1.Car.findByIdAndUpdate(_id, updateFields, { new: true });
            if (!updatedCar) {
                res.status(404).send({ error: 'Autó nem található.' });
            }
            res.status(200).send(updatedCar);
        }
        catch (error) {
            console.error('Frissítési hiba:', error);
            res.status(500).send(error);
        }
    }));
    router.delete('/delete_car/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const existingCar = yield Car_1.Car.findById(req.params.id);
        if (existingCar === null || existingCar === void 0 ? void 0 : existingCar.imagePath) {
            const oldPath = path.join(__dirname, '..', '..', '..', 'public', existingCar.imagePath);
            fs.unlink(oldPath, (err) => {
                if (err) {
                    console.warn('Nem sikerült törölni a régi képet:', err.message);
                }
            });
        }
        const deletedCar = Car_1.Car.findByIdAndDelete(req.params.id);
        deletedCar.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    }));
    router.get('/:id', (req, res) => {
        const carId = req.params.id;
        const car = Car_1.Car.findById(carId);
        car.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send('Internal server error.');
        }).catch(error => {
            res.send(error);
        });
    });
    return router;
};
exports.carRoutes = carRoutes;
//# sourceMappingURL=car_routes.js.map