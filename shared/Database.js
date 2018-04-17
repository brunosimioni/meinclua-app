var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
console.log("Initializing database...")

db.serialize(function() {
  db.run("CREATE TABLE email_contato (sender TEXT, text TEXT)");
  db.run("CREATE TABLE users (id INTEGER, email TEXT, password TEXT, user_type INTEGER, created_at INTEGER)");
  db.run("CREATE TABLE users_logins (email TEXT, password TEXT, user_type INTEGER, created_at INTEGER)");
  db.run("CREATE TABLE venues_nps (id TEXT, nps INTEGER, id_user INTEGER, FOREIGN KEY (id_user) REFERENCES users(id))");
  db.run("CREATE TABLE venues_score (id TEXT, score INTEGER, number_votes INTEGER)");
});

var database = {
  db: db,
}

module.exports = db;
