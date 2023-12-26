require("dotenv").config();

const config = {
  server: process.env.SERVER_NAME,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: false,
    trustServerCertificate: true,
  },
};

module.exports = config;