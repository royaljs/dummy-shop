const Sequelize = require("sequelize");

module.exports = class Shop extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        id: {
          // shop_id
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        name: {
          // Shop 이름
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        is_pay_later_allowed: {
          // Shop 이름
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        address: {
          // 주소
          type: Sequelize.STRING(100),
        },
        contact_number: {
          // 대표 전화번호
          type: Sequelize.STRING(100),
        },
        contact_email: {
          // 대표 메일
          type: Sequelize.STRING(100),
        },
        description: {
          // Shop 설명
          type: Sequelize.STRING(100),
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Shop",
        tableName: "shop_table",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Shop.hasMany(db.Product, { foreignKey: "shop_id", sourceKey: "id" });
  }
};
