const Booking = artifacts.require("Booking");
const truffleAssert = require("truffle-assertions");

contract("Booking", (accounts) => {
    let booking;
  
    beforeEach(async () => {
      booking = await Booking.new();
    });
  
    it("should create a new booking", async () => {
        const propertyId = 101;
        const checkInDate = 1680710400;
        const checkOutDate = 1680796800;
        const totalAmount = 100;
      
        const tx = await booking.createBooking(propertyId, checkInDate, checkOutDate, totalAmount, { from: accounts[0] });
      
        truffleAssert.eventEmitted(tx, "BookingCreated", (ev) => {
          return (
            ev.id.toNumber() === 1 &&
            ev.user === accounts[0] &&
            ev.propertyId.toNumber() === propertyId &&
            ev.checkInDate.toNumber() === checkInDate &&
            ev.checkOutDate.toNumber() === checkOutDate &&
            ev.totalAmount.toNumber() === totalAmount
          );
        });
      
        const bookingResult = await booking.getBooking(1);
        assert.equal(bookingResult.id.toNumber(), 1, "Booking ID should be 1");
        assert.equal(bookingResult.user, accounts[0], "User address should match");
        assert.equal(bookingResult.propertyId.toNumber(), propertyId, "Property ID should match");
        assert.equal(bookingResult.checkInDate.toNumber(), checkInDate, "Check-in date should match");
        assert.equal(bookingResult.checkOutDate.toNumber(), checkOutDate, "Check-out date should match");
        assert.equal(bookingResult.totalAmount.toNumber(), totalAmount, "Total amount should match");
      });      
  });
  