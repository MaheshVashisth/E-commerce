// !mdgum
const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
const crypto  = require("crypto");


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        
    },
    lastname:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },isBlocked:{
       type:Boolean,
       default:false
    },
    cart:{
        type:Array,
        default:[]

    },
    passwordChangetAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    address:[{type:mongoose.Schema.Types.ObjectId,ref:"Address"}],
    wishlist:[{type:mongoose.Schema.Types.ObjectId,ref:"Product"}],
    refreshToken:{
        type:String
    }


},{
    timestamps:true,
});

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
const salt = await bcrypt.genSaltSync(10);
this.password = await bcrypt.hash(this.password,salt);

});
userSchema.methods.isPasswordMatched = async function(enterPaswword){
    return await bcrypt.compare(enterPaswword,this.password);
}
userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now()+10*60*1000;
    return resetToken;
}

//Export the model
module.exports = mongoose.model('User', userSchema);