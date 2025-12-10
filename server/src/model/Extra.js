"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extra = void 0;
var mongoose_1 = require("mongoose");
var ExtraSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    details: { type: String, required: true }
});
exports.Extra = mongoose_1.default.model('Extra', ExtraSchema);
