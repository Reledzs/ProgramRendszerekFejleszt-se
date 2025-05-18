"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CarSchema = new mongoose_1.default.Schema({
    brand: { type: String, required: true },
    car_model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    image_address: { type: String, require: false },
    available: { type: Number, required: false },
    imagePath: { type: String, required: false }
});
//hook mentés előtti hashelés
CarSchema.pre('save', function (next) {
    const car = this;
    //hashing+salt
    next();
});
//QuizSchema.methods.comparePassword = function(candidatePassword: string, callback:(error:Error|null, isMatch:boolean)=>void):void{
//    const user = this;
//
//};
exports.Car = mongoose_1.default.model('Car', CarSchema);
//# sourceMappingURL=Car.js.map