const { sendStatus } = require('express/lib/response');
var Vehicule = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const vehicule = new Vehicule({
       type : req.body.type,
        matricule : req.body.matricule,
       marque : req.body.marque,
       image : req.file.filename
    })

    // save user in the database
    vehicule
        .save(vehicule)
        .then(data => {
            res.redirect('/')
           
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = async (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        await Vehicule.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        await Vehicule.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = async (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    await Vehicule.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete =async (req, res)=>{
    const id = req.params.id;

    await Vehicule.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
const addTrackerToVehicule = function(vehiculeId, tracker) {
    return Vehicule.findByIdAndUpdate(
      vehiculeId,
      { $push: { trackers: tracker._id } },
      { new: true, useFindAndModify: false }
    );
  };
  
 
  const getVehiculeWithPopulate = function(id) {
    // return db.Tag.findById(id).populate("tutorials");
    return Vehicule.findById(id).populate("trackers", "-_id -__v -vehicules");
  };