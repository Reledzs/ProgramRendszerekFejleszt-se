"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
var mongoose_1 = require("mongoose");
var RentSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose_1.Schema.Types.ObjectId, ref: "Car", required: true },
    extras: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Extra", required: false },
    bookingDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "completed", "canceled"], default: "active" },
    total: { type: Number, required: true }
});
exports.Booking = mongoose_1.default.model("Booking", RentSchema);
