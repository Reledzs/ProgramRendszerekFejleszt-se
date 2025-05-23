export interface BookingDetails {
    _id: string,
    bookingDate: Date,
    startDate: Date,
    endDate: Date,
    status: "active"|"completed"|"canceled",
    total: Number,
    userEmail: string,
    carBrand: string,
    carModel: string,
    extras: string[]
}