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

router.get('/central_de_ajuda', function(req, res) {
	res.render('central_de_ajuda');

});

router.get('/lista', function(req, res) {
	res.render('lista');

});

router.get('/cadastro', function(req, res) {
	res.render('cadastro');

});

router.get('/editar', function(req, res) {
	res.render('editar');

});

router.get('/cadastrar_editar', function(req, res) {
	res.render('cadastrar_editar');

});

router.get('/esqueceu_senha', function(req, res) {
	res.render('esqueceu_senha');

});

router.get('/login', function(req, res) {
	res.render('login');

});

/* Quando usuário tem cadastro */

router.get('/_cs', function(req, res) {
	res.render('index_cs');
});

router.get('/contato_cs', function(req, res) {
	res.render('contato_cs');
});

router.get('/parceiros_cs', function(req, res) {
	res.render('parceiros_cs');
});

router.get('/sobre_cs', function(req, res) {
	res.render('sobre_cs');
});

router.get('/termos_condicoes_cs', function(req, res) {
	res.render('termos_condicoes_cs');

});

router.get('/central_de_ajuda_cs', function(req, res) {
	res.render('central_de_ajuda_cs');

});

router.get('/lista_cs', function(req, res) {
	res.render('lista_cs');

});

module.exports = router;
