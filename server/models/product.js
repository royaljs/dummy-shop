const Sequelize = require("sequelize");
const { associate } = require("./shop");

module.exports = class Product extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        shop_id: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        price: {
          // 상품별 금액
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        description: {
          // 상품 설명(ex. 메뉴판에 뜨는 상세 설명)
          type: Sequelize.STRING(100),
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Product",
        tableName: "product_table",
        paranoid: false,
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Product.belongsTo(db.Shop, { foreignKey: "shop_id", targetKey: "id" });
  }
};
