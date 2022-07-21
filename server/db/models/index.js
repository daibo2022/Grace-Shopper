//this is the access point for all things database related!

const db = require("../db");
const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");
const CartProduct = require("./CartProduct");

//associations could go here!
// User.belongsToMany(Product, { through: "UserProduct" });
// Product.belongsToMany(User, { through: "UserProduct" });

User.hasMany(Cart);
Cart.belongsTo(User);

// Product.hasMany(CartProduct)
// CartProduct.belongsTo(Product)

// Cart.hasMany(CartProduct)
// CartProduct.belongsTo(Cart)

Product.belongsToMany(Cart, { through: CartProduct });
Cart.belongsToMany(Product, { through: CartProduct });

module.exports = {
  db,
  User,
  Product,
  Cart,
  CartProduct,
};
