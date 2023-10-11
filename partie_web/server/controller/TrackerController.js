var Tracker = require('../model/TrackerModel');


exports.addVehiculeToTracker = function(trackerId, vehicule) {
    return Tracker.findByIdAndUpdate(
      trackerId,
      { $push: { vehicules: vehicule._id } },
      { new: true, useFindAndModify: false }
    );
  };
  

 exports.getTrackerWithPopulate =async (req,res)=> {
     const id = req.params.id;
     
    // return db.Tutorial.findById(id).populate("tags");
    res.send(await Tracker.findById(id).populate("vehicules", "-_id -__v -trackers")) 
  };




// create and save new user
exports.create = (req,res)=>{
   // validate request
   if(!req.body){
    res.status(400).send({ message : "Content can not be emtpy!"});
    return;
}

// new user
const tracker = new Tracker({
   adressemac : req.body.adressemac,
   nom: req.body.nom
   
   
})

// save user in the database
tracker
    .save(tracker)
    .then(data => {
        res.redirect('/trackers')
       
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

        await Tracker.findById(id)
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
       Tracker.find()
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
    
    await Tracker.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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

    await Tracker.findByIdAndDelete(id)
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