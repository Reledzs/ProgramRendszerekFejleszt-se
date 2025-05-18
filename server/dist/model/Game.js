"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GameSchema = new mongoose_1.default.Schema({
    brand: { type: String, required: true },
    type: { type: String, required: true },
    year: { type: Number, required: true },
    rental_price: { type: Number, required: true },
    available: { type: Number, required: false },
});
//hook mentés előtti hashelés
GameSchema.pre('save', function (next) {
    const car = this;
    //hashing+salt
});
//QuizSchema.methods.comparePassword = function(candidatePassword: string, callback:(error:Error|null, isMatch:boolean)=>void):void{
//    const user = this;
//
//};
exports.Car = mongoose_1.default.model('Car', GameSchema);
//# sourceMappingURL=Game.js.map