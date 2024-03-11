// const mysql = require('mysql2');

// const { request } = require("express");

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-learn',
//     password: 'Cisco@123'
// });

// module.exports = pool.promise();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('node-learn','root','Cisco@123',{dialect:'mysql',host:'localhost'});

module.exports = sequelize;