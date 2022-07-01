const Sequelize = require("sequelize");

module.exports = class OrderItem extends (
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
        order_id: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        product_id: {
          type: Sequelize.STRING(40),
        },
        name: {
          type: Sequelize.STRING(40),
        },
        total_amount: {
          // 상품별 최종 청구 금액
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price_amount: {
          // 상품별 금액
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        tax_amount: {
          // 상품별 세금 금액
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        discount_amount: {
          // 상품별 할인 금액
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        quantity: {
          // 상품 수량
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Item",
        tableName: "item_table",
        paranoid: false,
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Item.belongsTo(db.Order, { foreignKey: "order_id", targetKey: "id" });
  }
};
