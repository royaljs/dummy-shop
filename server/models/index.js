const Sequelize = require("sequelize");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../config/config"))[env];

const Shop = require("./shop");
const Product = require("./product");
const Image = require("./image");
const Order = require("./order");
const Item = require("./item");

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
db.Image = Image;
db.Order = Order;
db.Item = Item;

db.Shop.init(sequelize);
db.Product.init(sequelize);
db.Image.init(sequelize);
db.Order.init(sequelize);
db.Item.init(sequelize);

Shop.associate(db);
Product.associate(db);
Image.associate(db);
Order.associate(db);
Item.associate(db);

module.exports = db;
