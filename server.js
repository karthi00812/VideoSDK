var express = require('express.io');
var app = express();
var fs=require('fs');
const https = require('https')
var PORT = process.env.PORT || 3001;


// const httpsOptions = {
//     key: fs.readFileSync('security/selfsigned.key'),
//     cert: fs.readFileSync('security/selfsigned.crt')
// }
// app.https(httpsOptions).io();

app.http().io();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	// res.render('index.ejs');

	console.log("request camr");
	res.render('test.ejs');
});

app.listen(PORT,()=>{console.log(`Example app listening on port ${port}!`)});


app.io.route('ready', function(req) {
	req.io.join(req.data.chat_room);
	req.io.join(req.data.signal_room);
	app.io.room(req.data).broadcast('announce', {
		message: 'New client in the ' + req.data + ' room.'
	})
})

app.io.route('send', function(req) {
    app.io.room(req.data.room).broadcast('message', {
        message: req.data.message,
		author: req.data.author
    });
})

app.io.route('signal', function(req) {
	//Note the use of req here for broadcasting so only the sender doesn't receive their own messages
	req.io.room(req.data.room).broadcast('signaling_message', {
        type: req.data.type,
		message: req.data.message
    });
})