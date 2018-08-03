//APIs we will use in this website
const zomatoAPI = 'https://developers.zomato.com/api/v2.1/geocode';
const geoLocationAPI = 'https://maps.googleapis.com/maps/api/geocode/json';


//function to get the search value used in input field, this will be passed to a geolocation API service to obtain its long/lat
function getSearchParameter () {
    $('.js-search').submit(event => {
    event.preventDefault();
    console.log($('.js-search-parameter').val());
    googleMapApi($('.js-search-parameter').val());
    });
}

//function to get restaurant data
function getRestaurantData (data) {
    //create constant that will use passed through query
    const query = {
        apikey: '9144a162a1d830e240b70a23d61725f7',
        lat: `${data.results[0].geometry.location.lat}`,
        lon: `${data.results[0].geometry.location.lng}`
    };
    //call JSON method
    $.getJSON(zomatoAPI,query);
    console.log($.getJSON(zomatoAPI,query));
}

//function to get the long/lat of the given search result
function googleMapApi (location) {
    //create constant that will use passed through query
    const query = {
        address: location,
        key: 'AIzaSyBp_stUCKfLCgsrrQjS8cda2oWFCP3t4EM'
    };
    //call JSON method
    $.getJSON(geoLocationAPI,query,getRestaurantData);
    console.log($.getJSON(geoLocationAPI,query));
}



function startWebsite() {
    //getRestaurantData();
    getSearchParameter();
}


$(startWebsite());
