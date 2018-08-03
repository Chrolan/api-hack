//APIs we will use in this website
const diveAPI = 'http://api.divesites.com/';
const geoLocationAPI = 'https://maps.googleapis.com/maps/api/geocode/json';


//function to get the search value used in input field, this will be passed to a geolocation API service to obtain its long/lat
function getSerachParameter () {
    $('.js-search').submit(event => {
    event.preventDefault();
    console.log($('.js-search-parameter').val());
    googleMapApi($('.js-search-parameter').val());
    });
}



//function to get dive data
function getDiveData (data) {
    //create constant that will use passed through query
    const query = {
        data: {mode: 'sites',
        lng: `${data.results[0].geometry.location.lng}`,
        lat: `${data.results[0].geometry.location.lat}`,
        dist: 50},
        url: diveAPI,
        type: 'POST',
        headers: { 'Access-Control-Allow-Origin': '*' },
        dataType: 'json',
        success: successCallback
    };
    //call JSON method
    $.ajax(query);
}

function successCallback (data) {
    console.log(data);
}


//function to get the long/lat of the given search result
function googleMapApi (location) {
    //create constant that will use passed through query
    const query = {
        key: 'AIzaSyBp_stUCKfLCgsrrQjS8cda2oWFCP3t4EM',
        address: location,
    };
    //call JSON method
    console.log($.getJSON(geoLocationAPI,query));
    $.getJSON(geoLocationAPI,query,getDiveData);
}



function startWebsite() {
    //getDiveData();
    getSerachParameter();

}


$(startWebsite());
