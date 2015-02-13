var assert = require("assert");
var request = require("supertest");

request = request("http://fmsocial.herokuapp.com/");

// Example of a Basic test using Mocha and Supertest.
describe("When a user goes to Guardian project page", function() {
it("should return status code 200 OK", function(done) {
request.get("/")
.expect(200, done);
});
});