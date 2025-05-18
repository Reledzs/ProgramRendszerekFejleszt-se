"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const User_1 = require("../model/User");
const Car_1 = require("../model/Car");
const Extra_1 = require("../model/Extra");
const Rent_1 = require("../model/Rent");
const configureRoutes = (passport, router) => {
    router.get('/', (req, res) => {
        res.status(200).send('Hello, World!');
    });
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/register', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const user = new User_1.User({ email: email, password: password, name: name, address: address, nickname: nickname });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    });
    router.post('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/getAllUsers', (req, res) => {
        if (req.isAuthenticated()) {
            const query = User_1.User.find();
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
    router.get('/checkAuth', (req, res) => {
        if (req.isAuthenticated()) {
            console.log("checked auth t");
            res.status(200).send(true);
        }
        else {
            console.log("checked auth f");
            res.status(500).send(false);
        }
    });
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
    //Rent
    router.get('/list_rent', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Rent_1.Rent.find();
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
    //Add Rent
    router.post('/add_rent', (req, res) => {
        const user = req.body.user;
        const car = req.body.car;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const status = req.body.status;
        const extras = req.body.extras;
        const rent = new Rent_1.Rent({ user: user, car: car, startDate: startDate, endDate: endDate, status: status, extras: extras });
        rent.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    });
    //Update Rent
    router.post('/update_rent', (req, res) => {
        //TODO
    });
    //Delete Rent
    router.delete('/delete_rent', (req, res) => {
        //check for admin
        const deletedRent = Rent_1.Rent.findByIdAndDelete(req.params.id);
        deletedRent.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    });
    //Extras
    router.get('/list_extras', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Extra_1.Extra.find();
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
    router.post('/add_extra', (req, res) => {
        const name = req.body.name;
        const price = req.body.price;
        const extra = new Extra_1.Extra({ name: name, price: price });
        extra.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    });
    //Update Extra
    router.post('/update_extra', (req, res) => {
        //TODO
    });
    //Delete Extra
    router.get('/delete_extra', (req, res) => {
        const deletedextra = Extra_1.Extra.findByIdAndDelete(req.params.id);
        deletedextra.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    });
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
exports.configureRoutes = configureRoutes;
//# sourceMappingURL=routes%20copy.js.map