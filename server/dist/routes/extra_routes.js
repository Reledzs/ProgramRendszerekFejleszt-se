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
exports.extraRoutes = void 0;
const Extra_1 = require("../model/Extra");
const extraRoutes = (passport, router) => {
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
        const details = req.body.details;
        const extra = new Extra_1.Extra({ name: name, price: price, details: details });
        extra.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    });
    router.post('/update_extra/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, name, price, details } = req.body;
        try {
            const updateFields = {
                name,
                price,
                details,
            };
            const updatedExtra = yield Extra_1.Extra.findByIdAndUpdate(_id, updateFields, { new: true });
            if (!updatedExtra) {
                res.status(404).send({ error: 'Extra nem található.' });
            }
            else {
                res.status(200).send(updatedExtra);
            }
            ;
        }
        catch (error) {
            console.error('Frissítési hiba:', error);
            res.status(500).send(error);
        }
    }));
    router.delete('/delete_extra/:id', (req, res) => {
        const deletedextra = Extra_1.Extra.findByIdAndDelete(req.params.id);
        deletedextra.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.send(error);
        });
    });
    router.get('/:id', (req, res) => {
        const ExtraId = req.params.id;
        const extra = Extra_1.Extra.findById(ExtraId);
        extra.then(data => {
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
exports.extraRoutes = extraRoutes;
//# sourceMappingURL=extra_routes.js.map