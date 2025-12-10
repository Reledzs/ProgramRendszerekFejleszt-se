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
exports.extraRoutes = void 0;
var Extra_1 = require("../model/Extra");
var extraRoutes = function (passport, router) {
    router.get('/list_extras', function (req, res) {
        if (req.isAuthenticated()) {
            var query = Extra_1.Extra.find();
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
    router.post('/add_extra', function (req, res) {
        var name = req.body.name;
        var price = req.body.price;
        var details = req.body.details;
        var extra = new Extra_1.Extra({ name: name, price: price, details: details });
        extra.save().then(function (data) {
            res.status(200).send(data);
        }).catch(function (error) {
            res.send(error);
        });
    });
    router.post('/update_extra/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _id, name, price, details, updateFields, updatedExtra, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, _id = _a._id, name = _a.name, price = _a.price, details = _a.details;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    updateFields = {
                        name: name,
                        price: price,
                        details: details,
                    };
                    return [4 /*yield*/, Extra_1.Extra.findByIdAndUpdate(_id, updateFields, { new: true })];
                case 2:
                    updatedExtra = _b.sent();
                    if (!updatedExtra) {
                        res.status(404).send({ error: 'Extra nem található.' });
                    }
                    else {
                        res.status(200).send(updatedExtra);
                    }
                    ;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error('Frissítési hiba:', error_1);
                    res.status(500).send(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    router.delete('/delete_extra/:id', function (req, res) {
        var deletedextra = Extra_1.Extra.findByIdAndDelete(req.params.id);
        deletedextra.then(function (data) {
            res.status(200).send(data);
        }).catch(function (error) {
            res.send(error);
        });
    });
    router.get('/:id', function (req, res) {
        var ExtraId = req.params.id;
        var extra = Extra_1.Extra.findById(ExtraId);
        extra.then(function (data) {
            res.status(200).send(data);
        }).catch(function (error) {
            res.status(500).send('Internal server error.');
        }).catch(function (error) {
            res.send(error);
        });
    });
    //
    return router;
};
exports.extraRoutes = extraRoutes;
