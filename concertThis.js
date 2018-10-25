var request = require("request");

var moment = require("moment");

var keys = require("./keys.js");

var output = require("./output.js");

function run(searchTerm) {
  if (searchTerm) {
    var queryURL = `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=${keys.bandsInTown.id}`;
    request(queryURL, function (error, response, body) {
      var resultsString = "-".repeat(45) + '\nnode liri.js {concert-this} "' + searchTerm + '"\n' + "-".repeat(18) + "\n";
      if (error) {
        resultsString += " There was an error searching the API:\n" + error;
      }
      else if (body) {
        if (body[0] == "[") {
          if (body[1] == "]") {
            resultsString += " Sorry, that artist has no scheduled events.";
          }
          else {
            var parsedBody = JSON.parse(body);
            resultsString += " I found " + parsedBody.length + " scheduled events for that artist.";
            parsedBody.forEach(function(event, index) {
              var headDivider = "\n -< " + (index + 1) + " >" + "-".repeat(30);
              if (index < 9) { 
                headDivider += "-";
              }
              var eventString = createConcertInfoString(event);
              resultsString += headDivider + eventString;
            });
          }
        }
        else {
          resultsString += " Sorry, I'm not familiar with that artist."
        }
      }
      else {
        resultsString += " There was an error searching the API;\n No response body.";
      }
      output.report(resultsString);
    });
  }
  else {
    console.log("\nNo search was run. You must supply an artist/band name with the 'concert-this command.");
  }
}

function createConcertInfoString(event) {
  var result = "";
  if (event.venue) {
    if (event.venue.name) {
      result += "\n Venue " + event.venue.name;
    }
    if (event.venue.city) {
      result += "\n Location: " + event.venue.city;
      if (event.venue.region) {
        result += ", " + event.venue.region;
      }
      if (event.venue.country) {
        result += ", " + event.venue.country;
      }
    }
    else if (event.venue.region) {
      result += "\n Location: " + event.venue.region;
      if (event.venue.country) {
        result += ", " + event.venue.country;
      }
    }
    else if (event.venue.country) {
      result += "\n Location: " + event.venue.country;
    }
  }
  if (event.datetime) {
    result += "\n Date: " + moment(event.datetime).format("MM/DD/YYYY  (ddd., hh:mm a)");
  }
  return result;
}

module.exports = {
  run
}