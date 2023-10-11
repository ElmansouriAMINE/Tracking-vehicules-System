const { string } = require('joi');
const mongoose = require('mongoose');


var schema = new mongoose.Schema(
   { type : {
        type : String,
        required: true
    },
    matricule : {
        type: String,
        required: true,
        unique: true
    },
    image : String,
    marque : String
},{timestamps : true}

    
)

const Vehicule= mongoose.model('Vehicule', schema);


module.exports = Vehicule;
