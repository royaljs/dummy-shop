const Sequelize = require("sequelize");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../config/config"))[env];

const Shop = require("./shop");
const Product = require("./product");
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Shop = Shop;
db.Product = Product;
db.Shop.init(sequelize);
db.Product.init(sequelize);

Shop.associate(db);
Product.associate(db);

module.exports = db;
