import mongoose, {Document,Model,Schema} from 'mongoose';

export interface ICar extends Document {
    brand: string;
    car_model: string;
    year: number;
    price: number;
    image_address: string;
    available?: number;
    imagePath?: string;
}

const CarSchema: Schema<ICar> = new mongoose.Schema({
    brand: { type: String, required: true },
    car_model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    image_address: {type: String, require: false},
    available: { type: Number, required: false },
    imagePath: { type: String, required: false }
});

//hook mentés előtti hashelés
CarSchema.pre<ICar>('save',function(next){
    const car=this;
    //hashing+salt
    next();
});

//QuizSchema.methods.comparePassword = function(candidatePassword: string, callback:(error:Error|null, isMatch:boolean)=>void):void{
//    const user = this;
//
//};

export const Car: Model<ICar> = mongoose.model<ICar>('Car', CarSchema);