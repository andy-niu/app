var mysql = require('mysql');

var pool = mysql.createPool({
    host     : '104.224.154.206',
    user     : 'root',
    password : 'password@1'
});
pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
}); 

module.exports = pool;