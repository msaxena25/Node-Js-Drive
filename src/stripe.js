const express = require("express");
const routerStripe = express.Router();

const config = {
    successUrl: 'http://localhost:3000/stripepaymentsuccess',
    cancelUrl: "http://localhost:3000/stripepaymentcancel",
    paymentMethodTypes: ['Card']
}

const secretKey =
    "sk_test_51IfCdWSAJQVAMrsUociCpC8PEne6KE5dOZE9p5b33fwJuK8FalSOJGSmACaOva4AmQiAsis2jPIaohlraiVH8t1m0085cZLMGg";


const stripe = require("stripe")(secretKey);


routerStripe.get('/', (req, res) => {
    res.send('Stripe Get request working...');
});

routerStripe.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: config.paymentMethodTypes,
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "T-shirt",
                    },
                    unit_amount: 40000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: config.successUrl,
        cancel_url: config.cancelUrl
    });

    res.json({ id: session.id });
});

module.exports =  routerStripe;