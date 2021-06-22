const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const conferenceAPI = require('./src/api/conference.api');


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8087;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log('Database Error: ', error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Synced');
});

app.route('/').get((req, res) => {
    res.send('SLIIT AF FINAL API BY SE2021 BATCH');
});

app.use('/conference', conferenceAPI());

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});