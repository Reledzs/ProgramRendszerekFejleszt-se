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
exports.configureRoutes = void 0;
var User_1 = require("../model/User");
var configureRoutes = function (passport, router) {
    router.get('/', function (req, res) {
        res.status(200).send('Hello, World!');
    });
    router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (error, user) {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, function (err) {
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
    router.post('/register', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        var address = req.body.address;
        var nickname = req.body.nickname;
        var user = new User_1.User({ email: email, password: password, name: name, address: address, nickname: nickname });
        user.save().then(function (data) {
            res.status(200).send(data);
        }).catch(function (error) {
            res.send(error);
        });
    });
    router.post('/logout', function (req, res) {
        if (req.isAuthenticated()) {
            req.logout(function (error) {
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
    router.get('/getAllUsers', function (req, res) {
        if (req.isAuthenticated()) {
            var query = User_1.User.find();
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
    router.get('/checkAuth', function (req, res) {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        }
        else {
            res.status(200).send(false);
        }
    });
    router.get('/checkAdmin', function (req, res) {
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
    router.delete('/delete_user/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var existingCar, deletedCar, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    if (!req.isAuthenticated()) return [3 /*break*/, 4];
                    if (!(((_b = req.session.user) === null || _b === void 0 ? void 0 : _b.isAdmin) == true)) return [3 /*break*/, 2];
                    return [4 /*yield*/, User_1.User.findById(req.params.id)];
                case 1:
                    existingCar = _c.sent();
                    deletedCar = User_1.User.findByIdAndDelete(req.params.id);
                    deletedCar.then(function (data) {
                        res.status(200).send(data);
                    }).catch(function (error) {
                        res.send(error);
                    });
                    return [3 /*break*/, 3];
                case 2:
                    res.send("Not logged in as admin");
                    _c.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    res.send("Not logged in!");
                    _c.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    _a = _c.sent();
                    res.send("Szerver hiba!");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
    router.post('/update_user/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _id, email, name, address, nickname, role, updateFields, updatedUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, _id = _a._id, email = _a.email, name = _a.name, address = _a.address, nickname = _a.nickname, role = _a.role;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    updateFields = {
                        email: email,
                        name: name,
                        address: address,
                        nickname: nickname,
                        role: role,
                    };
                    return [4 /*yield*/, User_1.User.findByIdAndUpdate(_id, updateFields, { new: true })];
                case 2:
                    updatedUser = _b.sent();
                    if (!updatedUser) {
                        res.status(404).send({ error: 'Felhasználó nem található.' });
                    }
                    res.status(200).send(updatedUser);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error('Frissítési hiba:', error_1);
                    res.status(500).send(error_1);
                    return [3 /*break*/, 4];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    }); });
    return router;
};
exports.configureRoutes = configureRoutes;
