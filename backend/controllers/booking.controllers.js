const Booking = require('../models/booking.model');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('property user');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('property user');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBooking = async (bookingData) => {
  const { property, user, checkInDate, checkOutDate, totalAmount } = bookingData;

  const booking = new Booking({
    property,
    user,
    checkInDate,
    checkOutDate,
    totalAmount,
  });

  try {
    const savedBooking = await booking.save();
    return savedBooking;
  } catch (error) {
    console.error("Error in createBooking:", error);
    throw error;
  }
};
