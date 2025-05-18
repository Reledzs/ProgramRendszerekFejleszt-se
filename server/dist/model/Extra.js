"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extra = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ExtraSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    details: { type: String, required: true }
});
exports.Extra = mongoose_1.default.model('Extra', ExtraSchema);
//# sourceMappingURL=Extra.js.map