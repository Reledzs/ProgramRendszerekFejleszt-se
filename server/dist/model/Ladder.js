"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ladder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LadderSchema = new mongoose_1.default.Schema({
    gamename: { type: String, required: true },
    size: { type: Number, required: true },
    players: { type: [String], required: true },
    points: { type: [Number], required: true }
});
//hook mentés előtti hashelés
LadderSchema.pre('save', function (next) {
    const quiz = this;
    //hashing+salt
});
//QuizSchema.methods.comparePassword = function(candidatePassword: string, callback:(error:Error|null, isMatch:boolean)=>void):void{
//    const user = this;
//
//};
exports.Ladder = mongoose_1.default.model('Ladder', LadderSchema);
//# sourceMappingURL=Ladder.js.map