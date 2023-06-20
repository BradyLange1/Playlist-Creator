var userInputEl = $('#search-box');
var searchButtonEl = $('#search-button');
// var resultsEl = document.querySelector('#results-container');
var resultsContainerEl = $('#results-container');
var playlistTitleEl = $('#playlistTitle');
var resultsEl = $('#results');
var addPlaylistButtonEl = $('#create-playlist');
var playlistNameEl = $('#playlist-name');
var searchFormEl = $('#search-form');
var topTracksE1 = $("#topTracks")
var topTracksContainer =$(".topTracks-container")

const topTracksAPIkey = "3558c7712e3053b9f8860b95c09141c8"

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
    resultsContainerEl.html("");

    if (results.data.length === 0) {
        resultsContainerEl.text('No search results found.');
        return;
    } else {
        var resultsEl = $('<div>');
        resultsEl.addClass('results');
        resultsContainerEl.append(resultsEl);

        for (var i = 0; i < results.data.length; i++) {

            var resultCard = $('<div>');
            var resultImg = $('<img>');
            var resultTitle = $('<h3>');
            var resultArtist = $('<p>');
            var addBtn = $('<button>');
            var audioTag = $('<audio controls>')
            var audioPreview = $('source')
      
            var albumCover = results.data[i].album.cover_medium;
            resultImg.attr('src', albumCover);
            resultImg.addClass('resultImg');
            resultCard.append(resultImg);
      
            var songTitle = results.data[i].title;
            resultTitle.text(songTitle);
            resultTitle.addClass('resultTitle');
            resultCard.append(resultTitle);
      
            var artistName = results.data[i].artist.name;
            resultArtist.text(artistName);
            resultArtist.addClass('resultArtist');
            resultCard.append(resultArtist);
            resultCard.append(audioTag)

            audioTag.attr('src', results.data[i].preview)
            audioTag.attr('type', "audio/mpeg")
            audioTag.addClass("audioPreviewSearch") 
            audioTag.append(audioPreview)   

            addBtn.addClass('add-song modal-trigger');
            addBtn.attr('data-title', songTitle);
            addBtn.attr('data-artist', artistName);
            addBtn.attr('data-albumCover', albumCover);
            addBtn.attr('data-target', 'modal1');
            addBtn.attr('data-audio', results.data[i].preview)
            addBtn.attr('data-Id', results.data[i].id)
            resultCard.append(addBtn);
      
            resultCard.addClass('search-result-card');
            resultsEl.append(resultCard);
            }
        }
}

//listens for which playlist button gets clicked for printing to page
$('#user-playlists').on('click', '.user-playlist', function(){
    var playlistSelected = $(this).parent().text();
    var playlistSelectedObject = playlists.find((x) => x.name == playlistSelected);

    printPlaylist(playlistSelectedObject);
})

//prints playlist to results container
function printPlaylist(playlistObject){
    resultsContainerEl.html("");

    var playlistTitleEl = $('<div>');
    var titleText = $('<h2>').text(playlistObject.name);
    playlistTitleEl.addClass('playlistTitle');
    playlistTitleEl.append(titleText);
    resultsContainerEl.append(playlistTitleEl);

    var resultsEl = $('<div>');
    resultsEl.addClass('results');
    resultsContainerEl.append(resultsEl);

    for (var i = 0; i < playlistObject.songs.length; i++) {

        var songCard = $('<div>');
        var songImg = $('<img>');
        var songTitle = $('<h3>');
        var songArtist = $('<p>');
        var deleteBtn = $('<button>');
        var audioTag = $('<audio controls>')
        var audioPreview = $('source')

        var audioMP3 = playlistObject.songs[i].audioPreview
        var albumCover = playlistObject.songs[i].albumCover;

        songImg.attr('src', albumCover);
        songImg.addClass('songImg');
        songCard.append(songImg)

        var title = playlistObject.songs[i].name;
        songTitle.text(title);
        songTitle.addClass('songTitle');
        songCard.append(songTitle);

        var artistName = playlistObject.songs[i].artistName;
        songArtist.text(artistName);
        songArtist.addClass('songArtist');
        songCard.append(songArtist);

        audioTag.attr('src', audioMP3)
        audioTag.attr('type', "audio/mpeg")
        audioTag.addClass("audioPreviewPlaylist")
        audioTag.append(audioPreview)
        songCard.append(audioTag)

        deleteBtn.addClass('delete-song');
        deleteBtn.attr('data-index', i)
        songCard.append(deleteBtn);

        songCard.addClass('songCard');
        resultsEl.append(songCard);
    }
}

