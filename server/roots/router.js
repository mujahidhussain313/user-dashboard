const express = require("express");
const router = express.Router();
const users = require("../models/UserSchema");




// add user

router.post("/register", async(req, res)=>{
    // console.log(req.body)
    const {name, email, age, mobile} = req.body;
    

    if(!name || !email || !age || !mobile){
        res.status(422).json("plz fill the data");
    }

    try {
     const preuser = await users.findOne({email:email});
     console.log(preuser);

     if(preuser){
        res.status(420).json("this user is  already present");
     }else{
        let adduser = new users({
            name, email, age, mobile
        });
        console.log("user aded");

        let result = await adduser.save();
     res.status(201).json(adduser);
     console.log(result);
     }
    
    } catch (error) {
        res.status(422).send(error)
    }
});

// getting user data

router.get("/getuser", async(req, res)=>{
     try {
        let userdata = await users.find();
        // console.log(userdata)
        if(userdata){
            res.status(201).json(userdata)
        }else{
            res.status(422).json("no user registered")
        }

     } catch (error) {
        res.status(422).json(error)
     }
});

// get single user

router.get("/getuser/:id", async(req, res)=>{
    

    try {
        console.log(req.params);
        const {id} = req.params;
        let singleuser = await users.findOne({_id:id});
        console.log(singleuser);
        res.status(201).json(singleuser);
    } catch (error) {
        res.status(422).json("user not found");
    }
});

// update user data 

router.patch("/updateuser/:id", async(req, res)=>{
    try {
        const {id} = req.params;

        const updateuser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

     console.log("updated" + updateuser);
     res.status(201).json(updateuser);

    } catch (error) {
        res.status(422).json(error)
    }
});


// deleting user 


router.delete("/userdelete/:id", async(req, res)=>{
    try {
        const {id} = req.params;

        const deleteuser = await users.findByIdAndDelete({_id:id})

     console.log("deleted" + deleteuser);
     res.status(201).json(deleteuser);

    } catch (error) {
        res.status(422).json(error)
    }
});

// searching user 

router.get("/search/:key", async(req, res)=>{
    

    try {
        let userName = await users.find({
            "$or":[
                {name:{$regex: req.params.key}}
                ]
         });
         console.log(userName)
         res.status(201).json(userName)

    } catch (error) {
        res.status(422).json(error)
    }
});




module.exports = router;