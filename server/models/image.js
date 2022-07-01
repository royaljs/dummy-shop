const Sequelize = require("sequelize");

module.exports = class Image extends (
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
        product_id: {
          type: Sequelize.STRING(40),
         },
        shop_id: {
          type: Sequelize.STRING(40),
        },
        filename: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
       },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Image",
        tableName: "image_table",
        paranoid: false,
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Image.belongsTo(db.Product, { foreignKey: "product_id", targetKey: "id" });
  }
};
