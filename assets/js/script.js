var userInputEl = $('#search-box');
var searchButtonEl = $('#search-button');
var resultsEl = document.querySelector('#results');
var resultsEl = $('#results');
var addPlaylistButtonEl = $('#create-playlist');
var playlistNameEl = $('#playlist-name');
var searchFormEl = $('#search-form');

var song = {}

var playlists = JSON.parse(localStorage.getItem("userPlaylists"))
if (playlists === null){
    playlists = []
}

//rapidAPI credentials
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '55b71cba74msh84c291f4e9de668p126f59jsn31a18769a989',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

//Deezer fetch request
function getInfo(input) {
    const artistUrl = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=' + input;
    fetch(artistUrl, options)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //console.log(data);
            printSearch(data);
        })
}

//prints search results to results container
function printSearch(results){
    resultsEl.html("");

    if (results.data.length === 0) {
        resultsContainer.text('No search results found.');
        return;
    } else {
        for (var i = 0; i < results.data.length; i++) {

            var resultCard = $('<div>');
            var resultImg = $('<img>');
            var resultTitle = $('<h3>');
            var resultArtist = $('<p>');
            var addBtn = $('<button>');
      
            var albumCover = results.data[i].album.cover_medium;
            resultImg.attr('src', albumCover);
            //resultImg.addClass('');
            resultCard.append(resultImg);
      
            var songTitle = results.data[i].title;
            resultTitle.text(songTitle);
            //resultTitle.addClass('');
            resultCard.append(resultTitle);
      
            var artistName = results.data[i].artist.name;
            resultArtist.text(artistName);
            //resultArtist.addClass('');
            resultCard.append(resultArtist);

            addBtn.addClass('add-song modal-trigger');
            addBtn.attr('data-title', songTitle);
            addBtn.attr('data-artist', artistName);
            addBtn.attr('data-albumCover', albumCover);
            addBtn.attr('data-target', 'modal1');
            resultCard.append(addBtn);
      
            resultCard.addClass('search-result-card');
            resultsEl.append(resultCard);
            }
        }
}

//listens for which playlist button gets clicked for printing to page
$('#user-playlists').on('click', '.user-playlist', function(){
    var playlistSelected = $(this).text();
    var playlistSelectedObject = playlists.find((x) => x.name == playlistSelected);

    printPlaylist(playlistSelectedObject);
})

//prints playlist to results container
function printPlaylist(playlistObject){
    resultsEl.html("");

    var resultsContainer = $('<div>');
    var playlistTitle = playlistObject.name;
    resultsContainer.append(playlistTitle);

    for (var i = 0; i < playlistObject.songs.length; i++) {

        var songCard = $('<div>');
        var songImg = $('<img>');
        var songTitle = $('<h3>');
        var songArtist = $('<p>');

        var albumCover = playlistObject.songs[i].albumCover;
        songImg.attr('src', albumCover);
        //songImg.addClass('');
        songCard.append(songImg)

        var title = playlistObject.songs[i].name;
        songTitle.text(title);
        //songTitle.addClass('');
        songCard.append(songTitle);

        var artistName = playlistObject.songs[i].artistName;
        songArtist.text(artistName);
        //songArtist.addClass('');
        songCard.append(songArtist);

        resultsContainer.append(songCard);
        //songCard.addClass('');

        resultsEl.append(resultsContainer);
    }
}


//displays playlists to aside bar and to modal
function displayUserPlaylists(){
    for (i = 0; i < playlists.length; i++){
        var userPlaylist = $('<div>');

        userPlaylist.text(playlists[i].name);
        userPlaylist.append('<button class=open-playlist-btn></button>');
        userPlaylist.append('<button class=delete-playlist-btn></button>');
        $('#user-playlists').append(userPlaylist);

        $('#playlists-modal').append('<button class=playlist-selected>' + playlists[i].name + '</button>')
    }
}

displayUserPlaylists()

//listens for which song to add to a playlist
$('#results').on('click', ".add-song", function(){
    var title = $(this).attr("data-title")
    var artist = $(this).attr("data-artist")
    var cover = $(this).attr("data-albumCover")
    song = {
        name: title,
        artistName: artist,
        albumCover: cover
    }
})

//listens for which playlist to add the song to
$('#playlists-modal').on('click', '.playlist-selected', function(){
    var playlistSelected = $(this).text()
    var playlistSelectedObject = playlists.find((x) => x.name == playlistSelected)
    console.log(playlistSelectedObject)
    playlistSelectedObject.songs.push(song)
    localStorage.setItem("userPlaylists", JSON.stringify(playlists))
})

//creates a new playlist
function addPlaylist(input){
    $("#user-playlists").append("<button class=user-playlist>" + input)
    $('#playlists-modal').append('<button class=playlist-selected>' + input + '</button>')
}

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

//listens for creating a new playlist
addPlaylistButtonEl.on('click', function(){
    var userInput = playlistNameEl.val()
    var userPlaylist = {
        name: userInput,
        songs: []
    }
    playlists.push(userPlaylist)
    localStorage.setItem("userPlaylists", JSON.stringify(playlists))
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
