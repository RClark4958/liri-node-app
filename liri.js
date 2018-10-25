require("dotenv").config();

var keys = require("./keys.js");

var concertThis = require("./concertThis.js");
var spotifyThisSong = require("./spotifyThisSong.js");
var movieThis = require("./movieThis.js");
var doWhatItSays = require("./doWhatItSays.js");

var command = process.argv[2];

if (command)  { 
  command = command.toLowerCase(); }

var searchTerm = process.argv.slice(3).join(" ");

var INVALID = `
Sorry, I didn't recognize that command. Please enter a command in one of the following forms.
   node liri.js concert-this <artist/band name here>
   node liri.js spotify-this-song <song name here>
   node liri.js movie-this <movie name here>
   node liri.js do-what-it-says`;
   
doThis(command, searchTerm);

function doThis(command, searchTerm) {
  switch (command) {
    case "concert-this":
      concertThis.run(searchTerm);
      break;
    case "spotify-this-song":
      spotifyThisSong.run(searchTerm);
      break;
    case "movie-this":
      movieThis.run(searchTerm);
      break;
    case "do-what-it-says":
      doWhatItSays.run(doThis);
      break;
    default:
      console.log(INVALID);
  }
}



