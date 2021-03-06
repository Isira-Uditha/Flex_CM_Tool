const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userAPI = require('./src/api/user.api');
const conferenceAPI = require('./src/api/conference.api');
const postAPI = require('./src/api/post.api');
const stripeRoutes = require('./src/controllers/stripe.controller');
const workShopAPI = require('./src/api/workshop.api');
const reviewerAPI = require('./src/api/reviewer.api');
const adminAPI = require('./src/api/adminApprove.api');
const adminMainUserAPI = require('./src/api/adminMainUser.api')



dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.urlencoded({extended: true}));

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

app.use('/user', userAPI());
app.use('/conference', conferenceAPI());
app.use('/post', postAPI());
app.use('/payment', stripeRoutes);
app.use('/workshop', workShopAPI());
app.use('/reviewer', reviewerAPI());

app.use('/adminMainUser', adminMainUserAPI());

app.use('/admin', adminAPI());
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});