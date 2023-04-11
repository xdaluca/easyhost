const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const propertyRoutes = require('./routes/property.routes');
const bookingRoutes = require('./routes/booking.routes');
const User = require('./models/user.model');
const path = require('path');

// Web3 configuration
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545'); // Replace with your Ethereum network URL

const bookingABI = require(path.join(__dirname, '..', 'build', 'contracts', 'Booking.json')).abi; // Replace with the path to your Booking.json
const bookingAddress = '0x1FDa306e7eAdee82564328B58286cC2CA2d4bD13'; // Replace with your contract address
const bookingContract = new web3.eth.Contract(bookingABI, bookingAddress);

async function createBookingOnChain(propertyId, checkInDate, checkOutDate, totalAmount, userAddress) {
    const gasEstimate = await bookingContract.methods
      .createBooking(propertyId, checkInDate, checkOutDate, totalAmount)
      .estimateGas({ from: userAddress });
  
    const result = await bookingContract.methods
      .createBooking(propertyId, checkInDate, checkOutDate, totalAmount)
      .send({ from: userAddress, gas: gasEstimate });
  
    return result;
  }
// Add this line after the createBookingOnChain function definition
exports.createBookingOnChain = createBookingOnChain;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

// Connect to MongoDB
const connectionString = 'mongodb+srv://xdaluca:gUogulcQ2x8HLyu0@cluster0.wrshs3m.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Import routes
// const propertyRoutes = require('./routes/propertyRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');

// app.use('/api/properties', propertyRoutes);
// app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});