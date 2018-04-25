var http = require('http');
var spawn = require("child_process").spawn;
const config = require('./config');
const express = require('express');
var fs = require('fs');
const fileUpload = require('express-fileupload');
const app = new express();

app.use(express.static(__dirname + '/')); // to load default html on call to server.
app.use(fileUpload());

class send_response {
	constructor(file_name, features){
		this.file_name = file_name;
		this.features = features;
	}

}
// to read all Json files in ./json directory and transfer data in a list of objects
app.get(`${config.baseUrl}`,function(req,res){
	var dir = './json';
	if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
	var files = fs.readdirSync(dir);
	var list = [];
	var pathForJson = "";
	var resource = [];
	if(files != null){
		files.forEach(element => {
			pathForJson = dir+'/'+element;
			var jsonFile = fs.readFileSync(pathForJson);
			var jsonObj = JSON.parse(jsonFile);
			var obj = new send_response(element,jsonObj.features);			
			list.push(obj);			
		});
	}
	else {console.log ("No file in json")}
	res.send(list);
})

// downloads uploaded csv and sends it to python script
app.post('/', function(req,res){
	var fileName = "";
	var dir = './csv';
	let sampleFile = req.files.filetoupload;

		if(sampleFile)
		{
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			fileName = sampleFile.name;
			sampleFile.mv(dir+'/'+fileName, function(err) {
				if (err) throw err;
				res.redirect('#');
				console.log('File written!');

			});			
			
			var pythonProcess = spawn('python',["./converterToGeoJson.py",fileName]);
			updateFileList(fileName);
			console.log("Process started...")
			pythonProcess.stdout.on('data', function (data){
				console.log(data.toString());
			});
		}
		else {
			res.redirect('#');
		}

});

function updateFileList(fileName){
	var flag = true;
	console.log("Entering While loop with FileName: "+ fileName);
	while(flag){
		if (fs.existsSync("./csv/"+fileName)) {
			console.log("File exists");
			fs.readFile('./csv/'+fileName, 'utf8', function (err,data) {
				if (err) {
					return console.log(err);
				}
			});
			flag = false;
		}
		else {
			console.log("File Doesn't exists");
			console.log("Sorry, I was about to stuck in infinite while :(");
			break;
		}
	}
}

app.listen(config.port, () =>
console.log(`Service is running on port ${config.port}`)
);
	