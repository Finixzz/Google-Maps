window.onload=()=>{
    displayStores(stores);
}

var map;
var markers=[];
var infoWindow;

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
    infoWindow = new google.maps.InfoWindow();
    searchStores();
}




function createMarker(latlng,name,address,openStatusText,phoneNumber,index) {
    var html =`
        <div class="store-info-window" >
            <div class="store-info-name">
                ${name}
            </div>
            <div class="store-info-status">
                ${openStatusText}
            </div>
            <div class="store-info-address">
                <div class="circle">
                    <i class="fas fa-location-arrow"></i>
                </div>
                ${address}
            </div>
            <div class="store-info-phone">
                <div class="circle">
                    <i class="fas fa-phone-alt"></i>
                </div>
                ${phoneNumber}
            </div>
        </div>
    `;
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

function setOnClickListener(){
    var storeElements= document.querySelectorAll(".store-container");
    storeElements.forEach((elem,index)=>{
        elem.addEventListener("click",()=>{
            new google.maps.event.trigger(markers[index],"click");
        });
    }); 
}



function showStoresMarkers(stores){
    var bounds = new google.maps.LatLngBounds();
    for(const [index,store] of stores.entries()){
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);
        var name=store.name;
        var address=store.addressLines[0];
        var openStatusText= store.openStatusText;
        var phoneNumber=store.phoneNumber;
        createMarker(latlng,name,address,openStatusText,phoneNumber,index+1);
        bounds.extend(latlng);
    }
    map.fitBounds(bounds);
}


function searchStores(){
    var foundStores=[];
    var zipCode=document.querySelector("#zip-code-input").value;
    if(zipCode){
        for(var store of stores){
            store.address.postalCode
            var postal=store.address.postalCode.substring(0,5);
            if(postal==zipCode){
                foundStores.push(store);
            }
        }
    }else{
        foundStores = stores;
    }
    displayStores(foundStores);
    showStoresMarkers(foundStores);
    setOnClickListener();
}

function displayStores(stores){
    
    var storesHTML='';
    for(var [index,store] of stores.entries()){
        var address= store.addressLines;
        var phone=store.phoneNumber;

        storesHTML+=`
        <div class="store-container">
            <div class="store-container-background">
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
            </div>
        </div>`;

        document.querySelector(".stores-list").innerHTML=storesHTML;
    }
}