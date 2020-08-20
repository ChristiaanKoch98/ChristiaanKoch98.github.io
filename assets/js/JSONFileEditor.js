var fs = require("fs");

var myWebsiteURL = "https://christiaankoch98.github.io/";

//Load a selected JSON file
function LoadFile (selectedFile) {
  //Convert from JSON object to JS object
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

  document.getElementById("output_paragraph").innerHTML = output;
  //return output;
}

//Drag and drop area stuff
//#region 
let dropArea = document.getElementById('drop-area')

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files
  handleFiles(files)
}

//function handleFiles(files) {
function handleFiles(files) {
  files = document.getElementById("output_paragraph").files
  files = [...files]
  initializeProgress(files.length) // <- Add this line
  files.forEach(uploadFile)
}

function uploadFile(file, i) { // <- Add `i` parameter
  var url = myWebsiteURL
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('POST', url, true)

  // Add following event listener
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Done. Inform the user
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('file', file)
  xhr.send(formData)
}

//Progress bar
let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  progressBar.value = total
}

//#endregion 
