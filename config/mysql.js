const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool(config.mysql);

const getConnection = async () => {
  return await pool.getConnection();
};

module.exports = { getConnection };