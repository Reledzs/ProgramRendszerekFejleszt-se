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
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const User_1 = require("../model/User");
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
                            req.session.user = {
                                userid: user._id,
                                role: user.role,
                                isAdmin: user.role == "Admin"
                            };
                            res.status(200).send(req.session.user);
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
            res.status(200).send(true);
        }
        else {
            res.status(200).send(false);
        }
    });
    router.get('/checkAdmin', (req, res) => {
        var _a;
        if (req.isAuthenticated()) {
            if (((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.isAdmin) == true)
                res.status(200).send(true);
            else {
                res.status(200).send(false);
            }
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.delete('/delete_user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // check for Admin MISSING
        try {
            if (req.isAuthenticated()) {
                if (((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.isAdmin) == true) {
                    const existingCar = yield User_1.User.findById(req.params.id);
                    const deletedCar = User_1.User.findByIdAndDelete(req.params.id);
                    deletedCar.then(data => {
                        res.status(200).send(data);
                    }).catch(error => {
                        res.send(error);
                    });
                }
                else {
                    res.send("Not logged in as admin");
                }
            }
            else {
                res.send("Not logged in!");
            }
        }
        catch (_b) {
            res.send("Szerver hiba!");
        }
    }));
    router.post('/update_user/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, email, name, address, nickname, role } = req.body;
        try {
            const updateFields = {
                email,
                name,
                address,
                nickname,
                role,
            };
            const updatedUser = yield User_1.User.findByIdAndUpdate(_id, updateFields, { new: true });
            if (!updatedUser) {
                res.status(404).send({ error: 'Felhasználó nem található.' });
            }
            res.status(200).send(updatedUser);
        }
        catch (error) {
            console.error('Frissítési hiba:', error);
            res.status(500).send(error);
        }
        ;
    }));
    return router;
};
exports.configureRoutes = configureRoutes;
//# sourceMappingURL=routes.js.map