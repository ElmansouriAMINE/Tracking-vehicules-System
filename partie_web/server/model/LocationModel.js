const { number } = require('joi');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

var LocationSchema = new mongoose.Schema(
   {  
    vehicule_id : {type : schema.Types.ObjectId, ref: "Vehicule"},
    latitude : Number,
    longtude : Number,
    date : String
   }

    
)

const Location= mongoose.model('Location', LocationSchema);


module.exports = Location;
