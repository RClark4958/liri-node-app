const request = require("request");

const moment = require("moment");

const keys = require("./keys.js");

const output = require("./output.js");

function run(searchTerm) {
  if (searchTerm) {
    const queryURL = `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=${keys.bandsInTown.id}`;
    request(queryURL, function (error, response, body) {
      let resultsString = "-".repeat(45) + '\nnode liri.js {concert-this} "' + searchTerm + '"\n' + "-".repeat(18) + "\n";
      if (error) {
        resultsString += " There was an error searching the API:\n" + error;
      }
      else if (body) {
        if (body[0] == "[") {
          if (body[1] == "]") {
            resultsString += " Sorry, that artist has no scheduled events.";
          }
          else {
            let parsedBody = JSON.parse(body);
          }
        }
      }
    })
  }
}