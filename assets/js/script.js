var userInputEl = $('#search-box');
var searchButtonEl = $('#search-button');
var resultsEl = document.querySelector('#results');
var addPlaylistButtonEl = $('#create-palaylist');
var playlistNameEl = $('#playlist-name');
var searchFormEl = $('#search-form')

var playlists = JSON.parse(localStorage.getItem("userPlaylists"))
if (playlists === null){
    playlists = []
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '55b71cba74msh84c291f4e9de668p126f59jsn31a18769a989',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

function getInfo(input) {
    const artistUrl = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=' + input;
    fetch(artistUrl, options)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //console.log(data);
            printDataToPage(data);
        })
}

function printDataToPage(results){
    // if (smth) {
    //     //retrieve from local storage based on unique id, localStorage.getItem();
    //     //parse stringified object
    //     for (var i = 0; i < 0; i++) {
    //         var resultsContainer = document.createElement('div');
    //         var songCard = document.createElement('div');
    //         var songImg = document.createElement('img');
    //         var songTitle = document.createElement('h3');
    //         var songArtist = document.createElement('p');

    //         var playlistTitle = traverse;
    //         resultsContainer.append(playlistTitle);

    //         var albumCover = traverse;
    //         songImg.setAttribute('src', albumCover);
    //         //songImg.classList.add('');
    //         songCard.append(songImg)

    //         var title = traverse;
    //         songTitle.textContent = title;
    //         //songTitle.classList.add('');
    //         songCard.append(songTitle);

    //         var artistName = traverse;
    //         songArtist.textContent = artistName;
    //         //songArtist.classList.add('');
    //         songCard.append(songArtist);

    //         resultsContainer.append(songCard);
    //         //songCard.classList.add('');

    //         resultsEl.append(resultsContainer);

    //     }
    // } else {
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
                  //resultImg.classList.add('');
                  resultCard.append(resultImg)
      
                  var songTitle = results.data[i].title;
                  resultTitle.textContent = songTitle;
                  //resultTitle.classList.add('');
                  resultCard.append(resultTitle);
      
                  var artistName = results.data[i].artist.name;
                  resultArtist.textContent = artistName;
                  //resultArtist.classList.add('');
                  resultCard.append(resultArtist);
      
                  addBtn.classList.add('add-song');
                  addBtn.setAttribute('data-title', songTitle)
                  addBtn.setAttribute('data-artist', artistName)
                  addBtn.setAttribute('data-albumCover', albumCover)
                  resultCard.append(addBtn);
      
                  resultsContainer.append(resultCard);
                  //resultCard.classList.add('');
      
                  resultsEl.append(resultsContainer);
      
                  // console.log("this is the cover", resultImg);
                  // console.log("this is the song", resultTitle);
                  // console.log("this is the artist", resultArtist);
                }
            }       
}

$('#results').on('click', ".add-song", function(){
    var title = $(this).attr("data-title")
    var artist = $(this).attr("data-artist")
    var cover = $(this).attr("data-albumCover")
    var song = {
        name: title,
        artistName: artist,
        albumCover: cover
    }
    
    console.log(title)
    console.log(artist)
    console.log(cover)
})

function addPlaylist(input){
    var dataTwo = getData()
    console.log(dataTwo)
    $("#user-playlists").append("<button class = user-playlist>" + input)
}
// function addPlaylist(input){
//     $("#user-playlists").append("<button class = user-playlist>" + input)

// }

// Entry validation 
function validateForm(event) {
    event.preventDefault()
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
}

searchFormEl.on('submit', validateForm)

// Adds song to playlist
// addSong.on("click", function(event){
//     playlists.push()
// })

addPlaylistButtonEl.on('click', function(){
    var userInput = playlistNameEl.val()
    var userPlaylist = {
        name: userInput,
        songs: []
    }
    localStorage.setItem("userPlaylists", JSON.stringify(userPlaylist))
    addPlaylist(userInput)
})


// Get the input field


// Execute a function when the user presses a key on the keyboard
userInputEl.on("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        console.log("Enter for search!", event)
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchButtonEl.click();
    }
});

searchButtonEl.on('click', function () {
    var userInput = userInputEl.val()
    getInfo(userInput)
})


// fetch data based on search input
// populate data on page

// .playlist-card
// .playlist-img
// .playlist-title