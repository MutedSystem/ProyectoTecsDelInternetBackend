import mysql from 'mysql';

const database = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'lme3h_database',
    multipleStatements: true
});

export default database;