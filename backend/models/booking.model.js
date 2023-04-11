const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    property: { type: String, required: true, validate: propertyValidator },
    user: { type: String, required: true, validate: userValidator },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    bookedDates: [{ type: Date, required: true }],
  });  

function propertyValidator(value) {
  // Your custom validation logic for the property field
}

function userValidator(value) {
  // Your custom validation logic for the user field
}

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
