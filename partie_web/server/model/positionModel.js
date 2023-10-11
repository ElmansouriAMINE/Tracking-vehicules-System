const mongoose = require('mongoose');
const schema = mongoose.Schema;

var positionSchema = new mongoose.Schema({
     
    vehicule_id : {type : schema.Types.ObjectId, ref: "Vehicule"},
    lat : Number,
    long : Number
 


},{
    timestamps : true
})


const Position= mongoose.model('Position', positionSchema);


module.exports = Position;