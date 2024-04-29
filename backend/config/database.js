/*database.js*/

//set the uri, user and password from the env file
require('dotenv').config();
const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;

const neo4j = require('neo4j-driver');
//init the driver
const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(
    user,
    password
  )
);

module.exports = driver;