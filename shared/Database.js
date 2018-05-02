const { Client } = require('pg')
const client = new Client()

console.log("Connecting to PostgreSQL...")
client.connect();

try {
  runCreateQuery("CREATE TABLE IF NOT EXISTS usuarios (id BIGSERIAL PRIMARY KEY, nome TEXT, email VARCHAR, senha VARCHAR)");
  runCreateQuery("CREATE TABLE IF NOT EXISTS escolas (" +
      "id BIGSERIAL PRIMARY KEY, escola_email VARCHAR, escola_senha VARCHAR, escola_cnpj TEXT, " +
      "escola_telefone TEXT, escola_especialidade TEXT, escola_numalunos TEXT, escola_cid TEXT, " +
      "escola_endereco_completo TEXT, escola_endereco_route TEXT, escola_endereco_street_number TEXT, " +
      "escola_endereco_complemento TEXT, escola_endereco_administrative_area_level_2 TEXT, " +
      "escola_endereco_administrative_area_level_1 TEXT, escola_endereco_postal_code TEXT, " +
      "escola_endereco_country TEXT, escola_endereco_gmaps_id TEXT, escola_check_estrutura TEXT, " +
      "escola_check_vagas TEXT, escola_check_integral TEXT, escola_professores TEXT, escola_check_termos TEXT)");
  runCreateQuery("CREATE TABLE IF NOT EXISTS escolas_nps (ID BIGSERIAL PRIMARY KEY, gmaps_id VARCHAR, nps INTEGER)");
  runCreateQuery("INSERT INTO usuarios VALUES (1, 'User1', 'user1@users.com', 'user')");
  runCreateQuery("INSERT INTO public.escolas (" +
	   "id, escola_email, escola_senha, " +
     "escola_cnpj, escola_telefone, escola_especialidade, " +
     "escola_numalunos, escola_cid, escola_endereco_completo, " +
     "escola_endereco_route, escola_endereco_street_number, escola_endereco_complemento, " +
     "escola_endereco_administrative_area_level_2, escola_endereco_administrative_area_level_1, " +
     "escola_endereco_postal_code, escola_endereco_country, escola_endereco_gmaps_id, " +
     "escola_check_estrutura, escola_check_vagas, escola_check_integral, " +
     "escola_professores, escola_check_termos) " +
	   " VALUES (1, 'escola@escola', 'escola', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');");
}
catch(e) {
  console.log(e);
}

function runCreateQuery(query) {
  client.query(query)
    .then(res => {})
    .catch(e => console.error(e.stack))
};

module.exports = client;
