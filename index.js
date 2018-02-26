var dotenv = require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var Client = require('node-rest-client').Client;
var app = new express();
var client = new Client();
var apiURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search";

app.use(express.static('public') );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//index or home
app.get('/',function(req,res){
	res.status(200).end('home');
});

//path to readme/documentation page
app.get('/docs',function(req,res){
	res.status(200).end('docs');
});

//path to search for images
app.all(/(\/search)|(\/search\/:terms)/,function(req,res){
	var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
	//parse request terms
	client.get(apiURL+'&api_key=' +process.env.API_KEY+ '&media=photos&per_page=10&tags='+ query.terms, function(data,resp){
		//need to format resp as pic {url,title,thumb,pageURL}
		//send stuff back to client
		res.status(200).json(data);
	});
});

//path to browse latest images
app.get('/latest/:page',function(req,res){
	//do stuff
});

app.get('/*',function(req,res){
	//do stuff
	res.status(404).end('404 file not found');
});

var listener = app.listen(process.env.PORT,function(){
	console.log("listening on ",process.env.PORT);
});
