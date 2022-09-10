// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const express = require("express");
const headerMiddleware = require('./src/core/header-config');
const routerStripe = require('./src/stripe');
const app = express();

app.use(headerMiddleware);

app.use('/stripe', routerStripe);

app.get("/", async (req, res) => {
    res.json("Hello");
});

app.listen(4000, () => console.log(`Listening on port ${4000}!`));
