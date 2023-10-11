const express = require('express');
const route = express.Router();
const services = require('../services/render');
const positionServices = require('../services/positionRender');
const trackerServices = require('../services/trackerRender');
const controller = require('../controller/controller');
const positioncontroller = require('../controller/positioncontroller');
const trackercontroller = require('../controller/TrackerController');
const helpercontroller = require('../controller/HelperController');
const LocationController = require('../controller/LocationController');

route.get('/',services.homePage);
route.get('/trackers',trackerServices.trackerPage);
route.get('/api/positions/:vehicule_id',positionServices.positionPage);
route.get('/api/positions/filter/map/:debut/:fin/:vehicule_id',positionServices.filtredPositionPage);
route.get('/view/positions/:vehicule_id/last',positionServices.lastPositionPage);
route.get('/views/ajoutervehicule',services.ajouter_vehicule);
route.get('/views/modifiervehicule',services.modifier_vehicule);
route.get('/views/ajoutertracker',trackerServices.ajouter_tracker);
route.get('/views/modifiertracker',trackerServices.modifier_tracker);
route.get('/views/historique',trackerServices.historiquePage);
route.get('/views/trackeraffectation/:tracker_id',trackerServices.vehiculePage);


//API
route.post('/api/vehicules',controller.create);
route.put('/api/vehicules/:id',controller.update);
route.delete('/api/vehicules/:id',controller.delete);
route.get('/api/vehicules',controller.find);
//API Positions
route.get('/api/positions',positioncontroller.find);
route.get('/api/locations',LocationController.find);
route.get('/api/positions/filter/:debut/:fin/:vehicule_id',positioncontroller.filter);
route.get('/api/positions/:vehicule_id/last',positioncontroller.getLast);
route.post('/api/positions',positioncontroller.create);
//API trackers 
route.post('/api/trackers',trackercontroller.create);
route.put('/api/trackers/:id',trackercontroller.update);
route.delete('/api/trackers/:id',trackercontroller.delete);
route.get('/api/trackers',trackercontroller.find);
route.get('/api/tracker/:tracker_id/vehicules',controller.find);
//API helper
route.post('/api/helper',helpercontroller.create);
route.put('/api/helper/:id',helpercontroller.update);
route.delete('/api/helper/:id',helpercontroller.delete);
route.get('/api/helper',helpercontroller.find);

module.exports = route;