require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const propertyRoutes = require('./routes/property.routes');
const bookingRoutes = require('./routes/booking.routes');
const User = require('./models/user.model');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Set this to the origin of your front-end app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));  
app.use(express.json());
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes);

// Connect to MongoDB
const connectionString = process.env.MONGODB_CONNECTION_STRING;

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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
