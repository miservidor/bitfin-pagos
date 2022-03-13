const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const PORT = 3000;

const Stripe = require("stripe");
const stripe = Stripe("sk_test_51KcXglJh5z9qKSwjgd5velSj0D6b760cmdWLun00HGAEKypFDigDovfsmBF2iA7WgbjEGE7ItFn5Far0OLBaqIUL00T6TC3XoD");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/hello', function(req, res) {
    res.send('hello world 4');
  });

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));