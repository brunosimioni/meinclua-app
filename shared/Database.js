var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
console.log("Initializing database...")

db.serialize(function() {
  db.run("CREATE TABLE email_contato (sender TEXT, text TEXT)");
  db.run("CREATE TABLE usuarios (id INTEGER, nome TEXT, email TEXT, senha TEXT)");
  db.run("CREATE TABLE escolas (escola_email TEXT, escola_senha TEXT, escola_cnpj TEXT, escola_telefone TEXT, escola_especialidade TEXT, escola_numalunos TEXT, escola_cid TEXT, escola_endereco_completo TEXT, escola_endereco_route TEXT, escola_endereco_street_number TEXT, escola_endereco_complemento TEXT, escola_endereco_administrative_area_level_2 TEXT, escola_endereco_administrative_area_level_1 TEXT, escola_endereco_postal_code TEXT, escola_endereco_country TEXT, escola_endereco_gmaps_id, TEXT, escola_check_estrutura TEXT, escola_check_vagas TEXT, escola_check_integral TEXT, escola_professores TEXT, escola_check_termos TEXT)");
  db.run("CREATE TABLE escolas_nps (id_escola INTEGER, id TEXT, nps INTEGER, id_user INTEGER, FOREIGN KEY (id_user) REFERENCES users(id), FOREIGN KEY (id_escola) REFERENCES escolas(id))");
  db.run("CREATE TABLE escolas_score (id TEXT, media INTEGER, num_votos INTEGER)");
});

var database = {
  db: db,
}

module.exports = db;
