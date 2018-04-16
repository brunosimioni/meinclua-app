var sqlite3 = require('sqlite3').verbose();
var sqlite3db = new sqlite3.Database(':memory:');
console.log("Initializing database...")
module.exports = sqlite3db;
