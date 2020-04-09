
window.onload=()=>{
    displayStores();
}

function initMap() {
    var losAngeles = {
        lat: 34.063380, 
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
    });
    showStoresMarkers();
    infoWindow = new google.maps.InfoWindow();
}

function displayStores(){
    var storesHTML='';
    for(const [index,store] of stores.entries()){
        var address= store.addressLines;
        var phone=store.phoneNumber;

        storesHTML+=`
        <div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phone}</div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index+1}
                    </div>
                </div>
        </div>`;

        document.querySelector(".stores-list").innerHTML=storesHTML;
    }
}

var map;
var markers=[];
var infoWindow;

function createMarker(latlng, name,address, index) {
    var html = "<b>" + name + "</b> <br/>" + index;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: index.toString()
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}

function showStoresMarkers(){
    var bounds = new google.maps.LatLngBounds();
    for(const [index,store] of stores.entries()){
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);
        var name=store.name;
        var address=store.addressLines[0];
        createMarker(latlng,name,address,index+1);
        bounds.extend(latlng);
    }
    map.fitBounds(bounds);
}

