var fs = require("fs");

function report(results) {
  results += "\n" + "_".repeat(45) + "\n";
  console.log(results);
  fs.appendFile("log.txt", results, function(error) {
    if(error) {
      console.log("There was an error writing the result to the log. \n" + error);
    }
  });
}

module.exports = {
  report
}