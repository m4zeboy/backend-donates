import knex from 'knex';
import knexfile from '../knexfile.js';

const dbEngine = process.env.DB_ENVIRONMENT || 'development';
const config = knexfile[dbEngine]

const dbConfig = knex(config)

export default dbConfig;