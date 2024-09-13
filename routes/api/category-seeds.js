const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!rowsDeleted) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
