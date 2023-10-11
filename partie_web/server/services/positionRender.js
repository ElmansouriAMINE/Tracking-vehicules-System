const axios = require('axios');


 
exports.positionPage = (req,res)=>{
    
    const vehicule_id = req.params.vehicule_id;
    axios.get('http://localhost:3700/api/positions?vehicule_id='+vehicule_id)
    .then(function(response){
    res.render('indexPositionleaft.ejs',{positions : response.data.locations,vehicule : response.data.vehicule})
})
    .catch(err=>{
        res.send(err);
    })
};

exports.filtredPositionPage = (req,res)=>{
    
    const debut = req.params.debut;
    const fin = req.params.fin;
    const vehicule_id = req.params.vehicule_id;
    axios.get('http://localhost:3700/api/positions/filter/'+debut+'/'+fin+'/'+vehicule_id )
    .then(function(response){
        res.render('indexPositionFiltredleaft.ejs',{positions : response.data ,vehicule_id:vehicule_id})
})
    .catch(err=>{
        res.send(err);
    })
};

exports.lastPositionPage = (req,res)=>{
    
    
    const vehicule_id = req.params.vehicule_id;
    axios.get('http://localhost:3700/api/positions/'+vehicule_id+'/last' )
    .then(function(response){
        res.render('indexPositionLastleaft.ejs',{positions : response.data ,vehicule_id:vehicule_id})
})
    .catch(err=>{
        res.send(err);
    })
};
