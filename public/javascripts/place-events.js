$(document).ready(function(){
  var map = new google.maps.Map(document.getElementById('map-event'), {
      zoom: 12,
      center: {lat: 40.417080, lng: -3.703612}
    });
    var geocoder = new google.maps.Geocoder();


    let markers = [];
     let place_id = place.place_id;
     let position = {
       lat: place.location.coordinates[0],
       lng: place.location.coordinates[1]
     };
     var contentString = '<div id="content">'+
             '<div id="siteNotice">'+
             '</div>'+
             `<h3 id="firstHeading" class="firstHeading">Place ID: ${place.place_id}</h3>`+
             '<div id="bodyContent">'+
             `<img src="${place.picPath}" alt="" width="80">`+
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
