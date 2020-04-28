require('dotenv').config();

const config = {
  srv: {
    port: process.env.PORT || 3000,
  },
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
  },
  authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = config;
