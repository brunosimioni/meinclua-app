var express = require('express');
var session = require('express-session');
var unirest = require('unirest');
var sgSend = require('../shared/SendGrid');
var db = require('../shared/Database');

var router = express.Router();
var apiKey = process.env.GOOGLE_MAPS_API_KEY;
var appUrl = process.env.URL;
var GooglePlaceAPISearch = "https://maps.googleapis.com/maps/api/place/radarsearch/json?";

GooglePlaceAPISearch += "location=-22.902575,-47.064854&";
GooglePlaceAPISearch += "radius=20000&";
GooglePlaceAPISearch += "type=school&";
GooglePlaceAPISearch += "keyword=escolas%20em%20campinas&";
GooglePlaceAPISearch += "rankby=distance&";
GooglePlaceAPISearch += "key=" + apiKey;

var GooglePlaceAPIDetails = "https://maps.googleapis.com/maps/api/place/details/json?";
GooglePlaceAPIDetails += "placeid=__placeid__&"
GooglePlaceAPIDetails += "key=" + apiKey;

router.get('/places', function(req, res) {

  unirest.get(GooglePlaceAPISearch)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .end(function (response) {

      var places = response.body.results;

      db.query("SELECT * FROM escolas").then(result => {

        var escolas = result.rows;
        for (var i = 0; i < places.length; i++) {
          for (var j = 0; j < escolas.length; j++) {
            if (escolas[j].escola_endereco_gmaps_id == places[i].id) {
              places[i].escolaData = escolas[j];
            }
          }
        }

        res.json(places);

      }).catch(e => console.error(e.stack));
    });
});

router.get("/places/details/:id/gmapsid/:gmapsid", function (req, res){

  var placeId = req.params.id;
  var gmapsId = req.params.gmapsid;
  var reqUrl = GooglePlaceAPIDetails.replace("__placeid__", placeId);
  unirest.get(reqUrl)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .end(function (response) {

      db.query("SELECT avg(nps) FROM escolas_nps WHERE gmaps_id = $1", [gmapsId]).then(result => {

        var avg_score = result.rows[0].avg;

        response.body.npsData = {
            avg_score: avg_score
        }

        res.json(response.body);

      }).catch(e => console.error(e.stack));
    });
});

router.post("/contact", function(req, res) {
    console.log(req.body);
    var body = req.body;
    sgSend((body.from || ""), (body.text || ""));
    res.json({status: "ok"});
});

router.post("/signup", function(req, res) {

  try
  {
    var data = req.body;
    console.log(data);

    var stmt;

    if (data.type == "escola") {

      var fields = ["escola_email", "escola_senha", "escola_cnpj", "escola_telefone",
        "escola_especialidade", "escola_numalunos", "escola_cid", "escola_endereco_completo",
        "escola_endereco_route", "escola_endereco_street_number", "escola_endereco_complemento",
        "escola_endereco_administrative_area_level_2", "escola_endereco_administrative_area_level_1",
        "escola_endereco_postal_code", "escola_endereco_country", "escola_endereco_gmaps_id",
        "escola_check_estrutura", "escola_check_vagas", "escola_check_integral", "escola_professores", "escola_check_termos"];

      var params = [];
      for (var i in fields) {
        params.push(data[fields[i]]);
      }

      var query = "INSERT INTO escolas (" + fields.join(", ");
      query += ") VALUES (";
      for (var i = 0; i < fields.length; i++) {
        query += ("$"+(i+1))

        if (i < fields.length-1)
          query += ","
      }

      query += ")";

      console.log("signup escola query: " + query);
      db.query(query, params).then(result => {}).catch(e => console.error(e.stack));
    }
    else if (data.type == "usuario")
    {
      console.log("insercao no banco");
      db.query("INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)", [data.usuario_nome, data.usuario_email, data.usuario_senha]).then(result => {}).catch(e => console.error(e.stack));;
    }

    req.session.user = data;
    res.json({user: data, status: "ok"});
  } catch (e) {
    console.log("Erro ao cadastrar usuário.");
    console.log(e);
  }
});

router.post("/login", function(req, res) {
  try {
      var data = req.body;
      var email = data.login_email;
      var senha = data.login_senha;

      db.query("SELECT * FROM usuarios WHERE email = $1 AND senha = $2", [email, senha]).then(result =>
      {
        var usuario = result.rows[0];
        console.log("Tentativa de login de usuário. Email: " + email + " + senha: " + senha + " resultado: " + JSON.stringify(usuario));

        if (usuario == null)
        {
          db.query("SELECT * FROM escolas WHERE escola_email = $1 and escola_senha = $2", [email, senha]).then(result => {

            var escola = result.rows[0];

            console.log("Tentativa de login de escola. Email: " + email + " + senha: " + senha + " resultado: " + JSON.stringify(escola));

            if (escola == null) {
                res.json({escola: escola, status: "nok"});
            }
            else
            {
              // deixar o dado parecido com o form de signup
              for (var i in escola) {
                escola["escola_"+i] = escola[i];
                delete escola[i];
              }
              escola.type = "escola";
              req.session.user = escola;
              res.json({status: "ok"});
            }
          }).catch(e => console.error(e.stack));
        }
        else
        {
          // deixar o dado parecido com o form de signup
          for (var i in usuario) {
            usuario["usuario_"+i] = usuario[i];
            delete usuario[i];
          }
          usuario.type = "usuario";
          req.session.user = usuario;
          res.json({status: "ok"});
        }

      }).catch(e => console.error(e.stack));
  }
  catch(e) {
    console.log(e)
  };
});

router.post("/logout", function(req, res) {
  req.session.user = null;
  res.json({status: "ok"});
});

router.post("/rating", function(req, res) {

  var data = req.body;
  var value = data.value;
  var place = data.place;

  if (!place.id)
    res.json({status: "not_found"});

  console.log("votação, nota: " + value + " escola:" + JSON.stringify(place));
  db.query("INSERT INTO escolas_nps (gmaps_id, nps) VALUES ($1, $2)", [place.id, value]).then(result => {}).catch(e => console.error(e.stack));

  res.json({status: "ok"});
});



module.exports = router;
