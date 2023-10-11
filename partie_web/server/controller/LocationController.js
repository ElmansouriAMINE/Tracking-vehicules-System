const mongoose = require('mongoose');

var Location = require('../model/LocationModel');


// retrieve and return all users/ retrive and return a single user
exports.find = async (req, res)=>{

    if(req.query.vehicule_id){
        const id = req.query.vehicule_id;

        await Location.find({vehicule_id : id}) 
            .then(data =>{
               
                        if(!data){
                            res.status(404).send({ message : "Not found user with id "+ id})
                        }else{
                            Vehicule.find({_id: id})
                            .then(datas =>{
                                if(!datas){
                                    res.status(404).send({ message : "Not found user with id "+ id})
                                }else{
                                    res.send({vehicule: datas,locations :data})
                                }
                            })
                            .catch(err =>{
                                res.status(500).send({ message: "Erro retrieving user with id " + id})
                            })
                        }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{

        mongoose.connect("mongodb+srv://amine:amine@cluster0.pmyqrf8.mongodb.net/test?retryWrites=true&w=majority", function(err, db) {
        if(err) { return console.dir(err); }

        var location = db.collection('location');

        location.find().toArray(function(err, kittens) {
            console.log(kittens)
        });
            
        });

        
    }

    
}