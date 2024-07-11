const config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
  },
  migrations: {
    directory: "../migrations/"
  },
  seeds: {
    directory: "../seeds/"
  }
};

export default config;
