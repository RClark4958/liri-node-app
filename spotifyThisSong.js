var request = require("request");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var output = require("./output.js");

var spotify = new Spotify(keys.spotify);

function run(searchTerm) {
  var resultsString = "-".repeat(45) + "\nnode liri.js {spotify-this-song}";
  resultsString += searchTerm ? ' "' + searchTerm + '"\n' + " -".repeat(18) : "\n" + " -".repeat(18);

  if (searchTerm) {
    search(searchTerm, resultsString);
  }
  else {
    search("the sign ace of base", resultsString);
  }
}

function search(searchTerm, resultsString) {
  spotify.search({type: "track",
    query: searchTerm,
    limit:4 
  }).then(function(response) {
    if (response.tracks.items.length > 0) {
      resultsString += "\n I found a match.\n";
      if (response.tracks.items.length > 1) {
        resultsString += " If this isn't the song you want, please include the album or artist name and try again.\n";
      }
      resultsString += " - ".repeat(9);
      var artistsString = "";
      if (response.tracks.items[0].artists) {
        response.tracks.items[0].artists.forEach(function(artist, index) {
          artistsString += index > 0 ? ", " + artist.name : artist.name;
        });
      }

      var songInfoString = "\n Artist(s): " + artistsString;
      songInfoString += response.tracks.items[0].name ? "\n Song name: " + response.tracks.items[0].name : "";
      songInfoString += response.tracks.items[0].external_urls.spotify ? "\n Spotify preview link:\n      " + response.tracks.items[0].external_urls.spotify : "";
      songInfoString += response.tracks.items[0].album && response.tracks.items[0].album.name ? "\n Album: " + response.tracks.items[0].album.name : "";
      resultsString += songInfoString;
    }
    else {
      resultsString += "\n That song does not exist in this dimension."
    }

    output.report(resultsString);
  }).catch(function(error) {
    resultsString += "\n There was an error searching Spotify.\n" + error;
    output.report(resultsString);
  });
}

module.exports = {
  run
}