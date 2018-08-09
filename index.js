//APIs we will use in this website
const zomatoAPI = 'https://developers.zomato.com/api/v2.1/search';
const geoLocationAPI = 'https://maps.googleapis.com/maps/api/geocode/json';
let map; let latLong; let longitude; let latitude; let markerList; let marker;

//function to get the search value used in input field, this will be passed to a geolocation API service to obtain its long/lat
function getSearchParameter () {
    $('.js-search').submit( event => {
    event.preventDefault();
    googleMapApiAjax($('.js-search-parameter').val());
    });
}

//Use ajax, so we can error handle based on search
function googleMapApiAjax (location) {
    const settings = {
        url: geoLocationAPI,
        data: {
            address: location,
            key: 'AIzaSyBi2cz-q8rAGCm6x5nqOKNHdjudOa0QDYY'
        },
        dataType: 'json',
        type: 'GET',
        success: getRestaurantData,
        error: displayError
    };
    $.ajax(settings);
    console.log($.ajax(settings));
}


//function to get restaurant data
function getRestaurantData (data) {
    //Convert the lat/long into numbers. This is for passing it into the initMap function that won't accept them as string
    try {
        latitude = Number(`${data.results[0].geometry.location.lat}`);
        longitude = Number(`${data.results[0].geometry.location.lng}`);
    }
    catch (err) {
        alert('Please retry search. Remember to use City AND State to narrow down search!');
    }
    //make lat/long into a string
    latLong = {lat: latitude, lng: longitude};
    //create constant that will use passed through query
    const settings = {
        url: zomatoAPI,
        data: {
            apikey: '9144a162a1d830e240b70a23d61725f7',
            count: '10',
            lat: latitude,
            lon: longitude
        },
        dataType: 'json',
        type: 'GET',
        success: displayResults,
        error: displayError
        };
    //call Ajax method
    $.ajax(settings);
    console.log(settings);
    console.log($.ajax(settings))
}

//uses renderResults to display same set of HTML for each result
function displayList (data) {
    let listResults = data.restaurants.map((item,index) => renderResults(item));
    //inserts the mapped items into restaurant-list
    $('.js-restaurant-list').html(listResults);
}

function renderError () {
    return `<span class="error-message">Oops! You may have typed in your location in wrong, try again!<br>Tip: Remember to use City, State in combination!</span>`
}

function displayError () {
    $('.error').html(renderError());
}

//creates HTML for each returned result of getRestaurantData via displayList
function renderResults (data) {
    return `<div class="restaurant col-6">
                <h3>${data.restaurant.name}</h3>
                <span class="website">
                    <a href="${data.restaurant.url}" target="_blank">Information</a> 
                    <a href="${data.restaurant.menu_url}" target="_blank">Menu</a>
                    <p class="food-type">${data.restaurant.cuisines}</p>
                </span>
            </div>`
}

//function to create markers
function renderMarkers (data,map) {
    let image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
    let shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
     marker = new google.maps.Marker({
        position: new google.maps.LatLng(`${data.restaurant.location.latitude}`,`${data.restaurant.location.longitude}`),
        map: map,
        icon: image,
        shape: shape,
        title: `${data.restaurant.name}`
    });
     return marker;
}

//makes a marker object for each list return
function displayGoogleMarkers (data,map) {
    markerList = data.restaurants.map((item,index) => {
        return renderMarkers(item, map);
    });
    return markerList;
}

//function that when called will load the google map within page
function initMap (data) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: latLong,
        styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
    displayGoogleMarkers (data,map);
}

//unhides the HTML results and googlemaps that are childrend of main
function unhideHtml () {
    $('main').prop('hidden',false);
}

//function to pass data from getRestarauntData into multiple functions
function displayResults (data) {
    displayList(data);
    initMap(data);
    unhideHtml();
}

function startWebsite() {
    getSearchParameter();
}


$(startWebsite());
