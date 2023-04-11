const express = require('express');
const { 
  getAllBookings, 
  getBookingById,
  createBooking,
} = require('../controllers/booking.controllers');

const router = express.Router();

router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/', async (req, res) => {
    // Extract the required data from the request
    const { propertyId, checkInDate, checkOutDate, totalAmount, userAddress } = req.body;
  
    try {
      // Call the createBookingOnChain function to interact with the smart contract
      const result = await createBookingOnChain(propertyId, checkInDate, checkOutDate, totalAmount, userAddress);
  
      // Handle the result, e.g., save the booking to the database, send a response to the client, etc.
      res.status(201).json({ message: 'Booking created successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
  });  
  
  module.exports = router;
