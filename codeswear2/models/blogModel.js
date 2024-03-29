const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:String,
        required:true,
        unique:true,
    },
    numView:{
        type:Number,
        default:0
    },
    isLiked:{
        type:Boolean,
        default:false
    },
    isDisLiked:{
        type:Boolean,
        default:false
    },
    likes:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        }

    ],
    dislikes:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        }

    ],
    images:[]
    ,author:{
        type:String,
        default:"Admin"
    }
},{
    toJson:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },timestamps:true
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);