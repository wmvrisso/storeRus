const dotenv = require("dotenv");
//import dotenv from 'dotenv';
dotenv.config();
const { Sequelize } = require('sequelize');
//import { Sequelize } from 'sequelize';

// Create a connection object
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;