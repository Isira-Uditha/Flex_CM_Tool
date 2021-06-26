const express = require('express');
const stripe = require('stripe')('sk_test_51J5ViHAHA9nESvo0dM3NrFkJKh6cYEqA9fySn6K8Qt7afTObA11J3RPtX0VM3Quy6d8NQYQ7qWaKdqRt6Ji09WHW00w2jxRVWU');
const {v4: uuidv4} = require('uuid');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET response from Researcher');
    res.json({
        message: 'It Works'
    });
});

router.post('/pay', (req, res, next) => {
    console.log('Payment Token', req.body.token);
    const {token, amount} = req.body;
    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencyKey})
    }).then(result => {
        res.status(200).json(result)
    }).catch(error => {
        console.log(error.message);
    });
});

module.exports = router;