var dotenv = require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var Client = require('node-rest-client').Client;
var apiURL = "https://api.flickr.com/services/rest/?method=";
var Handlebars = require('handlebars/runtime');

var app = new express();
var client = new Client();

app.use(express.static('public') );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



//path to search for images
app.all(/(\/search)|(\/search\/:terms)/,function(req,res){
	var url_parts = url.parse(req.url, true);
	var page = url_parts.query.offset !== 'undefined' ? url_parts.query.offset : 1;
	//parse request terms
	client.get(apiURL+'flickr.photos.search&api_key=' +process.env.API_KEY+ '&media=photos&per_page=10&page='+page+'&tags='+ url_parts.query.terms, function(data,resp){
		//need to format resp as pic {url,title,thumb,pageURL}
		//send stuff back to client
		res.status(200).json(data);
	});
});

//path to browse latest images
app.get('/latest/:page', function(req,res){
	var url_parts = url.parse(req.url, true);
	var page = url_parts.query.offset !== 'undefined' ? url_parts.query.offset : 1;
	client.get(apiURL+'flickr.photos.getRecent&api_key=' +process.env.API_KEY+ '&format=json&per_page=10&page='+page+'&extras=date_upload,owner_name,url_sq,views,tags,url_o', {headers: { "Content-Type": "application/json" }}, function(data,resp){
		//send stuff back to client
		var jsonFlickrApi = function(data){
			res.status(200).json(data.photos );
		};
		eval(data.toString());
	});
});

app.get('/latest',function(res,res){
	res.redirect('/latest/1');
});

app.get('/*',function(req,res){
	//do stuff
	res.status(404).end('404 file not found');
});

var listener = app.listen(process.env.PORT,function(){
	console.log("listening on ",process.env.PORT);
});
