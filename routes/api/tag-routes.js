const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

/* This is a get request to the /api/tags route. It is finding all tags and including the associated
product data. */
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: "tag data not found!" })
      return;
    }

    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

/* This is a get request to the /api/tags/:id route. It is finding a single tag by its id and including
the associated product data. */
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagId) {
      res.status(404).json({ message: 'No data found with that id' })
      return;
    }

    res.status(200).json(tagId)
  } catch (err) {
    res.status(500).json(err)
  }
});

/* This is a post request to the /api/tags route. It is creating a new tag. */
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body)
    res.status(200).json(createTag)
  } catch (err) {
    res.status(400).json(err);
  }
});

/* This is updating a tag's name by its id value. */
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateId = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateId[0]) {
      res.status(404).json({ message: 'No tag matches the current ID' });
      return;
    }
    res.status(200).json(updateId)
  } catch (err) {
    res.status(500).json(err)
  }
});

/* This is deleting a tag by its id value. */
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with that ID' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
