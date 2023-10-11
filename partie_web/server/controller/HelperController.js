const { redirect } = require('express/lib/response');
var Helper = require('../model/HelperModel');
var Vehicule = require('../model/model');
var Tracker = require('../model/TrackerModel');
// create and save new user
exports.create = (req,res)=>{
    const current =new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    Helper.find(
        {tracker_id : req.body.tracker_id , fin: { $exists: false }}
       
    )
            .then(user => {
                if(!user[0]){
                    if(!req.body){
                        res.status(400).send({ message : "Content can not be emtpy!"});
                        return;
                    }
                
                    // new user
                    const helper = new Helper({
                       vehicule_id : req.body.vehicule_id,
                       tracker_id : req.body.tracker_id,
                       debut : current
                    })
                
                    // save user in the database
                    helper
                        .save(helper)
                        .then(data => {
                            res.redirect('/trackers')
                           
                        })
                        .catch(err =>{
                            res.status(500).send({
                                message : err.message || "Some error occurred while creating a create operation"
                            });
                        });
                }else{
                     const id=user[0]._id

                      Helper.findOne({_id: id}, function(err, helper) {
                        if(!err) {
                            
                            helper.fin = current;
                            helper
                            .save(helper)
                            .then(data => {
                                 // new user
                                const helper = new Helper({
                                    vehicule_id : req.body.vehicule_id,
                                    tracker_id : req.body.tracker_id,
                                    debut : current
                                })
                            
                                // save user in the database
                                helper
                                    .save(helper)
                                    .then(data => {
                                        res.redirect('/trackers')
                                       
                                    })
                                    .catch(err =>{
                                        res.status(500).send({
                                            message : err.message || "Some error occurred while creating a create operation"
                                        });
                                    });
                            
                            })
                            .catch(err =>{
                                res.status(500).send({
                                    message : err.message || "Some error occurred while creating a create operation"
                                });
                            });
                            
                        }
                    });
                }
               
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })

/*

   
  */
    }
  
// retrieve and return all users/ retrive and return a single user
exports.find = async (req, res)=>{
    var users = [];
    var size=[];
    var trackers_id =[];
    var vehicules_id = [];
    var trackers =[];
    var vehicules = [];
    var objets =[];
    function empty() {
        users = [];
       size=[];
        trackers_id =[];
       vehicules_id = [];
        trackers =[];
        vehicules = [];
        
   }
    
    if(req.query.id){
        const id = req.query.id;

        await Helper.findById(id)
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
        await Helper.find({ fin: { $exists: true }})   //Helper.find({ fin: { $exists: true }})
            .then(user => {
                users=user;
                size.push(user.length);
                
                for(var i=0;i<size;i++){
                    trackers_id.push(user[i].tracker_id);
                    vehicules_id.push(user[i].vehicule_id);
                }
                
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
                })
            
       
      
            // vehicules
            for(var i=0;i<size[0];i++){
               
             
                vehicules.push(await Vehicule.findOne({_id:vehicules_id[i]}));
                     
             }
             for(var i=0;i<size[0];i++){
               
             
                trackers.push(await Tracker.findOne({_id:trackers_id[i]}));
                     
             }
             
            
             for(var i=0;i<size[0]-2;i++){
               
                var objet ={
                    "tracker": trackers[i].nom,
                    "vehicule": vehicules[i].matricule,
                    "debut":users[i].debut,
                    "fin" : users[i].fin
                 };
                 objets.push(objet);
                
                     
             }
             res.send(objets)
             
           
         
            
            

    }
empty()
    
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

    await Helper.findByIdAndDelete(id)
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
