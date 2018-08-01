//APIs we will use in this website
const diveAPI = 'http://api.divesites.com/';
const geoLocationAPI = 'https://maps.googleapis.com/maps/api/geocode/json'




//function to get dive data
function getDiveData (longitude,latitude,callback) {
    //create constant that will use passed through query
    const query = {
        mode: 'sites',
        lng: longitude,
        lat:latitude,
        dist: 50
    };
    //call JSON method
    $.getJSON(diveAPI,query,callback)
}




function startWebsite() {
    getDiveData();
}


$(startWebsite());