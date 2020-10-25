require('dotenv').config();
const DbConfiguration = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
}

module.exports = {
  development: DbConfiguration,
  // because .env is centralized file, I afraid to forget its configuration in development
  // and database gets truncated during running TDD by mistake
  test: {
    ...DbConfiguration,
    database: process.env.TEST_DB_NAME,
  },
  production: DbConfiguration,
}
