var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/agradecimentos', function(req, res) {
	res.render('agradecimentos');
});

router.get('/sobre', function(req, res) {
	res.render('sobre');
});

router.get('/termos_condicoes', function(req, res) {
	res.render('termos_condicoes');

});

router.get('/ajuda', function(req, res) {
	res.render('ajuda');

});

router.get('/login', function(req, res) {
	res.render('login');

});

router.get('/survey', function(req, res) {
	res.render('survey');
});


module.exports = router;
