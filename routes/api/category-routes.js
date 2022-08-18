const router = require('express').Router();
const { reset } = require('nodemon');
const sequelize = require('sequelize');
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

/* This is a get request to the api/categories route. It is finding all categories and including the
associated products. */
router.get('/', async (req, res) => {
  //find all categories
  // be sure to include its associated products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    /* This is checking to see if the categoryData variable is empty. If it is, it is sending a 404
    status code and a message to the user. If it is not empty, it is sending a 200 status code and the
    categoryData variable. */
    if (!categoryData) {
      res.status(404).json({ message: "Category not found!" })
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* This is a get request to the api/categories/:id route. It is finding one category by its id value
and including the associated products. */
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    /* This is checking to see if the categoryData variable is empty. If it is, it is sending a 404
    status code and a message to the user. If it is not empty, it is sending a 200 status code and the
    categoryData variable. */
    if (!categoryData) {
      res.status(404).json({ message: 'No data found with that id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

/* This is creating a new category. */
router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
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
        id: req.params.id,
      },
    });

    /* This is checking to see if the updateCategory variable is empty. If it is, it is sending a 404
    status code and a message to the user. If it is not empty, it is sending a 200 status code and the
    updateCategory variable. */
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No category matches the current ID' });
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
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    /* This is checking to see if the categoryDelete variable is empty. If it is, it is sending a 404
    status code and a message to the user. If it is not empty, it is sending a 200 status code and the
    categoryDelete variable. */
    if (!categoryDelete) {
      res.status(404).json({ message: 'No category found with that ID' });
      return;
    }

    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
