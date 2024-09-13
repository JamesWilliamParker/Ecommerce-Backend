const { Product } = require('../models');

const productData = [
  { product_name: 'Laptop', price: 999.99, stock: 50, category_id: 1 },
  { product_name: 'Smartphone', price: 799.99, stock: 30, category_id: 1 },
  { product_name: 'Blender', price: 59.99, stock: 100, category_id: 2 },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
