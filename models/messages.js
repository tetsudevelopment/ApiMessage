const Joi = require('joi');
const pool = require('../config/database');

const schema = Joi.object({
  content: Joi.string().required(),
});

const create = async (message) => {
  const { content } = message;
  
  const connection = await pool.getConnection();
  const [result] = await connection.query('INSERT INTO messages (content) VALUES (?)', [content]);

  await connection.release();

  return result.insertId;
};

const getAll = async () => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query('SELECT * FROM messages');
    return rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = { schema, create, getAll };