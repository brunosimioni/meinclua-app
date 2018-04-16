var express = require('express');
var unirest = require('unirest');
var sgSend = require('../shared/SendGrid');

var router = express.Router();
var apiKey = process.env.GOOGLE_MAPS_API_KEY;
var GooglePlaceAPISearch = "https://maps.googleapis.com/maps/api/place/radarsearch/json?"

GooglePlaceAPISearch += "location=-22.902575,-47.064854&";
GooglePlaceAPISearch += "radius=20000&";
GooglePlaceAPISearch += "type=school&";
GooglePlaceAPISearch += "keyword=escolas%20em%20campinas&";
GooglePlaceAPISearch += "rankby=distance&";
GooglePlaceAPISearch += "key=" + apiKey;

router.get('/places', function(req, res) {
  unirest.get(GooglePlaceAPISearch)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .end(function (response) {
      res.json(response.body);
    });
});

router.post("/contact", function(req, res) {
    console.log(req.body);
    var body = req.body;
    sgSend((body.from || ""), (body.text || ""));
    res.json({status: "ok"});
});
module.exports = router;
