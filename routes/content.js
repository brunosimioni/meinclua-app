var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/contato', function(req, res) {
	res.render('contato');
});

router.get('/parceiros', function(req, res) {
	res.render('parceiros');
});

router.get('/sobre', function(req, res) {
	res.render('sobre');
});

router.get('/termos_condicoes', function(req, res) {
	res.render('termos_condicoes');

});

module.exports = router;
