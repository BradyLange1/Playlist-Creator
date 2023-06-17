// Here are the details of your new API account.

// Application name	     Music App
// API key	             3558c7712e3053b9f8860b95c09141c8
// Shared secret	     4f6d693730a27bf24c6efe504a17bf08
// Registered to	     marjan-mn
//  http://ws.audioscrobbler.com/2.0/
// JSON: /2.0/?method=chart.gettoptracks&api_key=YOUR_API_KEY&format=json
 var APIkey = "3558c7712e3053b9f8860b95c09141c8"


function getTopTracks(topTracks) {
    console.log(topTracks)
    var requestUrl = "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" + APIkey +"&format=json"

    fetch(requestUrl)
        .then(function (response) {
            response.json().then(function () {
            console.log(parsedResponse)  
})
        })}