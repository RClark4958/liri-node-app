var request = require("request");
var keys = require("./keys.js");
var output = require("./output.js");

function run(searchTerm) {
  var resultsString = "--".repeat(45) + "\nnode liri.js {movie-this}";
  resultsString += searchTerm ? ' "' + searchTerm + '"\n' + "--".repeat(18) + "\n" : "\n" + " --".repeat(18) + "\n";

  if (searchTerm) {
    search(searchTerm, resultsString);
  }
  else {
    search("Mr. Nobody", resultsString);
  }
}

function search(searchTerm, resultsString) {
  var queryURL = `http://omdbapi.com/?apikey=${keys.omdb.apiKey}&t=${searchTerm}`;

  request(queryURL, function(error, response, body) {
    if (error) {
      resultsString += " There was an error searching the API:\n" + error;
    }
    else {
      var parsedBody = JSON.parse(body);
      if (parsedBody.Response === "True") {
        resultsString += " I found the movie you were looking for.\n" + " " + "--".repeat(20);
        resultsString += createMovieInfoString(parsedBody);
      }
      else {
        resultsString += " Sorry, I couldn't find that movie.";
      }
    }
    output.report(resultsString);
  });
}

function createMovieInfoString(responseBody) {
  var movieInfoString = "";
  var imdbRating, rottenTomatoesRating = null;
  if (responseBody.Ratings) {
    responseBody.Ratings.forEach(function(value) {
      if (value.Source[0] === "I") {
        imdbRating = value.Value
      }
      else if (value.Source[0] === "R") {
        rottenTomatoesRating = value.Value
      }
    });
  }
  movieInfoString += "\n Title: " + responseBody.Title + "\n Year: " + responseBody.Year;
  
  if (imdbRating) {
    movieInfoString += "\n IMDB Rating: " + imdbRating;
  }
  if (rottenTomatoesRating) {
    movieInfoString += "\n Rotten Tomatoes Rating: " + rottenTomatoesRating;
  }
  if (responseBody.Country) {
    movieInfoString += "\n Country: " + responseBody.Country;
  }
  if (responseBody.Language) {
    movieInfoString += "\n Language: " + responseBody.Language;
  }
  if (responseBody.Actors) {
    movieInfoString += "\n Actors: " + responseBody.Actors;
  }
  if (responseBody.Plot) {
    movieInfoString += "\n Plot: " + responseBody.Plot;
  }
  return movieInfoString
}

module.exports = {
  run
}