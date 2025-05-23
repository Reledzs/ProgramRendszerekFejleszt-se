export interface Booking{
    _id?: string;
    user?: string; // Bérelő user
    car: string;  // Bérelhető autó
    extras?: string[]; //Bérelhető extrák
    bookingDate?: Date;
    startDate: Date;
    endDate: Date;
    status?: "active" | "completed" | "cancelled";
    total?: Number;
}