var ZOOM = 14;
var map;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    }
    else {
        showMessageBox( "Geolocation is not supported by this browser.", null );
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon);
    mapholder = document.getElementById('map');
    mapholder.style.height = '100%';
    mapholder.style.width = '100%';

    var myOptions = {
        center:latlon,
        zoom:ZOOM,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{ style:google.maps.NavigationControlStyle.SMALL }
    };
    
    map = new google.maps.Map( document.getElementById('map'), myOptions );
    var marker = new google.maps.Marker( { position:latlon, map:map, title:"You are here!" } );
    marker.setIcon('img/case_self_marker.png');
    
    posi2 = new google.maps.LatLng(50.9500, 6.9667);
    var marker2 = new google.maps.Marker( { position:posi2, map:map, title:"case" } );
    marker2.setIcon('img/case_volunteer_marker.png');
    
    calculateDistance( latlon, posi2, position.coords.accuracy );
}

function setMarker( lat, lng ) {
    posi = new google.maps.LatLng(lat, lnh);
    var marker2 = new google.maps.Marker( { position:posi, map:map, title:"case" } );
    marker2.setIcon('img/case_volunteer_marker.png');
}

function showError(error) {
    switch(error.code){
        case error.PERMISSION_DENIED:
            showMessageBox( "User denied the request for Geolocation.", null );
            break;
        case error.POSITION_UNAVAILABLE:
            showMessageBox( "Location information is unavailable.", null );
            break;
        case error.TIMEOUT:
            showMessageBox( "The request to get user location timed out.", null );
            break;
        case error.UNKNOWN_ERROR:
            showMessageBox( "An unknown error occurred.", null );
            break;
    }
}

function calculateDistance( current, target, accuracy ) {
    // copied
    var R = 6371;                   //Radius of the earth in Km             
    var dLat = (target.lat() - current.lat())* Math.PI / 180;    //delta (difference between) latitude in radians
    var dLon = (target.lng() - current.lng())* Math.PI / 180;    //delta (difference between) longitude in radians

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(current.lat()* Math.PI / 180) * Math.cos(target.lat()* Math.PI / 180);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));   //must use atan2 as simple arctan cannot differentiate 1/1 and -1/-1
    var distance = R * c;   //sets the distance

    // km to m and rounding to one meter (theoretical) accurency
    distance = Math.round( distance*1000 );
   
    // UI
    setDistance( distance, accuracy );
}