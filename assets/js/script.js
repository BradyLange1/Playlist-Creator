var userInputEl = $('#search-box');
var searchButtonEl = $('#search-button');
var resultsEl = document.querySelector('#results');
var addPlaylistButtonEl = $('#add-playlist-button');
var userInputPlaylistEl = $('#user-input-playlist');

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
            console.log(data);
            printDataToPage(data);
        })
}

function printDataToPage(results){
    if (results.data.length === 0) {
      resultsContainer.textContent = 'No search results found.';
      return;
    } else {
        for (var i = 0; i < results.data.length; i++) {

            var resultsContainer = document.createElement('div');
            var resultCard = document.createElement('div');
            var resultImg = document.createElement('img');
            var resultTitle = document.createElement('h3');
            var resultArtist = document.createElement('p');
            var addBtn = document.createElement('button');

            var albumCover = results.data[i].album.cover_medium;
            resultImg.setAttribute('src', albumCover);
            resultImg.classList.add('');
            resultCard.append(resultImg)

            var songTitle = results.data[i].title;
            resultTitle.textContent = songTitle;
            resultTitle.classList.add('');
            resultCard.append(resultTitle);

            var artistName = results.data[i].artist.name;
            resultArtist.textContent = artistName;
            resultArtist.classList.add('');
            resultCard.append(resultArtist);

            addBtn.classList.add('');
            resultCard.append(addBtn);

            // console.log("this is the cover", resultImg);
            // console.log("this is the song", resultTitle);
            // console.log("this is the artist", resultArtist);

            resultsContainer.append(resultCard);
            resultCard.classList.add('');

            resultsEl.append(resultsContainer);
          }
    } 
};

function addPlaylist(input){
    $("#playlist-form").append("<button class = user-playlist>" + input)
}

searchButtonEl.on('click', function(){
    var userInput = userInputEl.val()
    getInfo(userInput)
})

addPlaylistButtonEl.on('click', function(){
    var userInput = userInputPlaylistEl.val()
    addPlaylist(userInput)
})


// .playlist-card
// .playlist-img
// .playlist-title