const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        default: Date.now()
    },
    areClerk:{
        type: Boolean,
        default: false
    }

});

userSchema.pre("save", function (next){
    let user = this;


    //generate a uniqure salt
    bcrypt.genSalt(10)
    .then(salt => {
        //Hash the pass
        bcrypt.hash(user.password,salt)
        .then(hashedPwd =>{
            //password has hashed

            user.password = hashedPwd;
            next();
        })
        .catch(err =>{
            console.log(`Error occured when hashing : ${err}`);
        })
    })
    .catch(err => {
        console.log(`Error occured when salting : ${err}`);
    })

});

const userModel = mongoose.model("users",userSchema)

module.exports = userModel;