var Position = require('../model/positionModel');
var Vehicule = require('../model/model');
// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const position = new Position({
       vehicule_id : req.body.vehicule_id,
        lat : req.body.lat,
       long : req.body.long
       
    })

    // save user in the database
    position
        .save(position)
        .then(data => {
            console.log(position)
           
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = async (req, res)=>{

    if(req.query.vehicule_id){
        const id = req.query.vehicule_id;

        await Position.find({vehicule_id : id}) 
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
        await Position.find()
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
    await Position.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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

    await Position.findByIdAndDelete(id)
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

// retrieve and return all users/ retrive and return a single user
exports.filter =  (req, res)=>{

        const debut = new Date(req.params.debut);
        debut.setHours(debut.getHours()+1)
        const fin = new Date(req.params.fin);
        fin.setHours(fin.getHours()+1)
       const id = req.params.vehicule_id;
       
       
       console.log(debut.toISOString())
        console.log(fin.toISOString())
       
       
        Position.find({
            createdAt: {
                $gte: debut.toISOString(),
                $lt: fin.toISOString()
            },vehicule_id :id
          
        })
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

  
        

    
}
exports.getLast =  (req, res)=>{

    const id = req.params.vehicule_id;
    
   
     Position.find({vehicule_id : id}).sort({createdAt:-1}).limit(1)
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

}