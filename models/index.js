const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require("./Item");

Item.belongsToMany(Menu, { through: "menuItems"});
Menu.belongsToMany(Item, { through: "menuItems"});

module.exports = { Restaurant, Menu, Item}
