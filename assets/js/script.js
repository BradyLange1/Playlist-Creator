var userInputEl = $('#search-box')
var searchButtonEl = $('#search-button')
var resultsContainer = $('#results-container')

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

function printDataToPage(data){
    if (data.length === 0) {
      resultsContainer.textContent = 'No search results found.';
      return;
    } else {
        for (var i = 0; i < data.length; i++) {
            var artistName = data[i].artist.name;
          //var albumTitle = data[i].album.title;
            var songTitle = data[i].title;
            var albumCover = data[i].album.cover_medium;
            
            var resultCard = document.createElement('div');resultCard.classList = '';
            
            var resultImg = document.createElement('img');resultImg.classList = '';
            resultImg.src = albumCover;
            
            var resultTitle = document.createElement('h3');resultTitle.classList = '';
            resultTitle.textContent = songTitle;
            
            var resultArtist = document.createElement('p');resultArtist.classList = '';
            resultArtist.textContent = artistName;
            
            var addBtn = document.createElement('button');
            addBtn.classList = '';
            
            resultsContainer.appendChild(resultCard);
            resultCard.appendChild(resultImg);
            resultCard.appendChild(resultTitle);
            resultCard.appendChild(resultArtist);
            resultCard.appendChild(addBtn);
          }
    } 
};


searchButtonEl.on('click', function(){
    var userInput = userInputEl.val()
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
// .add-to-playlist
