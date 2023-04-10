const express = require('express');
const { 
  getAllProperties, 
  getPropertyById,
  createProperty,
} = require('../controllers/property.controllers');

const router = express.Router();

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', createProperty);

module.exports = router;
