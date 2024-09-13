const router = require('express').Router();
const { Product, Category, Tag } = require('../../models');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, Tag],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, Tag],
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedProduct[0]) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!rowsDeleted) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
