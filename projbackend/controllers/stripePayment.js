const stripe = require("stripe")(process.env.STRIPE_PUBLIC_KEY);
const { v4: uuid } = require("uuid");

exports.makePayment = (req, res) => {
  const { products, token, amount } = req.body;

  //   stripe.customers
  //     .create({
  //       email: "foo-customer@example.com",
  //     })
  //     .then((customer) => {
  //       return stripe.invoiceItems
  //         .create({
  //           customer: "cus_GcAjt5gZVAtChu",
  //           amount: 2500,
  //           currency: "usd",
  //           description: "One-time setup fee",
  //         })
  //         .then((invoiceItem) => {
  //           return stripe.invoices.create({
  //             collection_method: "send_invoice",
  //             customer: invoiceItem.customer,
  //           });
  //         })
  //         .then((invoice) => {
  //           // New invoice created on a new customer
  //         })
  //         .catch((err) => {
  //           // Deal with an error
  //         });
  //     });

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
            // description: `purchase of ${product.name}`,
            // shipping: {
            //   name: token.card.name,
            //     address: {
            //       country: token.card.address_country,
            //     },
            // },
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
