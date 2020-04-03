import { Sequelize } from 'sequelize';
import { Pool } from 'pg';
import './env';

export const configDatabase = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  storage: './database.sqlite',
  dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres',
  port: 5432,
  logging: false,
});

export const createDatabase = async () => {
  try {
    const pool = new Pool({
      database: 'postgres',
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASS,
      port: 5432,
    });

    await pool.query(`SELECT FROM pg_database WHERE datname =  '${process.env.DB_NAME}'`, (err, res) => {
      if (res.rowCount <= 0) {
        pool.query(`CREATE DATABASE ${process.env.DB_NAME}`, () => {
          pool.end();
        });
      }
      pool.end();
    });

    await configDatabase.sync();
  } catch (err) {
    console.log(err);
  }
};
