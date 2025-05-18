import mongoose, {Document,Int32,Model,Schema} from 'mongoose';

interface IBooking extends Document {
    user: mongoose.Types.ObjectId; // Bérelő user
    car: mongoose.Types.ObjectId;  // Bérelhető autó
    extras?: mongoose.Types.ObjectId[]; //Bérelhető extrák
    bookingDate: Date;
    startDate: Date;
    endDate: Date;
    status: "active" | "completed" | "canceled";
    total: Number;
  }
  
  const RentSchema = new Schema<IBooking>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    extras: {type: [Schema.Types.ObjectId], ref:"Extra", required: false},
    bookingDate: {type:Date, required: true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "completed", "canceled"], default: "active" },
    total: {type: Number, required: true}
  });
  
  export const Booking = mongoose.model<IBooking>("Booking", RentSchema);