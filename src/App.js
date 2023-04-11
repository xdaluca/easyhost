import React, { useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';

function App() {
  const [property, setProperty] = useState(0); 
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
  
    // Connect to MetaMask and get the user's Ethereum address
    const web3 = new Web3(Web3.givenProvider);
    const ethereum = window.ethereum;
  
    if (ethereum) {
      try {
        // Request account access from the user
        await ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const user = accounts[0];
  
        // Send the booking data to your back-end
        try {
          const response = await axios.post('http://localhost:5001/api/bookings', {
            property: parseInt(property),
            user,
            checkInDate,
            checkOutDate,
            totalAmount,
          });
  
          console.log(response.data);
          alert('Booking successful!');
        } catch (error) {
          console.error(error);
          alert('Error creating booking');
        }
      } catch (error) {
        console.error(error);
        alert('Error connecting to MetaMask');
      }
    } else {
      alert('MetaMask is not installed');
    }
  };  

  return (
    <div className="App">
      <h1>Create a booking</h1>
      <form onSubmit={handleBooking}>
        <label>
          Property ID:
          <input type="number" value={property} onChange={(e) => setProperty(e.target.value)} />
        </label>
        <br />
        <label>
          Check-in date:
          <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
        </label>
        <br />
        <label>
          Check-out date:
          <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
        </label>
        <br />
        <label>
          Total amount:
          <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
