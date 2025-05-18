"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoutes = void 0;
const Car_1 = require("../model/Car");
const carRoutes = (passport, router) => {
    //GET cars
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
    //Add Car
    router.post('/add_car', (req, res) => {
        const brand = req.body.brand;
        const type = req.body.type;
        const year = req.body.year;
        const price = req.body.price;
        const car = new Car_1.Car({ brand: brand, type: type, year: year, price: price });
        car.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    });
    //Update Car
    router.post('/update_car', (req, res) => {
        //TODO 
    });
    //Delete Car
    router.delete('/delete_car', (req, res) => {
        // check for Admin MISSING
        const deletedCar = Car_1.Car.findByIdAndDelete(req.params.id);
        deletedCar.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    });
    //Get Car
    router.get('/:id', (req, res) => {
        const carId = req.params.id;
        // Adatbázisból lekérjük az autó adatait
        const car = Car_1.Car.findById(carId);
        car.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send('Internal server error.');
        }).catch(error => {
            res.send(error);
        });
    });
    //
    return router;
};
exports.carRoutes = carRoutes;
//# sourceMappingURL=car_routes%20copy%202.js.map