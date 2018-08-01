const YouTubeURL = 'https://www.googleapis.com/youtube/v3/search';

//function for getting data and then setting up later call back function (later will be something you do with the data
function getDataFromAPI (queryTerm,callback) {
    //create constant that will use passed through query
    const query = {
        part: 'snippet',
        id: '7lCDEYXw3mM',
        key: 'AIzaSyAvrGLiEMNyCaOFnNPzTONXEGLi4b01JH4',
        q: `${queryTerm}`,
        maxResults: 5,
        type: '',
    };
    //call JSON method
    $.getJSON(YouTubeURL,query,callback)
}