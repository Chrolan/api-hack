//APIs we will use in this website
const zomatoAPI = 'https://developers.zomato.com/api/v2.1/geocode';
const geoLocationAPI = 'https://maps.googleapis.com/maps/api/geocode/json';
let map; let latLong; let longitude; let latitude; let marker;

//function to get the search value used in input field, this will be passed to a geolocation API service to obtain its long/lat
function getSearchParameter () {
    $('.js-search').submit(event => {
    event.preventDefault();
    googleMapApi($('.js-search-parameter').val());
    });
}

//function to get the long/lat of the given search result
function googleMapApi (location) {
    //create constant that will use passed through query
    const query = {
        address: location,
        key: 'AIzaSyBi2cz-q8rAGCm6x5nqOKNHdjudOa0QDYY'
    };
    $.getJSON(geoLocationAPI,query,getRestaurantData);
}

//function to get restaurant data
function getRestaurantData (data) {
    //Convert the lat/long into numbers. This is for passing it into the initMap function that won't accept them as string
    latitude = Number(`${data.results[0].geometry.location.lat}`);
    longitude = Number(`${data.results[0].geometry.location.lng}`);
    //make lat/long into a
    latLong = {lat: latitude, lng: longitude};
    //create constant that will use passed through query
    const query = {
        apikey: '9144a162a1d830e240b70a23d61725f7',
        lat: latitude,
        lon: longitude
    };
    //call JSON method
    $.getJSON(zomatoAPI,query,displayResults);
    console.log($.getJSON(zomatoAPI,query));
    console.log(latLong)
}

//uses renderResults to display same set of HTML for each result
function displayList (data) {
    let listResults = data.nearby_restaurants.map((item,index) => renderResults(item));
    //inserts the mapped items into restaurant-list
    $('.js-restaurant-list').html(listResults);
}

//creates HTML for each returned result of getRestaurantData via displayList
function renderResults (data) {
    return `<div class="restuarant">
                <h2>${data.restaurant.name}</h2>
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
        position: new google.maps.LatLng(Number(`{data.restaurant.location.latitude}`),Number(`${data.restaurant.location.longitude}`)),
        map: map,
        icon: image,
        shape: shape,
        title: `${data.restaurant.name}`
    });
    console.log(marker)
}

function displayGoogleMarkers (data,map) {
    return data.nearby_restaurants.map((item,index) => renderMarkers(item,map));
}

//function that when called will load the google map within page
function initMap (data) {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: latLong
    });
    displayGoogleMarkers(data,map);
}

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
