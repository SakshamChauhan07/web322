const userModel = require("../models/user");

const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/registration", (req,res) =>{
    res.render("user/registration");
});

router.get("/login", (req,res) =>{
    res.render("user/login");
});

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/user/login");
})

router.post("/registration",(req,res)=>{
    
    let errors = [];
    

    const user = new userModel({
        firstName :req.body.firstName,
        lastName :req.body.lastName,
        email :req.body.email,
        password :req.body.password,
        
        
    })
    
    if(user.email.length == 0){
        errors.push("E-Mail is Required");
        console.log("email not given");
        res.render("user/registration",{
            errors
        });
    }

    else if (user.firstName.length == 0){
        errors.push("Firstname is Required");
        console.log("FirstName not given");
        res.render("user/registration",{
            errors
        });
    }

    else if(user.lastName.length == 0){
        errors.push("Lastname is Required");
        console.log("lastName not given");
        res.render("user/registration",{
            errors
        });
    }
    

    else if(user.password.length == 0){
        errors.push("Password is Required");
        console.log("password not given");
        res.render("user/registration",{
            errors
        });
    }

    
    else{
        
        user.save()
        .then(userSaved =>
            {
                console.log(`User ${userSaved.firstName} has been added.`);
                res.redirect("/");
            })
            
            .catch(err =>{
                console.log(`Error adding user: ${err}`);
                res.redirect("/")
            });
    }
});
        
       

router.post("/login",(req,res)=>{
    let errors =  [];
    
    
        userModel.findOne({
            email: req.body.email
        })
        .then(user =>{
            //complete the search
            if (user){
                //found the user
                
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatched =>{
                    //Done comparing passwords

                    if (isMatched){
                        req.session.user = user;
                        req.session.isClerk = false;
                        
                        if (req.body.clerk_checkbox === "true"){
                            req.session.isClerk = true;
                            res.redirect("/clerk/list-mealkit");
                        }
                        else{
                        
                        res.redirect("/");
                        }
                    }

                    else{
                        errors.push("Password does not Match");
                        console.log(errors[0]);
                        res.render("user/login",{
                             errors
                        });
                    }
                });
            }
            
            else{
                //could not find the user
                errors.push("Email was not Found");
                console.log(errors[0]);
                res.render("user/login",{
                    errors
                });
            }
        })
        .catch(err =>{
            errors.push("Error Finding the user in Database")
        })  
});
    
module.exports = router;