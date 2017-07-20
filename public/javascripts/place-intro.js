$(document).ready(function(){
  var map = new google.maps.Map(document.getElementById('map-intro'), {
      zoom: 11,
      center: {lat: 40.417080, lng: -3.703612},
      scrollwheel: false
    });
    var geocoder = new google.maps.Geocoder();


    let markers = [];
    myPlaces.forEach(function(place){
     let place_id = place.place_id;
     let position = {
       lat: place.location.coordinates[0],
       lng: place.location.coordinates[1]
     };
     var contentString = '<div class="center">'+
                           '<div id="thumbnail">'+
                           `<img src="${place.picPath}" alt="" width="80">`+
                           '</div>'+
                           '<div id="caption">'+
                           `<h3 id="firstHeading" class="firstHeading">Place ID: ${place.place_id}</h3>`+
                           `<p>${place.description}</p>`+
                           '</div>'+
                          '</div>';

     var infowindow = new google.maps.InfoWindow({
       content: contentString,
      maxWidth: 200
     });
     var pin = new google.maps.Marker({ position, map, place_id  });
     pin.addListener('click', ()=>{infowindow.open(map, pin);});
     markers.push(pin);
   });
});
