const router = require('express').Router();
const { reset } = require('nodemon');
const sequelize = require('sequelize');
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //find all categories
  // be sure to include its associated products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Category }, { model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No data found with that id'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryLocation = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryLocation);
  } catch (err) {
    res.status(400).json(err);
  }
});

/* This is updating a category by its id value. */
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        category_id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No category matches the current ID'});
      return;
    }
    res.status(200).json(updateCategory)
  } catch (err) {
    res.status(500).json(err);
  }
});

/* This is deleting a category by its id value. */
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        category_id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that ID'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
