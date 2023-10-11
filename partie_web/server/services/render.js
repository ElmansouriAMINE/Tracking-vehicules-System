const axios = require('axios');
PORT = 3700;

 
exports.homePage = (req,res)=>{
   axios.get(`http://localhost:${PORT}/api/vehicules`)
   .then(function(response){
    res.render('index.ejs',{vehicules : response.data})
   
})
    .catch(err=>{
        res.send(err);
    })
    //res.send("ok")
};
exports.ajouter_vehicule= (req,res)=>{
    res.render('ajouter.ejs')
};
exports.modifier_vehicule =(req, res) =>{
    axios.get(`http://localhost:${PORT}/api/vehicules`, { params : { id : req.query.id }})
        .then(function(vehiculedata){
            res.render("modifier.ejs", { vehicule : vehiculedata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

