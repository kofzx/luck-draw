const mysql = require('mysql');
const connection = mysql.createConnection({
	host: '',
	user: 'root',
	password: 'root',
	database: 'my'
});
connection.connect();

connection.query("select * from bags", function(err, res, fields) {
	if (err) throw err;
	console.log(res[0]);
});