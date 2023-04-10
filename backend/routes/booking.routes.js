const express = require('express');
const { 
  getAllBookings, 
  getBookingById,
  createBooking,
} = require('../controllers/booking.controllers');

const router = express.Router();

router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/', createBooking);

module.exports = router;
