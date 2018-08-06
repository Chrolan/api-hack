//APIs we will use in this website
const zomatoAPI = 'https://developers.zomato.com/api/v2.1/geocode';
const geoLocationAPI = 'https://maps.googleapis.com/maps/api/geocode/json';
let map; let latLong; let longitude; let latitude;

//function to get the search value used in input field, this will be passed to a geolocation API service to obtain its long/lat
function getSearchParameter () {
    $('.js-search').submit(event => {
    event.preventDefault();
    googleMapApi($('.js-search-parameter').val());
    });
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
}

//function to get the long/lat of the given search result
function googleMapApi (location) {
    //create constant that will use passed through query
    const query = {
        address: location,
        key: 'AIzaSyBi2cz-q8rAGCm6x5nqOKNHdjudOa0QDYY'
    };
    //call JSON method
    $.getJSON(geoLocationAPI,query,getRestaurantData);
}

function renderResults (data) {
    return `<div class="restuarant">
                <h2>${data.restaurant.name}</h2>
            </div>`
}

function displayResults (data) {
    let results = data.nearby_restaurants.map((item,index) => renderResults(item));
    //
    $('.js-restaurant-list').html(results);
    initMap();
    unhideHtml();
}

function initMap () {

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: latLong
        });
}

function unhideHtml () {
    $('main').prop('hidden',false);
}


function startWebsite() {
    getSearchParameter();
}


$(startWebsite());
