var express = require('express')
var app = express()

var exec = require("child_process").exec;

var process_name = "FXServer";
var server_dir = "/home/Gabi/FXServer/server-data"
var start_script = "bash /home/Gabi/FXServer/server/run.sh +exec /home/Gabi/FXServer/server-data/server.cfg"
var key = "SiliconRP_"
var port = 80

app.get("/", function(request, response){ 
    response.send("FiveM Linux Control API - <a href='https://github.com/GabrielMartinezRodriguez/ApiFivemServerControl-Linux.git'> GIT REPOSITORY</a> <hr><a href='/restart'>Restart</a><br><a href='/stop'>Stop</a><br><a href='/start'>Start</a>");
});

app.get("/restart", function(request, response){ 
    if (request.query['key'] === key) {
		exec("pkill -e " + process_name, (error, stdout, stderr) => { 
			exec(start_script, (error, stdout, stderr) => { 
				console.log(error);
			})
		})
		response.send("done");
	} else {
		response.statusCode = 401;
		response.send("401 Unauthorized");
	}
});

app.get("/stop", function(request, response){ 
    if (request.query['key'] === key) {
		exec("pkill -f " + process_name, (error, stdout, stderr) => { 
			console.log(error)
		})
		response.send("done");
	} else {
		response.statusCode = 401;
		response.send("401 Unauthorized");
	}
});

app.get("/start", function(request, response){ 
    if (request.query['key'] === key) {
		exec(start_script, (error, stdout, stderr) => { 
            console.log(error);
        })
		response.send("done");
	} else {
		response.statusCode = 401;
		response.send("401 Unauthorized");
	}
});

app.listen(port)