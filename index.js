var http = require('http');
var twit = require('twitter');
var  fs = require("fs");
var index = fs.readFileSync("./index.html").toString();
var ig = require('instagram-node').instagram();

ig.use({ access_token: '38313696.8ac3169.2676a0eafcb447d391175e0cfec175e3'});
ig.use({ client_id: 'ca838b85d5c84ca786d7aef7c92bb747',
         client_secret: '7f14ce701bdf43be813695a10ecdc14a' });

var twitter = new twit({
	consumer_key: "v1KUPLFkZdiu6BYjsrY98HpaA",
	consumer_secret: "oq47YS6s2iijMDo9heCnfSUVvQ6io5yBlBt6qaKhyYWw3Tm85B",
	access_token_key: "2880735509-hceaqDguGLttwPftuSzdYZfEK7uWehmxyKLJuZ0",
	access_token_secret: "frg80VNHox5mhDds7yz7vf1y1awtjpmss5aepSSXn1bdK"
});

ig.location_search({ lat:51.529457, lng: -0.0423818}, function(err, result, remaining, limit) {
	if (err){
		console.log("Error");
	}
	else{
		console.log("no error" + result);
		console.log(result.length);
		console.log(result);
	}
	//console.log(result);
});



var url = require('url');

http.createServer(function (req, res) {
  console.log("URL:",req.url);
  var word;
  if(req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
} else {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query["text"];
	console.log("query: ", query);
	var geocode = url_parts.query["geocode"];
	var ig_geocode =rl_parts.query["ig_geocode"];
	console.log(geocode);
	if(query) {
		  twitter.get('search/tweets', { count: 20, geocode: "40.759101,-73.984406,1mi"}, 
		  function(error, tweets, response){
		  res.writeHead(200, {'Content-Type': 'application/javascript'});
		  res.end(JSON.stringify(tweets.statuses));
	  // res.write(tweets);
	});
	

	}else if (geocode) {
		twitter.get('search/tweets', {count:20, geocode: geocode}, 
			function(errpr,tweets,response){
				res.writeHead(200,  {'Content-Type': 'application/javascript'});
				res.end(JSON.stringify(tweets.statuses));
			});

	}else if (ig_geocode){


	}
	 else {
		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.end(index);
	}
}
}).listen(process.env.PORT || 3000);