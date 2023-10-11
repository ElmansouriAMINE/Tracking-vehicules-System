
jQuery(function($) {

    document.getElementById("filter11").onclick = function () {
        location.href="http://localhost:3700/api/positions/filter/map/"+document.getElementById("debut").value+'/'+document.getElementById("fin").value+'/'+document.getElementById("vehicule_id").value ;
     };  
    

// Asynchronously Load the map API 
var script = document.createElement('script');
script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
document.body.appendChild(script);
});
function initialize() {
var map;
var bounds = new google.maps.LatLngBounds();
var mapOptions = {
     mapTypeId: 'roadmap'
};

let infoWindowContent =[];
let dates =[];
let lats =[];
let lngs=[];
let markers=[];
var taille = document.getElementById("taille").value;
for(var i=0 ; i<taille ; i++){
   
    lats.push(document.getElementById("lat"+i+1).value);
    lngs.push(document.getElementById("lng"+i+1).value);
    dates.push(document.getElementById("date"+i+1).value);
    markers.push(['Vehicule',lats[i], lngs[i]]);
}
                


                    


    
if(taille>0){
// Display a map on the page
map = new google.maps.Map(document.getElementById("map_tuts"), mapOptions);
map.setTilt(45);
    
    // Info Window Content
for(var i=0 ; i<taille ; i++){
    infoWindowContent.push(['<div class="info_content">' +
    '<h3>'+new Date(dates[i]).toISOString().replace(/T/, ' ').replace(/\..+/, '')+'</h3>' +'<p> Projet Mouhib </p>'
     +'</div>']);
   
}
    // Display multiple markers on a map
var infoWindow = new google.maps.InfoWindow(), marker, i;
// Loop through our array of markers & place each one on the map  
for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
    });
    
    // Each marker to have an info window    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infoWindow.setContent(infoWindowContent[i][0]);
            infoWindow.open(map, marker);
        }
    })(marker, i));
    // Automatically center the map fitting all markers on the screen
    map.fitBounds(bounds);
}
// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    this.setZoom(15);
    google.maps.event.removeListener(boundsListener);
});
} else {
    document.getElementById("circle").onclick = function() {
  
        document.getElementById("circle").style.display = "none";

    }
}

}
