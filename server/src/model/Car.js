"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
var mongoose_1 = require("mongoose");
var CarSchema = new mongoose_1.default.Schema({
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
    var car = this;
    //hashing+salt
    next();
});
//QuizSchema.methods.comparePassword = function(candidatePassword: string, callback:(error:Error|null, isMatch:boolean)=>void):void{
//    const user = this;
//
//};
exports.Car = mongoose_1.default.model('Car', CarSchema);
