const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  brandName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productType: {
    type: Sequelize.ENUM("face", "eye", "lip", "nail"),
    allowNull: false,
    defaultValue: "face",
    validate: {
      notEmpty: true,
    },
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 1000,
    },
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Product;
