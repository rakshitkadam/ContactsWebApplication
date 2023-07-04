const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./Config/dbConnection');
const {errorHandler} = require('./Middleware/errorHandler');
const app = express();

connectDb();
app.use(express.json());
app.use('/api/contacts', require('./Routes/contactRoutes'));
app.use('/api/users', require("./Routes/userRoutes"))
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log('Server started');
});