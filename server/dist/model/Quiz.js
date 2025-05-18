"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QuizSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    creator: { type: String, required: true },
    tags: { type: [String], required: false }, // Tömbként kell definiálni
    questions: { type: [[String]], required: true }, // Tömbök tömbjeként kell definiálni
    answeres: { type: [Number], required: true }, // Számok tömbje
    points: { type: [Number], required: true } // Számok tömbje
});
//hook mentés előtti hashelés
QuizSchema.pre('save', function (next) {
    const quiz = this;
    //hashing+salt
});
//QuizSchema.methods.comparePassword = function(candidatePassword: string, callback:(error:Error|null, isMatch:boolean)=>void):void{
//    const user = this;
//
//};
exports.Quiz = mongoose_1.default.model('Quiz', QuizSchema);
//# sourceMappingURL=Quiz.js.map