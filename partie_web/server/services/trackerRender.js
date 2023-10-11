const axios = require('axios');
const Helper = require('../model/HelperModel');

PORT = 3700;

exports.trackerPage = (req,res)=>{
    axios.get(`http://localhost:${PORT}/api/trackers`)
    .then(function(response){
    res.render('tracker/index.ejs',{trackers : response.data})
})
    .catch(err=>{
        res.send(err);
    })
};
exports.ajouter_tracker= (req,res)=>{
    res.render('tracker/ajouter.ejs')
};
exports.modifier_tracker =(req, res) =>{
    axios.get(`http://localhost:${PORT}/api/trackers`, { params : { id : req.query.id }})
        .then(function(response){
            
            res.render('tracker/modifier.ejs',{tracker: response.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.vehiculePage = (req,res)=>{
    axios.get(`http://localhost:${PORT}/api/tracker/:tracker_id/vehicules`)    
    .then(function(response){
    res.render('tracker/indexVehicule.ejs',
    {
        vehicules : response.data,
        tracker_id : req.params.tracker_id
    })
})
    .catch(err=>{
        res.send(err);
    })
};

exports.historiquePage = (req,res)=>{
    axios.get(`http://localhost:${PORT}/api/helper`)    
    .then(function(response){
    res.render('tracker/indexHistorique.ejs',
    {
        objets : response.data
        })
})
    .catch(err=>{
        res.send(err);
    })
};