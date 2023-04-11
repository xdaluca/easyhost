const createBookingOnChain = require('../bookingOnChain').createBookingOnChain;
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
    try {
        const { propertyId, checkInDate, checkOutDate, totalAmount, userAddress } = req.body;

        console.log('propertyId:', propertyId);
        console.log('checkInDate:', checkInDate);
        console.log('checkOutDate:', checkOutDate);
        console.log('totalAmount:', totalAmount);
        console.log('userAddress:', userAddress);

        const result = await createBookingOnChain(
            parseInt(propertyId),
            parseInt(checkInDate),
            parseInt(checkOutDate),
            parseInt(totalAmount),
            userAddress
        );
      
        const savedBooking = await createBooking({
            property: propertyId,
            user: userAddress,
            checkInDate,
            checkOutDate,
            totalAmount,
          });          
    
      res.status(201).json({ blockchainResult: result, booking: savedBooking });
    } catch (error) {
      console.error('Error in POST /api/bookings:', error);
      res.status(500).json({ message: 'An error occurred while creating the booking' });
    }
  });  

module.exports = router;
