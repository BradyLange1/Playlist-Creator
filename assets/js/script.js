var userInputEl = $('#search-box');
var searchButtonEl = $('#search-button');
var resultsEl = document.querySelector('#results');
var addPlaylistButtonEl = $('#create-playlist');
var playlistNameEl = $('#playlist-name');
var searchFormEl = $('#search-form')

var song = {}

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
    resultsEl.innerHTML = "";
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

                addBtn.classList.add('add-song', 'btn', 'modal-trigger');
                addBtn.setAttribute('data-title', songTitle)
                addBtn.setAttribute('data-artist', artistName)
                addBtn.setAttribute('data-albumCover', albumCover)
                addBtn.setAttribute('data-target', 'modal1')
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



    //retrieve from local storage based on unique id, localStorage.getItem();
    //parse stringified object
    for (var i = 0; i < idName.length; i++) {
        // var resultsContainer = document.createElement('div');
        var resultsContainer = $('<div>');
        // var songCard = document.createElement('div');
        var songCard = $('<div>');
        // var songImg = document.createElement('img');
        var songImg = $('<img>');
        // var songTitle = document.createElement('h3');
        var songTitle = $('<h3>');
        // var songArtist = document.createElement('p');
        var songArtist = $('<p>');

        var playlistTitle = idName;
        resultsContainer.append(playlistTitle);

        var albumCover = idName.song[i].albumCover;
        // songImg.setAttribute('src', albumCover);
        songImg.attr('src', albumCover);
        //songImg.classList.add('');
        songCard.append(songImg)

        var title = idName.song[i].name;
        // songTitle.textContent = title;
        songTitle.text(title);
        //songTitle.classList.add('');
        songCard.append(songTitle);

        var artistName = idName.song[i].artistName;
        // songArtist.textContent = artistName;
        songArtist.text(artistName);
        //songArtist.classList.add('');
        songCard.append(songArtist);

        resultsContainer.append(songCard);
        //songCard.classList.add('');

        resultsEl.append(resultsContainer);
    }


//displays playlists to aside bar and to modal
function displayUserPlaylists(){
    for (i = 0; i < playlists.length; i++){
        $('#user-playlists').append('<button class=user-playlist>' + playlists[i].name + '</button>')
        $('#playlists-modal').append('<button class=playlist-selected>' + playlists[i].name + '</button>')
    }
}
displayUserPlaylists()

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

$('#playlists-modal').on('click', '.playlist-selected', function(){
    var playlistSelected = $(this).text()
    var playlistSelectedObject = playlists.find((x) => x.name == playlistSelected)
    console.log(playlistSelectedObject)
    playlistSelectedObject.songs.push(song)
    localStorage.setItem("userPlaylists", JSON.stringify(playlists))
})

function addPlaylist(input){
    $("#user-playlists").append("<button class=user-playlist>" + input)
    $('#playlists-modal').append('<button class=playlist-selected>' + input + '</button>')
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


// fetch data based on search input
// populate data on page

// .playlist-card
// .playlist-img
// .playlist-title