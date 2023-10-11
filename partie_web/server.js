var Tracker = require('./server/model/TrackerModel');
var Position = require('./server/model/positionModel');
var Helper = require('./server/model/HelperModel');
var Vehicule = require('./server/model/model');
const multer = require('multer');


const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();
const PORT = 3700;
app.use(require('body-parser').urlencoded({
  extended: true
}))

app.use(express.json())

connectDB();


app.use(express.static(path.join(__dirname, '/assets')));

app.set("view engine", "ejs")

app.use('/', require('./server/routes/router'));


app.use(express.static(path.join(__dirname, './server/uploads')));
app.set('uploads',path.join(__dirname,'./server/uploads'));

app.use(express.static('./server/uploads'));

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./server/uploads");
    },
    filename: function(req,file,cb){
        console.log(file);
        cb(null,file.originalname);
    },
});
var upload = multer({
    storage: storage,
})

app.get("/")
app.post("/upload", upload.single('image'),(req,res)=>{
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

});



//app.listen(PORT,()=>{console.log(`Server running on http://localhost:${PORT}` )});
const socket = require('socket.io');
var server = require('http').createServer(app);
var io = socket(server);




server.listen(PORT)





io.on("connection", (socket) => {
  console.log('connected');

  socket.on("position-change", (data) => {
    positionflutter = JSON.parse(data);
    console.log(data)
   Tracker.findOne({adressemac : positionflutter.id})
  .then(dd =>{
      if(!dd){
         console.log({ message : "Not found user with id: "+  positionflutter.id})
      }else{
          Helper.findOne( {tracker_id : dd.id , fin: { $exists: false }})
          .then(data =>{
            if(!data){
               console.log({ message : "Tracker innactive "+ dd.id})
            }else{
              const position = new Position ({
                vehicule_id : data.vehicule_id,
                lat : positionflutter.lat,
                long :positionflutter.lng
                
                
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
        })
        .catch(err =>{
            console.log({ message: "Erro retrieving helper with tracker_id " + dd.id})
        })



      }
  })
    .catch(err =>{
        res.status(500).send({ message: "Erro retrieving user with id " +  position.id})
    })


  })
  socket.on("disconnect", () => {
    console.log('diconnected');

  })

});
