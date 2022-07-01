require("dotenv").config();
const env = process.env;

const development = {
  // 개발용 DB 설정
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_DB,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: "mysql",
  timezone: "+09:00",
  dialectOptions: {
    charset: "utf8mb4",
    dateStrings: true,
    typeCast: true,
  },
  define: {
    timestamps: true,
  },
};

const production = {
  // 운영용 DB 설정
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_DB_PRODUCTION,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: "mysql",
};

const test = {
  // 테스트용 DB 설정
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_DB_TEST,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: "mysql",
};

module.exports = { development, production, test };
