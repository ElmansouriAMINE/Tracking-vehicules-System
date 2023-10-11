const mongoose = require('mongoose');

const connectDB = async()=>{
   const con = await mongoose.connect('mongodb+srv://amine:amine@cluster0.pmyqrf8.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>(console.log('mongodb connacted succesfully...')))
.catch((err)=>(console.log(err.message)))
}
module.exports = connectDB ;
// mongodb+srv://amine:amine@cluster0.pmyqrf8.mongodb.net/test?retryWrites=true&w=majority
//mongodb://localhost