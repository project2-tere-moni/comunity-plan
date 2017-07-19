$(document).ready(function(){
  var map = new google.maps.Map(document.getElementById('map-intro'), {
      zoom: 11,
      center: {lat: 40.417080, lng: -3.703612}
    });
    var geocoder = new google.maps.Geocoder();


    let markers = [];
    myPlaces.forEach(function(place){
     let place_id = place.place_id;
     let position = {
       lat: place.location.coordinates[0],
       lng: place.location.coordinates[1]
     };
     var contentString = '<div id="content">'+
             '<div id="siteNotice">'+
             '</div>'+
             `<h1 id="firstHeading" class="firstHeading">Place ID: ${place.place_id}</h1>`+
             '<div id="bodyContent">'+
             `<img src="${place.picPath}.png" alt="" width="80">`+
             `<span>${place.description}</span>`+
             '</div>'+
             '</div>';

     var infowindow = new google.maps.InfoWindow({
       content: contentString
     });
     var pin = new google.maps.Marker({ position, map, place_id  });
     pin.addListener('click', ()=>{infowindow.open(map, pin);});
     markers.push(pin);
   });


});
