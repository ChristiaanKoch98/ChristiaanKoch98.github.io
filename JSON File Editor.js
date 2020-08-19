var fs = require("fs");

//Load a selected JSON file
function LoadFile () {
  //Convert from JSON object to JS object
  const selectedFile = document.getElementById('input').files[0];

  var contents = fs.readFileSync(selectedFile);
  jsonObject = JSON.parse(contents)

  output = "";

  //Get all of the properties of the JSON object
  for (var property in jsonObject) {
      if (!jsonObject.hasOwnProperty(property))
        continue;

      objectType = typeof property
      objectValue = jsonObject[property]

      output += `${objectType} : ${objectValue} (${objectType})\n`
  }

  return output;
}

