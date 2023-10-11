const mongoose = require('mongoose');
const schema = mongoose.Schema;

var helperSchema = new mongoose.Schema({
     
    vehicule_id : {type : schema.Types.ObjectId, ref: "Vehicule"},
    tracker_id : {type : schema.Types.ObjectId, ref: "Tracker"},
    debut :  Date,
    fin: Date


})


const Helper= mongoose.model('Helper', helperSchema);


module.exports = Helper;