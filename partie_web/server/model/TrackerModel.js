const mongoose = require('mongoose');

var trackerSchema = new mongoose.Schema({
     
    
    adressemac : {type: String,
    unique:true},
    nom : String  


},{
    timestamps : true
})


const Tracker= mongoose.model('Tracker', trackerSchema);


module.exports = Tracker;