//displays playlists to aside bar and to modal
function displayUserPlaylists(){
    $('#playlists-modal').html('')
    $('#user-playlists').html('')
    for (i = 0; i < playlists.length; i++){
        var userPlaylist = $('<div class=playlist-list>');

        userPlaylist.append('<button class=user-playlist></button>');
        userPlaylist.append('<p class=user-playlist-name>' + playlists[i].name);
        userPlaylist.append('<button class=delete-playlist-btn></button>');
        $('#user-playlists').append(userPlaylist);

        $('#playlists-modal').append('<div class=choosingPlaylist><button class=playlist-selected><span id=playlist-text>' + playlists[i].name + '</span></button></div>')
    }
}

displayUserPlaylists()

//listens for which song to add to a playlist
$('#results-container').on('click', ".add-song", function(){
    var title = $(this).attr("data-title")
    var artist = $(this).attr("data-artist")
    var cover = $(this).attr("data-albumCover")
    var audio = $(this).attr("data-audio")
    var songId = $(this).attr("data-Id")
    song = {
        name: title,
        artistName: artist,
        albumCover: cover,
        audioPreview: audio,
        id: songId
    }
})

//listens for which song to delete
$('#results-container').on('click', '.delete-song', function(){
    var selectedPlaylist = $(this).parent().parent().parent().find('h2').text()
    var selectedPlaylistIndex = playlists.findIndex((x) => x.name == selectedPlaylist)
    var selectedPlaylistObject = playlists.find((x) => x.name == selectedPlaylist)
    var selectedPlaylistSongs = playlists[selectedPlaylistIndex].songs
    var selectedSong = $(this).attr('data-index')
    selectedPlaylistSongs.splice(selectedSong, 1)
    printPlaylist(selectedPlaylistObject)
    localStorage.setItem("userPlaylists", JSON.stringify(playlists))
})

// Hide dashboard(home page) on any button click
$('body').on("click", 'button', function(){
    $('#dashboard').hide();
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
    var userPlaylist = $('<div class=playlist-list>');

    userPlaylist.append('<button class=user-playlist></button>');
    userPlaylist.append('<p class=user-playlist-name>' + input);
    userPlaylist.append('<button class=delete-playlist-btn></button>');
    $('#user-playlists').append(userPlaylist);

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

//listens for deleting a playlist
$('#user-playlists').on('click', '.delete-playlist-btn', function(){
    var selectedPlaylist = $(this).prev().text()
    console.log(selectedPlaylist)
    selectedPlaylistIndex = playlists.findIndex((x) => x.name == selectedPlaylist)
    playlists.splice(selectedPlaylistIndex, 1)
    console.log(playlists)
    localStorage.setItem("userPlaylists", JSON.stringify(playlists))
    displayUserPlaylists()
})

// Get the input field


// Execute a function when the user presses a key on the keyboard
userInputEl.on("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        $('#dashboard').hide();
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

// set Good morning/Good afternoon/good evening on first page
$(document).ready(function() {
    getAndSetTopTracks()
    setGreeting();
});

function setGreeting() {
    var ndate = new Date();
    var hours = ndate.getHours();
    var message = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
    $("h4.day-message").text(message);
  }

//fetch top tracks info
function getAndSetTopTracks() {
    var requestUrl = "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" + topTracksAPIkey + "&format=json"

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            printTopTracks(data);
            }
        )
};

//Display top tracks to dashboard container
function printTopTracks(topTracks){
    console.log('TOP TRACKS', topTracks)
    topTracksE1.html("");

    if (topTracks.tracks.track.length === 0) {
        topTracksContainer.text('No top tracks found.');
        return;
    } else {
        for (var i = 0; i <= 5; i++) {

            var topTracksCard = $('<div>');
            var topTracksButton = $('<button>');
            var topTracksTitle = $('<h3>');
            var topTracksArtist = $('<p>');
      
            topTracksButton.addClass('topTracksBtn');
            topTracksCard.append(topTracksButton);
      
            var songName = topTracks.tracks.track[i].name;
            topTracksTitle.text(songName);
            topTracksTitle.addClass('topTracksTitle');
            topTracksCard.append(topTracksTitle);
      
            var artistName = topTracks.tracks.track[i].artist.name;
            topTracksArtist.text(artistName);
            topTracksArtist.addClass('topTracksArtist');
            topTracksCard.append(topTracksArtist);
                  
            topTracksCard.addClass('topTracks-card');
            topTracksE1.append(topTracksCard);
            }
        }
}

$('#topTracks').on('click', '.topTracksBtn', function(){
    var song = $(this).next().text()
    getInfo(song)
})
