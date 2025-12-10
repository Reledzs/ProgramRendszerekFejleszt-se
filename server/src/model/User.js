"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var bcrypt_1 = require("bcrypt");
var SALT_FACTOR = 10;
var UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    name: { type: String, required: false },
    address: { type: String, required: false },
    nickname: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: false }
});
//hook mentés előtti hashelés
UserSchema.pre('save', function (next) {
    var user = this;
    //hashing+salt
    user.role = "User";
    bcrypt_1.default.genSalt(SALT_FACTOR, function (error, salt) {
        if (error) {
            return next(error);
        }
        bcrypt_1.default.hash(user.password, salt, function (err, encrypted) {
            if (err) {
                return next(err);
            }
            user.password = encrypted;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    var user = this;
    bcrypt_1.default.compare(candidatePassword, user.password, function (error, isMatch) {
        if (error) {
            callback(error, false);
        }
        callback(null, isMatch);
    });
};
UserSchema.methods.isAdmin = function (callback) {
    var user = this;
    if (user.usertype === "Admin") {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.User = mongoose_1.default.model('User', UserSchema);
