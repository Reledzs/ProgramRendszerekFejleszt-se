"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_FACTOR = 10;
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    name: { type: String, required: false },
    address: { type: String, required: false },
    nickname: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: false }
});
//hook mentés előtti hashelés
UserSchema.pre('save', function (next) {
    const user = this;
    //hashing+salt
    user.role = "User";
    bcrypt_1.default.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt_1.default.hash(user.password, salt, (err, encrypted) => {
            if (err) {
                return next(err);
            }
            user.password = encrypted;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    const user = this;
    bcrypt_1.default.compare(candidatePassword, user.password, (error, isMatch) => {
        if (error) {
            callback(error, false);
        }
        callback(null, isMatch);
    });
};
UserSchema.methods.isAdmin = function (callback) {
    const user = this;
    if (user.usertype === "Admin") {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.User = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map