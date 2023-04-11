const path = require('path');
// Web3 configuration
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:8545'); // Replace with your Ethereum network URL

const bookingJSON = require(path.join(__dirname, '..', 'build', 'contracts', 'Booking.json')); // Replace with the path to your Booking.json
const bookingABI = bookingJSON.abi;
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
module.exports = { createBookingOnChain };
