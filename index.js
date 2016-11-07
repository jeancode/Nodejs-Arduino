var serialPort = require("serialport");
var app = require("express")();
var server = require("http").Server(app);

var  io = require("socket.io")(server);

var serial = new serialPort('COM3',{parser: serialPort.parsers.readline('\n'),"baudRate": 9600});


serial.on('open',function(err){
	
	if(err != null){
		console.log("error");
	}else{
		
		console.log("Conexcion lista");
	}
});



app.get('/',function(req,res){
	
	res.sendfile("index.html");
	
});



io.on('connection', function (socket) {
  
  
	serial.on('data',function(data){
	
		socket.emit('news', { serial: data.toString() });
	
	});

  
});

server.listen(80);