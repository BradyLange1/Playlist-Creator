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
    // console.log("second log", data)
    // console.log("second log", results.data.length)
    if (results.data.length === 0) {
      resultsContainer.textContent = 'No search results found.';
      return;
    } else {
        for (var i = 0; i < results.data.length; i++) {
            // console.log("third log", results);
            // console.log("fourth log", results.data[i]);

            var resultsContainer = document.createElement('div');
            var resultCard = document.createElement('div');
            var resultImg = document.createElement('img');
            var resultTitle = document.createElement('h3');
            var resultArtist = document.createElement('p');
            var addBtn = document.createElement('button');

            resultsEl.append(resultsContainer);
            resultsContainer.append(resultCard);

            var albumCover = results.data[i].album.cover_medium;
            resultImg.setAttribute('src', albumCover);
            resultCard.append(resultImg)

            var songTitle = results.data[i].title;
            resultTitle.textContent = songTitle;
            resultCard.append(resultTitle);

            var artistName = results.data[i].artist.name;
            resultArtist.textContent = artistName;
            resultCard.append(resultArtist);

            resultCard.append(addBtn);

            console.log("this is the cover", resultImg);
            console.log("this is the song", resultTitle);
            console.log("this is the artist", resultArtist);

            // var albumTitle = results.data[i].album.title;

            // console.log(artistName)
            
            //resultCard.classList.add('');
            

            //resultImg.classList = '';
            // resultImg.src = albumCover;
            
            //resultTitle.classList = '';
           
            // resultArtist.classList = '';
            // resultArtist.textContent = artistName;
            
            // addBtn.classList = '';
            
            // resultsContainer.appendChild(resultCard);
            // resultCard.appendChild(resultImg);
            // resultCard.appendChild(resultTitle);
            // resultsContainer.append(resultArtist);
            // resultCard.appendChild(addBtn);
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

// fetch data based on search input
// populate data on page

// .playlist-card
// .playlist-img
// .playlist-title

// .result-card
// .result-img
// .result-title
// .add-to-playlist
