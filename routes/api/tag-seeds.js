const router = require('express').Router();
const { Tag, Product } = require('../../models');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a tag by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!rowsDeleted) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json({ message: 'Tag deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
