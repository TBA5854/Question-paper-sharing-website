const express = require('express');
const app = express();
const File = require('./models/file');
const connectDB = require('./config/db');
const cors = require('cors')
const filesRoute = require('./routes/files'); // Import the router

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

// Use the files route
app.use('/api/files', filesRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    // setTimeout(async () => {
    //     console.log(await File.find({}))
    // }, 5000);

});
