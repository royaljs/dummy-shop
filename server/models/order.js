const Sequelize = require("sequelize");

module.exports = class Order extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        id: {
          // order_id
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        user_id: {
          // 사용자 id
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
        shop_id: {
          // Shop 고유번호
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: false,
        },
        total_amount: {
          // 최종 청구 금액
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        price_amount: {
          // 상품 금액
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
        tax_amount: {
          // 세금 금액
          type: Sequelize.INTEGER,
          defaultValue: 0,
          unique: false,
        },
        discount_amount: {
          // 주문시 할인 금액
          type: Sequelize.INTEGER,
          defaultValue: 0,
          unique: false,
        },
        description: {
          // 주문 설명(ex. 주문 요청 사항으로 활용 가능)
          type: Sequelize.STRING(100),
        },
        status: {
          // 주문 상태 default : pending(시작 상태)
          type: Sequelize.STRING(20),
          allowNull: false,
          defaultValue: "pending",
          unique: false,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        last_updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Order",
        tableName: "order_table",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Order.hasMany(db.Item, { foreignKey: "order_id", sourceKey: "id" });
  }
};
