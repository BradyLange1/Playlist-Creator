
var userInputEl = $('#song-title')
var searchButtonEl = $('#search-button')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '55b71cba74msh84c291f4e9de668p126f59jsn31a18769a989',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

function getInfo(input){
    const artistUrl = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=' + input;
    fetch(artistUrl, options)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            printDataToPage(data)
        })
}

function printDataToPage(apiData){
    
}

searchButtonEl.on('click', function(){
    var userInput = userInputEl.val()
    console.log(userInput)
    getInfo(userInput)
})

// fetch data based on search input
// populate data on page

// .playlist-card
// .playlist-img
// .playlist-title

// .result-card
// .result-img
// .result-title
