const stripe = require("stripe")(process.env.STRIPE_PUBLIC_KEY);
const { v4: uuid } = require("uuid");

exports.makePayment = (req, res) => {
  const { products, token, amount } = req.body;

  const idempotencyKey = uuid();

  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
          },
          { idempotencyKey }
        )
        .then((result) => {
          console.log(result);
          return res.status(200).json(result);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
