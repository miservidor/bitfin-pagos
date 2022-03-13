const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const PORT = 3000;

const Stripe = require("stripe");
const stripe = Stripe("sk_test_51KcXglJh5z9qKSwjgd5velSj0D6b760cmdWLun00HGAEKypFDigDovfsmBF2iA7WgbjEGE7ItFn5Far0OLBaqIUL00T6TC3XoD");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', function(req, res) {
    res.send('hello world');
  });
app.post("/create-payment-intent", (req, res) => {

  stripe.paymentIntents.create(
    {
      amount: parseInt(req.body.amount),
      currency: "usd",
      payment_method_types: ["card"],
    },
    function (err, paymentIntent) {
      if (err) {
        res.status(500).json(err.message);
      } else {
          console.log(paymentIntent)
        res.status(201).json(paymentIntent);
      }
    }
  );
});
app.post('/create-checkout-session', async (req, res) => {
    const { priceId } = req.body;
  
    // See https://stripe.com/docs/api/checkout/sessions/create
    // for additional parameters to pass.
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            // For metered billing, do not pass quantity
            quantity: 1,
          },
        ],
        // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
        // the actual Session ID is returned in the query parameter when your customer
        // is redirected to the success page.
        success_url: 'https://www.webactiva.de',
        cancel_url: 'https://www.webactiva.de',
      });
  
      res.send({
        sessionId: session.id,
      });
    } catch (e) {
      res.status(400);
      return res.send({
        error: {
          message: e.message,
        }
      });
    }
  });

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));