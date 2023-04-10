// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Booking {
    // Define the booking structure
    struct BookingInfo {
        uint256 id;
        address user;
        uint256 propertyId;
        uint256 checkInDate;
        uint256 checkOutDate;
        uint256 totalAmount;
    }

    // Store bookings using a mapping with a unique ID
    mapping(uint256 => BookingInfo) public bookings;

    // Keep track of the total number of bookings and the next booking ID
    uint256 public totalBookings;

    // Define an event to notify listeners when a new booking is created
    event BookingCreated(
        uint256 id,
        address user,
        uint256 propertyId,
        uint256 checkInDate,
        uint256 checkOutDate,
        uint256 totalAmount
    );

    // Function to create a new booking
    function createBooking(
        uint256 propertyId,
        uint256 checkInDate,
        uint256 checkOutDate,
        uint256 totalAmount
    ) external {
        // Increment the total number of bookings and calculate the new booking ID
        totalBookings++;
        uint256 newBookingId = totalBookings;

        // Create the new booking and store it in the mapping
        bookings[newBookingId] = BookingInfo(
            newBookingId,
            msg.sender,
            propertyId,
            checkInDate,
            checkOutDate,
            totalAmount
        );

        // Emit the BookingCreated event
        emit BookingCreated(
            newBookingId,
            msg.sender,
            propertyId,
            checkInDate,
            checkOutDate,
            totalAmount
        );
    }

    // Function to get the details of a booking by its ID
    function getBooking(uint256 bookingId)
        external
        view
        returns (
            uint256 id,
            address user,
            uint256 propertyId,
            uint256 checkInDate,
            uint256 checkOutDate,
            uint256 totalAmount
        )
    {
        // Retrieve the booking from the mapping
        BookingInfo memory booking = bookings[bookingId];

        // Return the booking details
        return (
            booking.id,
            booking.user,
            booking.propertyId,
            booking.checkInDate,
            booking.checkOutDate,
            booking.totalAmount
        );
    }
}
