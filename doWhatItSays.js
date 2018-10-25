var fs = require("fs");

function run(callback) {
  
  fs.readFile("random.txt", "utf8", function(error, data) {
    var command, searchTerm = null;
    var resultsString = "-".repeat(45) + "\nnode liri.js {do-what-it-says}\n" + " -".repeat(18) + "\n";
    
    if (error) {
      resultsString += " There was an error reading the file.\n" + error;
    }
    else {
      var randomText = data;
      resultsString = " It Says: `" + data + "`";
      var splitData = data.split(",");
      command = splitData[0];
      searchTerm = splitData[1][0] === '"' || splitData[1][0] === "'" ? splitData[1].slice(1, -1) : splitData[1];
    }
    console.log(resultsString);
    callback(command, searchTerm);
  });
}

module.exports = {
  run
}