const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const app = express()

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const AuthRouter = require('./Routes/AuthRouter');
const CategoryRouter = require('./Routes/Categories');

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB is Successfully Connected'))

app.listen(process.env.PORT, () => {
    console.log(`Server is Running`)
})

app.use('/auth', AuthRouter);

app.use('/api', CategoryRouter);

