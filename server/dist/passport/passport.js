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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_local_1 = require("passport-local");
const User_1 = require("../model/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const configurePassport = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log('user is deserialized.');
        done(null, user);
    });
    passport.use('local', new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    })));
    return passport;
};
exports.configurePassport = configurePassport;
//# sourceMappingURL=passport.js.map