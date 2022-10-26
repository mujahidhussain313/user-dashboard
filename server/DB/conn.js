const mongoose = require("mongoose");

 const DB = 'mongodb://localhost:27017/dashboard';
 


mongoose.connect(DB, {
    useNewUrlParser: true
    
}).then(()=> console.log("DB connected ")).catch((error)=> console.log(error.message));
