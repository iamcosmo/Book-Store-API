import mongoose from "mongoose";
const userdataSchema = mongoose.Schema({
    
    username: {
      type: String,
      required: true,
      unique: true,  
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type:String,
        required:true,
        enum: ['Admin', 'User'],
        default: 'User',
    }
});

const UserDataModel = mongoose.model("UsersData", userdataSchema);
export default UserDataModel;