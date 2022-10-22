const mongoose = require("mongoose");

 const DB = 'mongodb://localhost:27017/dashboard';
 
//  "mongodb+srv://mujahid:curdapp@cluster0.bynnult.mongodb.net/curdstack?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true
    
}).then(()=> console.log("DB connected ")).catch((error)=> console.log(error.message));