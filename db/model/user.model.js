import mongoose, {Schema,model} from "mongoose";
import {hashPassword} from "../../middleware/auth.js"

const UserSchema =new Schema ({
username :{
    type : String ,
    minlength:[3 , " the min char is 3"],
    maxlength : [10 , "ethe max char is 10 "],
    required :[true , "username is required"]  ,

},
email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        // Regular expression for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please provide a valid email address",
    },
  },
password : {
    type : String ,
    required : [true , "password is required"],
},
messages:[
  {
    type: mongoose.Types.ObjectId,
    ref :"Message"
  }
]

,
phone : {
    
    type : String ,
    default: null,
} 

},{
    timestamps : true
})


// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
      this.password = await hashPassword(this.password);
  }
  next();
});

const userModel = model("User" , UserSchema);
export default userModel 