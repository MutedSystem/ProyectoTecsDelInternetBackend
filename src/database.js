import mysql from 'mysql';

const database = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'crearte',
    multipleStatements: true
});

export default database;