import mongoose, {Document,Model,Schema} from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_FACTOR=10;

interface IUser extends Document{
    email:string;
    name?: string;
    address?:string;
    nickname?:string;
    password: string;
    role?: "User" | "Admin";
    comparePassword: (candidatePassword: string, callback:(error:Error|null, isMatch:boolean)=>void)=>void;
    isAdmin: (callback:(error:Error|null, isMatch:boolean)=>void)=>void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
        email: { type:String, required: true},
        name: {type: String, required:false},
        address: {type: String, required:false},
        nickname: {type: String, required:false},
        password: {type: String, required:true},
        role: {type: String, required:false}
});

//hook mentés előtti hashelés
UserSchema.pre<IUser>('save',function(next){
    const user=this;
    //hashing+salt
    user.role="User";
    bcrypt.genSalt(SALT_FACTOR,(error,salt)=>{
        if(error){
            return next(error);
        }
        bcrypt.hash(user.password,salt,(err,encrypted)=>{
            if(err){
                return next(err);
            }
            user.password=encrypted;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword: string, callback:(error:Error|null, isMatch:boolean)=>void):void{
    const user = this;
    bcrypt.compare(candidatePassword,user.password,(error,isMatch)=>{
        if(error){
            callback(error,false);
        }
        callback(null,isMatch);
    });
};
UserSchema.methods.isAdmin = function(callback:(error:Error|null, isMatch:boolean)=>void):void{
    const user = this;
    if(user.usertype==="Admin"){
        callback(null,true);
    }
    else{
        callback(null,false);
    }
};

export const User: Model<IUser> = mongoose.model<IUser>('User',UserSchema);