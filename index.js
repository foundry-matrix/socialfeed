var http = require('http');
var twit = require('twitter');
var fs = require("fs");
var index = fs.readFileSync("./index.html").toString();
var url = require('url');

var twitter = new twit({
	consumer_key: "v1KUPLFkZdiu6BYjsrY98HpaA",
	consumer_secret: "oq47YS6s2iijMDo9heCnfSUVvQ6io5yBlBt6qaKhyYWw3Tm85B",
	access_token_key: "2880735509-hceaqDguGLttwPftuSzdYZfEK7uWehmxyKLJuZ0",
	access_token_secret: "frg80VNHox5mhDds7yz7vf1y1awtjpmss5aepSSXn1bdK"
});

http.createServer(function (req, res) {
  if(req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
	} else {
		var url_parts = url.parse(req.url, true);
		var geocode = url_parts.query["geocode"];
		} if (geocode) {
			twitter.get('search/tweets', {count:10, geocode: geocode}, 
			function(error,tweets,response){
				res.writeHead(200,  {'Content-Type': 'application/javascript'});
				res.end(JSON.stringify(tweets.statuses));
			});
		}
	 	else {
			res.writeHead(200, {'Content-Type': 'text/html'});
    		res.end(index);
		}
}
).listen(process.env.PORT || 3000);


