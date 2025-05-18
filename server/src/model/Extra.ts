import mongoose, {Document,Int32,Model,Schema} from 'mongoose';

interface IExtra extends Document {
    name: string;
    price: number;
    details: string;
}

const ExtraSchema: Schema<IExtra> = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    details: { type: String, required: true }
});


export const Extra: Model<IExtra> = mongoose.model<IExtra>('Extra',ExtraSchema);