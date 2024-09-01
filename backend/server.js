require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const patientsRouter = require('./routes/patient');
const doctorsRouter = require('./routes/doctor');
const appointmentsRouter = require('./routes/appointment'); // Corrected spelling

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB database connection established successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err.message);
});

// Route middleware
// app.use('/', (req, res) => {
//     res.send('Welcome to the Hospital Management System API!');
// });
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter); // Corrected spelling


app.use('/', (req, res) => {
    res.send('Welcome to the Hospital Management System API!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
